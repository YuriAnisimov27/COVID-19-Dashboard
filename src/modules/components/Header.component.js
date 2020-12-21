import healthInfoMessages from '../data/healthInfo';
import create from '../utils/helpers';

export default class Header {
  createHeader() {
    this.bar = 'Hello World';
    const body = document.querySelector('body');
    const headerNavTitles = document.querySelectorAll('.header-nav__title');
    headerNavTitles.forEach((el, index) => {
      el.addEventListener('click', () => {
        const messageWindow = create('div', '');
        messageWindow.style.position = 'absolute';
        messageWindow.style.background = 'white';
        messageWindow.style.zIndex = 170000;
        messageWindow.style.top = '20px';
        messageWindow.style.left = '50px';
        messageWindow.innerHTML = healthInfoMessages[index];
        body.append(messageWindow);
        messageWindow.addEventListener('click', () => {
          messageWindow.remove();
        });
      });
    });
  }
}
