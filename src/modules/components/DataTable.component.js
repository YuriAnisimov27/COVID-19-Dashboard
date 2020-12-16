import create from '../utils/helpers';
import {
  reqGlobalData,
  requestCountryData,
  requestCurrentDayData,
  requestTotalCountDataPer100k,
  requestCurrentDayDataPer100k,
  requestTotalCountData,
} from '../utils/server';

export default class DataTable {
  checkCountry() {
    this.bar = 'Hello world';
  }

  createTable() {
    const table = document.querySelector('.table');
    const formData = document.querySelector('form');
    const input = document.querySelector('#country');
    const statusSpan = document.querySelector('.table-btn__info');

    const dataTable = create('div', 'dataTable');
    table.append(dataTable);

    reqGlobalData(dataTable);

    formData.addEventListener('submit', (e) => {
      e.preventDefault();
      requestCountryData(input.value, dataTable);
      input.value = '';
    });

    input.addEventListener('input', (event) => {
      dataTable.innerHTML = '';
      fetch('https://api.covid19api.com/summary')
        .then((data) => data.json())
        .then((arr) => {
          const searchingCountryData = arr.Countries
            .filter((el) => el.Country.toLowerCase().startsWith(event.target.value));
          searchingCountryData.forEach((el) => {
            const itemCountry = create('p');
            itemCountry.textContent = el.Country;
            itemCountry.addEventListener('click', () => {
              input.value = itemCountry.textContent;
              requestCountryData(input.value, dataTable);
              statusSpan.textContent = 'Dashboard navigation';
            });
            dataTable.append(itemCountry);
          });
        });
    });

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

    function updateStatusrData(index) {
      statusSpan.textContent = informationList[index];
      switch (index) {
        case 1:
          requestCurrentDayData(dataTable);
          return;
        case 2:
          requestTotalCountDataPer100k(dataTable);
          return;
        case 3:
          requestCurrentDayDataPer100k(dataTable);
          return;
        default:
          requestTotalCountData(dataTable);
      }
    }

    leftArrow.addEventListener('click', () => {
      counter = (counter) ? counter - 1 : 3;
      updateStatusrData(counter);
    });
    rightArrow.addEventListener('click', () => {
      counter = Math.abs(counter + 1) % 4;
      updateStatusrData(counter);
    });
  }
}
