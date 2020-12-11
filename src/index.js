import './css/style.css';
import create from './modules/utils/helpers';
import { reqGlobalData, requestCountryData } from './modules/utils/server';

const table = document.querySelector('.table');
const formData = document.querySelector('form');
const input = document.querySelector('#country');

const dataTable = create('div', 'dataTable');
table.append(dataTable);

reqGlobalData(dataTable);

formData.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('input data', input.value);
  requestCountryData(input.value, dataTable);
});

input.addEventListener('input', (e) => {
  dataTable.innerHTML = '';
  // {e.target.value}
  fetch('https://api.covid19api.com/summary')
    .then((data) => data.json())
    .then((arr) => {
      const searchingCountryData = arr.Countries
        .filter((el) => el.Country.startsWith(e.target.value));
      console.log('countries', searchingCountryData);
      searchingCountryData.forEach((el) => {
        const itemCountry = create('p');
        itemCountry.textContent = el.Country;
        dataTable.append(itemCountry);
      });
    });
});
