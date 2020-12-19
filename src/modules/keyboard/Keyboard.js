/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import * as storage from './storage.js';
import create from './utils/create.js';
import language from './layouts/index.js'; // { en, ru }
import Key from './Key.js';

const main = create('main', '',
  [
    create('p', 'hint', 'Use <kbd>Ctrl</kbd> + <kbd>Alt</kbd> to switch language.'),
    create('p', 'hint', 'Click on Textarea To Show Keyboard'),
  ]);

export default class Keyboard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder;
    this.keysPressed = {};
    this.isCaps = false;
  }

  init(langCode) {
    this.keyBase = language[langCode];
    this.output = create('textarea', 'output', null, main,
      ['placeholder', 'Start type something...'],
      ['rows', 5],
      ['cols', 50],
      ['spellcheck', false],
      ['autocorrect', 'off']);
      this.output.addEventListener('click', () => {
        const keyboard = document.querySelector('.keyboard');
        keyboard.style.opacity = 1;
        keyboard.style.transition = 'opacity .5s ease-out';
      });
    this.container = create('div', 'keyboard', null, main, ['language', langCode]);
    document.body.prepend(main);
    this.buttonSound = false;
    this.voiceRecorder = false;
    return this;
  }

  generateLayout() {
    this.keyButtons = [];
    this.rowsOrder.forEach((row, i) => {
      const rowElement = create('div', 'keyboard__row', null, this.container, ['row', i + 1]);
      rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
      row.forEach((code) => {
        const keyObj = this.keyBase.find((key) => key.code === code);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          this.keyButtons.push(keyButton);
          rowElement.appendChild(keyButton.div);
        }
      });
    });

    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    this.container.onmousedown = this.preHandleEvent;
    this.container.onmouseup = this.preHandleEvent;
  }

  preHandleEvent = (e) => {
    e.stopPropagation();
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const { dataset: { code } } = keyDiv;
    keyDiv.addEventListener('mouseleave', this.resetButtonState);
    this.handleEvent({ code, type: e.type });
  }

  handleEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    
    if (this.buttonSound) {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        const sound = document.createElement('audio');
        sound.src = './assets/sounds/boom.wav';
        sound.play();
      } else if (e.code === 'CapsLock') {
        const sound = document.createElement('audio');
        sound.src = './assets/sounds/clap.wav';
        sound.play();
      } else if ((e.code === 'Backspace')) {
        const sound = document.createElement('audio');
        sound.src = './assets/sounds/tom.wav';
        sound.play();
      } else if (e.code === 'Enter') {
        const sound = document.createElement('audio');
        sound.src = './assets/sounds/snare.wav';
        sound.play();
      } else {
        if (storage.get('kbLang') === "ru") {
          const sound = document.createElement('audio');
          sound.src = './assets/sounds/tink.wav';
          sound.play();
        } else {
          const sound = document.createElement('audio');
          sound.src = './assets/sounds/kick.wav';
          sound.play();
        }
      }
    }

    if (e.code === 'en/ru' && e.type === "mousedown") {
      this.switchLanguage();
      return;
    }

    if (e.code === "hide keyboard") {
      const keyboard = document.querySelector('.keyboard');
      keyboard.style.opacity = 0;
      keyboard.style.transition = 'opacity .5s ease-in';
      return;
    }

    if (e.code === "button sound" && e.type === "mousedown") {
      this.buttonSound = !this.buttonSound;
      const keyObj = this.keyButtons.find((key) => key.code === e.code);
      keyObj.div.classList.toggle('active');

      if (this.buttonSound) {
        keyObj.div.style.background = 'rgb(60, 212, 0)';
      } else {
        keyObj.div.style.background = 'rgb(78, 78, 78) radial-gradient(circle at 0 0, rgba(136, 134, 134, 0.65), rgba(167, 167, 167, 0.35))';
      }
      return;
    }

    if (e.code === "voice input" && e.type === "mousedown") {
      this.voiceRecorder = !this.voiceRecorder;

      const keyObj = this.keyButtons.find((key) => key.code === e.code);
      keyObj.div.classList.toggle('active');
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();

      if (this.voiceRecorder) {
        setInterval(() => {
          if (!this.voiceRecorder) {           
            rec.abort();
          }
        }, 500)
      }

      rec.interimResults = false;
      rec.lang = (storage.get('kbLang') === "ru") ? 'ru-RU' : 'en-US';

      const voiceHandler = (e) => {
        const text = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        this.output.value = this.output.value + text;
      };

      const endHandler = (e) => {
        if (this.voiceRecorder) {
          rec.start();
        } else {
          rec.abort();
          rec.removeEventListener('result', voiceHandler);
          rec.removeEventListener('end', endHandler);
        }
      };

      rec.addEventListener('result', voiceHandler);
      
      if (!this.voiceRecorder) {
        rec.removeEventListener('end', endHandler);
        rec.removeEventListener('result', voiceHandler);
        keyObj.div.style.background = 'rgb(78, 78, 78) radial-gradient(circle at 0 0, rgba(136, 134, 134, 0.65), rgba(167, 167, 167, 0.35))';
      } else {
        rec.start();
        rec.addEventListener('end', endHandler);
        keyObj.div.style.background = 'rgb(60, 212, 0)';
      }
      return;
    }

    const { code, type } = e;
    const keyObj = this.keyButtons.find((key) => key.code === code);
    if (!keyObj) return;
    this.output.focus();

    if (type.match(/keydown|mousedown/)) {
      if (!type.match(/mouse/)) e.preventDefault();
      if (code.match(/Shift/)) this.shiftKey = true;
      if (this.shiftKey) this.switchUpperCase(true);
      if (code.match(/Control|Alt|Caps/) && e.repeat) return;
      if (code.match(/Control/)) this.ctrKey = true;
      if (code.match(/Alt/)) this.altKey = true;
      if (code.match(/Control/) && this.altKey) this.switchLanguage();
      if (code.match(/Alt/) && this.ctrKey) this.switchLanguage();

      keyObj.div.classList.add('active');

      if (code.match(/Caps/) && !this.isCaps) {
        this.isCaps = true;
        this.switchUpperCase(true);
      } else if (code.match(/Caps/) && this.isCaps) {
        this.isCaps = false;
        this.switchUpperCase(false);
        keyObj.div.classList.remove('active');
      }

      if (!this.isCaps) {
        this.printToOutput(keyObj, this.shiftKey ? keyObj.shift : keyObj.small);
      } else if (this.isCaps) {
        if (this.shiftKey) {
          this.printToOutput(keyObj, keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
        } else {
          this.printToOutput(keyObj, !keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
        }
      }
      this.keysPressed[keyObj.code] = keyObj;
    } else if (e.type.match(/keyup|mouseup/)) {
      this.resetPressedButtons(code);
      if (code.match(/Shift/)) {
        this.shiftKey = false;
        this.switchUpperCase(false);
      }
      if (code.match(/Control/)) this.ctrKey = false;
      if (code.match(/Alt/)) this.altKey = false;
      if (!code.match(/Caps/)) keyObj.div.classList.remove('active');
    }
  }

  resetButtonState = ({ target: { dataset: { code } } }) => {
    if (code.match('Shift')) {
      this.shiftKey = false;
      this.switchUpperCase(false);
      this.keysPressed[code].div.classList.remove('active');
    }
    if (code.match(/Control/)) this.ctrKey = false;
    if (code.match(/Alt/)) this.altKey = false;
    this.resetPressedButtons(code);
    this.output.focus();
  }

  resetPressedButtons = (targetCode) => {
    if (!this.keysPressed[targetCode]) return;
    if (!this.isCaps) this.keysPressed[targetCode].div.classList.remove('active');
    this.keysPressed[targetCode].div.removeEventListener('mouseleave', this.resetButtonState);
    delete this.keysPressed[targetCode];
  }

  switchUpperCase(isTrue) {
    if (isTrue) {
      this.keyButtons.forEach((button) => {
        if (button.sub) {
          if (this.shiftKey) {
            button.sub.classList.add('sub-active');
            button.letter.classList.add('sub-inactive');
          }
        }
        if (!button.isFnKey && this.isCaps && !this.shiftKey && !button.sub.innerHTML) {
          button.letter.innerHTML = button.shift;
        } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
          button.letter.innerHTML = button.small;
        } else if (!button.isFnKey && !button.sub.innerHTML) {
          button.letter.innerHTML = button.shift;
        }
      });
    } else {
      this.keyButtons.forEach((button) => {
        if (button.sub.innerHTML && !button.isFnKey) {
          button.sub.classList.remove('sub-active');
          button.letter.classList.remove('sub-inactive');
          if (!this.isCaps) {
            button.letter.innerHTML = button.small;
          } else if (!this.isCaps) {
            button.letter.innerHTML = button.shift;
          }
        } else if (!button.isFnKey) {
          if (this.isCaps) {
            button.letter.innerHTML = button.shift;
          } else {
            button.letter.innerHTML = button.small;
          }
        }
      });
    }
  }

  switchLanguage = () => {
    const langAbbr = Object.keys(language);
    let langIdx = langAbbr.indexOf(this.container.dataset.language);
    this.keyBase = langIdx + 1 < langAbbr.length ? language[langAbbr[langIdx += 1]]
      : language[langAbbr[langIdx -= langIdx]];

    this.container.dataset.language = langAbbr[langIdx];
    storage.set('kbLang', langAbbr[langIdx]);

    this.keyButtons.forEach((button) => {
      const keyObj = this.keyBase.find((key) => key.code === button.code);
      if (!keyObj) return;
      button.shift = keyObj.shift;
      button.small = keyObj.small;
      if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/g)) {
        button.sub.innerHTML = keyObj.shift;
      } else {
        button.sub.innerHTML = '';
      }
      button.letter.innerHTML = keyObj.small;
    });
    if (this.isCaps) this.switchUpperCase(true);
  }

  printToOutput(keyObj, symbol) {
    let cursorPos = this.output.selectionStart;
    const left = this.output.value.slice(0, cursorPos);
    const right = this.output.value.slice(cursorPos);
    const textHandlers = {
      Tab: () => {
        this.output.value = `${left}\t${right}`;
        cursorPos += 1;
      },
      ArrowLeft: () => {
        cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
      },
      ArrowRight: () => {
        cursorPos += 1;
      },
      ArrowUp: () => {
        const positionFromLeft = this.output.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
        cursorPos -= positionFromLeft[0].length;
      },
      ArrowDown: () => {
        const positionFromLeft = this.output.value.slice(cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];
        cursorPos += positionFromLeft[0].length;
      },
      Enter: () => {
        this.output.value = `${left}\n${right}`;
        cursorPos += 1;
      },
      Delete: () => {
        this.output.value = `${left}${right.slice(1)}`;
      },
      Backspace: () => {
        this.output.value = `${left.slice(0, -1)}${right}`;
        cursorPos -= 1;
      },
      Space: () => {
        this.output.value = `${left} ${right}`;
        cursorPos += 1;
      },
    };
    if (textHandlers[keyObj.code]) textHandlers[keyObj.code]();
    else if (!keyObj.isFnKey) {
      cursorPos += 1;
      this.output.value = `${left}${symbol || ''}${right}`;
    }
    this.output.setSelectionRange(cursorPos, cursorPos);
  }
}
