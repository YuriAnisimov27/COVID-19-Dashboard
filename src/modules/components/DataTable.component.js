import create from '../utils/helpers';
import { reqGlobalData, requestCountryData } from '../utils/server';

export default class DataTable {
  createTable() {
    this.bar = 'Hello world';
    const table = document.querySelector('.table');
    const formData = document.querySelector('form');
    const input = document.querySelector('#country');

    const dataTable = create('div', 'dataTable');
    table.append(dataTable);

    reqGlobalData(dataTable);

    formData.addEventListener('submit', (e) => {
      e.preventDefault();
      requestCountryData(input.value, dataTable);
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
            dataTable.append(itemCountry);
          });
        });
    });
  }
}
