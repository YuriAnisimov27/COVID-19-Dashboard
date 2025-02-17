import * as storage from './storage';
import create from './utils/create';
import language from './layouts/index';
import Key from './Key';
import { controlQuickSearch } from '../components/CountryList.component';

const main = create('main', '');
export default class Keyboard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder;
    this.keysPressed = {};
    this.isCaps = false;
    this.preHandleEvent = this.preHandleEvent.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.resetButtonState = this.resetButtonState.bind(this);
    this.resetPressedButtons = this.resetPressedButtons.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  changeOutputValue(newValue) {
    this.output.value = newValue;
    controlQuickSearch();
  }

  init(langCode) {
    this.keyBase = language[langCode];
    this.output = document.querySelector('#country-list');

    const kbInitBtn = document.querySelector('.keyboardIcon');

    kbInitBtn.addEventListener('click', () => {
      const keyboard = document.querySelector('.keyboard');
      keyboard.style.display = 'grid';
      keyboard.style.opacity = 1;
      keyboard.style.transition = 'opacity .5s ease-out';
      main.style.zIndex = 1000002;
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

  preHandleEvent(e) {
    e.stopPropagation();
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const { dataset: { code } } = keyDiv;
    keyDiv.addEventListener('mouseleave', this.resetButtonState);
    this.handleEvent({ code, type: e.type });
  }

  handleEvent(e) {
    if (e.stopPropagation) e.stopPropagation();

    if (this.buttonSound) {
      return;
    }

    if (e.code === 'en/ru' && e.type === 'mousedown') {
      this.switchLanguage();
      return;
    }

    if (e.code === 'hide keyboard') {
      const keyboard = document.querySelector('.keyboard');
      keyboard.style.opacity = 0;
      keyboard.style.transition = 'opacity .5s ease-in';
      main.style.zIndex = -9999;
      return;
    }

    if (e.code === 'search' && e.type === 'mousedown') {
      return;
    }

    if (e.code === 'info' && e.type === 'mousedown') {
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

  resetButtonState({ target: { dataset: { code } } }) {
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

  resetPressedButtons(targetCode) {
    if (!this.keysPressed[targetCode]) return;
    if (!this.isCaps) this.keysPressed[targetCode].div.classList.remove('active');
    this.keysPressed[targetCode].div.removeEventListener('mouseleave', this.resetButtonState);
    delete this.keysPressed[targetCode];
  }

  switchUpperCase(isTrue) {
    if (isTrue) {
      this.keyButtons.forEach((button) => {
        const buttonCopy = button;
        if (button.sub) {
          if (this.shiftKey) {
            button.sub.classList.add('sub-active');
            button.letter.classList.add('sub-inactive');
          }
        }
        if (!button.isFnKey && this.isCaps && !this.shiftKey && !button.sub.innerHTML) {
          buttonCopy.letter.innerHTML = button.shift;
        } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
          buttonCopy.letter.innerHTML = button.small;
        } else if (!button.isFnKey && !button.sub.innerHTML) {
          buttonCopy.letter.innerHTML = button.shift;
        }
      });
    } else {
      this.keyButtons.forEach((button) => {
        const buttonCopy = button;
        if (button.sub.innerHTML && !button.isFnKey) {
          button.sub.classList.remove('sub-active');
          button.letter.classList.remove('sub-inactive');
          if (!this.isCaps) {
            buttonCopy.letter.innerHTML = button.small;
          } else if (!this.isCaps) {
            buttonCopy.letter.innerHTML = button.shift;
          }
        } else if (!button.isFnKey) {
          if (this.isCaps) {
            buttonCopy.letter.innerHTML = button.shift;
          } else {
            buttonCopy.letter.innerHTML = button.small;
          }
        }
      });
    }
  }

  switchLanguage() {
    const langAbbr = Object.keys(language);
    let langIdx = langAbbr.indexOf(this.container.dataset.language);
    this.keyBase = langIdx + 1 < langAbbr.length ? language[langAbbr[langIdx += 1]]
      : language[langAbbr[langIdx -= langIdx]];

    this.container.dataset.language = langAbbr[langIdx];
    storage.set('kbLang', langAbbr[langIdx]);

    this.keyButtons.forEach((button) => {
      const buttonCopy = button;
      const keyObj = this.keyBase.find((key) => key.code === button.code);
      if (!keyObj) return;
      buttonCopy.shift = keyObj.shift;
      buttonCopy.small = keyObj.small;
      if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/g)) {
        buttonCopy.sub.innerHTML = keyObj.shift;
      } else {
        buttonCopy.sub.innerHTML = '';
      }
      buttonCopy.letter.innerHTML = keyObj.small;
    });
    if (this.isCaps) this.switchUpperCase(true);
  }

  printToOutput(keyObj, symbol) {
    let cursorPos = this.output.selectionStart;
    const left = this.output.value.slice(0, cursorPos);
    const right = this.output.value.slice(cursorPos);
    const textHandlers = {
      Tab: () => {
        this.changeOutputValue(`${left}\t${right}`);
        cursorPos += 1;
      },
      ArrowLeft: () => {
        cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
      },
      ArrowRight: () => {
        cursorPos += 1;
      },
      ArrowUp: () => {
        // this.changeOutputValue();
        const positionFromLeft = this.output.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
        cursorPos -= positionFromLeft[0].length;
      },
      ArrowDown: () => {
        // this.changeOutputValue();
        const positionFromLeft = this.output.value.slice(cursorPos).match(/^.*(\n).*(?!\1)/) || [[1]];
        cursorPos += positionFromLeft[0].length;
      },
      Enter: () => {
        this.changeOutputValue(`${left}\n${right}`);
        cursorPos += 1;
      },
      Delete: () => {
        this.changeOutputValue(`${left}${right.slice(1)}`);
      },
      Backspace: () => {
        this.changeOutputValue(`${left.slice(0, -1)}${right}`);
        cursorPos -= 1;
      },
      Space: () => {
        this.changeOutputValue(`${left} ${right}`);
        cursorPos += 1;
      },
    };
    if (textHandlers[keyObj.code]) textHandlers[keyObj.code]();
    else if (!keyObj.isFnKey) {
      cursorPos += 1;
      this.output.value = `${left}${symbol || ''}${right}`;
      controlQuickSearch();
    }
    this.output.setSelectionRange(cursorPos, cursorPos);
    controlQuickSearch();
  }
}
