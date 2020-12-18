import create from '../utils/helpers';
import {
  requestCountryData,
} from '../utils/server';

export default class CountryList {
  checkCountry() {
    this.bar = 'Hello world';
  }

  createList() {
    this.bar = 'Hello world';
    const list = document.querySelector('.list');
    const formData = document.querySelector('.form-list');
    const input = document.querySelector('#country-list');
    const statusSpan = document.querySelector('.list-btn__info');

    const dataList = create('div', 'dataList');
    list.append(dataList);

    formData.addEventListener('submit', (e) => {
      e.preventDefault();
      requestCountryData(input.value, dataList);
      input.value = '';
    });

    input.addEventListener('input', (event) => {
      dataList.innerHTML = '';
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
              requestCountryData(input.value, dataList);
              statusSpan.textContent = 'Dashboard navigation';
            });
            dataList.append(itemCountry);
          });
        });
    });
  }
}
