import ScheduleDiseases from './ScheduleDiseases.component';
import create, { storage } from '../utils/helpers';
import { requestCountryData } from '../utils/server';
import countries from '../data/countries.data';

export default class CountryList {
  allCountries() {
    this.bar = 'Hello world';
    const list = document.querySelector('.list');
    const dataTable = document.querySelector('.dataTable');
    const dataList = create('div', 'dataList');

    const data = storage('Global').Countries;

    data.map((country) => {
      const countryFlag = countries.filter((el) => el.name === country.Country)[0];
      if (countryFlag) {
        const countyInner = create('div', 'country-inner');
        const flagImg = create('img');
        flagImg.src = countryFlag.flag;

        const cntr = create('span');
        cntr.textContent = country.Country;

        countyInner.addEventListener('click', () => {
          requestCountryData(countryFlag.name, dataTable);
          new ScheduleDiseases().createSchedule(countryFlag.name);
        });

        countyInner.append(flagImg);
        countyInner.append(cntr);
        dataList.append(countyInner);
      }

      return undefined;
    });

    list.append(dataList);
  }

  createList() {
    this.bar = 'Hello world';
    this.allCountries();

    const formData = document.querySelector('.form-list');
    const input = document.querySelector('#country-list');
    const dataTable = document.querySelector('.dataTable');
    const dataList = document.querySelector('.dataList');

    formData.addEventListener('submit', (e) => {
      e.preventDefault();
      requestCountryData(input.value, dataTable);
      input.value = '';
    });

    input.addEventListener('input', (event) => {
      dataList.innerHTML = '';
      fetch('https://api.covid19api.com/summary')
        .then((data) => data.json())
        .then((arr) => {
          const searchingCountryData = arr.Countries
            .filter((el) => el.Country.toLowerCase().startsWith(event.target.value));
          searchingCountryData.forEach((country) => {
            const countryFlag = countries.filter((el) => el.name === country.Country)[0];
            if (countryFlag) {
              const countyInner = create('div', 'country-inner');
              const flagImg = create('img');
              flagImg.src = countryFlag.flag;

              const cntr = create('span');
              cntr.textContent = country.Country;

              countyInner.addEventListener('click', () => {
                requestCountryData(countryFlag.name, dataTable);
                new ScheduleDiseases().createSchedule(countryFlag.name);
              });

              countyInner.append(flagImg);
              countyInner.append(cntr);
              dataList.append(countyInner);
            }

            return undefined;
          });
        });
    });
  }
}
