import create from '../utils/helpers';
import {
  reqGlobalData,
  requestCurrentDayData,
  requestTotalCountDataPer100k,
  requestCurrentDayDataPer100k,
  requestTotalCountData,
} from '../utils/server';

export default class DataTable {
  createTable() {
    const table = document.querySelector('.table');
    const dataTable = create('div', 'dataTable');
    table.append(dataTable);

    reqGlobalData(dataTable);

    this.changeData();
  }

  changeData() {
    this.bar = 'Hello world';
    let counter = 0;
    const informationList = ['total number of cases', 'number of cases in the last day ', 'the total number of cases of the disease per 100 thousand population', 'the number of cases of the disease in the last day per 100 thousand population'];
    const leftArrow = document.querySelector('.table-btn__left');
    const rightArrow = document.querySelector('.table-btn__right');
    const statusSpan = document.querySelector('.table-btn__info');
    const dataTable = document.querySelector('.dataTable');
    statusSpan.textContent = informationList[counter];

    function updateStatusrData(index, country) {
      statusSpan.textContent = informationList[index];
      switch (index) {
        case 1:
          requestCurrentDayData(dataTable, country);
          return;
        case 2:
          requestTotalCountDataPer100k(dataTable, country);
          return;
        case 3:
          requestCurrentDayDataPer100k(dataTable, country);
          return;
        default:
          requestTotalCountData(dataTable, country);
      }
    }

    const countryTitle = document.querySelector('.table-nav__title');

    leftArrow.addEventListener('click', () => {
      counter = (counter) ? counter - 1 : 3;
      if (countryTitle.textContent !== 'World Data') {
        const country = countryTitle.textContent.replaceAll('"', '');
        updateStatusrData(counter, country);
      } else {
        updateStatusrData(counter);
      }
    });
    rightArrow.addEventListener('click', () => {
      counter = Math.abs(counter + 1) % 4;
      if (countryTitle.textContent !== 'World Data') {
        const country = countryTitle.textContent.replaceAll('"', '');
        updateStatusrData(counter, country);
      } else {
        updateStatusrData(counter);
      }
    });
  }
}
