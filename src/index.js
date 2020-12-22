import { requestData } from './modules/utils/server';
import { storage } from './modules/utils/helpers';
import DataTable from './modules/components/DataTable.component';
import CountryList from './modules/components/CountryList.component';
import ScheduleDiseases from './modules/components/ScheduleDiseases.component';
import Header from './modules/components/Header.component';
import './css/keyboard.css';
import './css/list.css';
import './css/map.css';
import './css/style.css';
import './css/headComp.css';
import mapBuilder from './modules/components/DiseaseMap.component';
import { get } from './modules/keyboard/storage';
import Keyboard from './modules/keyboard/Keyboard';

window.addEventListener('load', () => {
  requestData();
  setTimeout(() => {
    const rowsOrder = [
      ['en/ru', 'hide keyboard', 'voice input', 'button sound'],
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
      ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['ControlLeft', 'Win', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
    ];
    const lang = get('kbLang', '"en"');
    new Keyboard(rowsOrder).init(lang).generateLayout();

    new Header().createHeader();
    new DataTable().createTable();
    new CountryList().createList();
    new CountryList().sortList();
    new ScheduleDiseases().createSchedule();
    new ScheduleDiseases().changeData();

    const mapData = storage('Countries data');
    mapBuilder(mapData);
  }, 300);
});
