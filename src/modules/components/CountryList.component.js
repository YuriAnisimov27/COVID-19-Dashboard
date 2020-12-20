import ScheduleDiseases from './ScheduleDiseases.component';
import create, { storage, removeElement } from '../utils/helpers';
import { requestCountryData } from '../utils/server';
import countries from '../data/countries.data';

export default class CountryList {
  allCountries(sortType) {
    this.bar = 'Hello world';
    const list = document.querySelector('.list');
    const dataTable = document.querySelector('.dataTable');
    removeElement('.dataList');
    const dataList = create('div', 'dataList');

    const data = sortType || storage('Global').Countries;

    data.map((country) => {
      const countryFlag = countries.filter((el) => el.name === country.Country)[0];
      if (countryFlag) {
        const countyInner = create('div', 'country-inner');
        const flagImg = create('img');
        flagImg.src = countryFlag.flag;

        const cntr = create('span');
        cntr.textContent = country.Country;

        const cases = create('p');
        cases.textContent = `Cases: ${country.TotalConfirmed} Recovered: ${country.TotalRecovered} Deaths: ${country.TotalDeaths}`;

        countyInner.addEventListener('click', () => {
          requestCountryData(countryFlag.name, dataTable);
          new ScheduleDiseases().createSchedule(countryFlag.name);
        });

        countyInner.append(flagImg);
        countyInner.append(cntr);
        countyInner.append(cases);
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
    // const dataList = document.querySelector('.dataList');

    formData.addEventListener('submit', (e) => {
      e.preventDefault();
      let cptName = input.value;
      cptName = cptName.substr(0, 1).toUpperCase() + cptName.substr(1);
      const countryFlag = countries
        .filter((el) => el.name === cptName)[0];
      if (countryFlag) {
        requestCountryData(cptName, dataTable);
        new ScheduleDiseases().createSchedule(cptName);
      } else {
        dataTable.innerHTML = 'Invalid Data';
      }
    });

    input.addEventListener('input', (event) => {
      removeElement('.dataList');
      const dataListSearch = create('div', 'dataList');
      const list = document.querySelector('.list');
      list.append(dataListSearch);

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
              dataListSearch.append(countyInner);
            }

            return undefined;
          });
        });
    });
  }

  sortList() {
    this.bar = 'Hello World';
    const casesBtn = document.querySelector('.sort-cases');
    const recoveredBtn = document.querySelector('.sort-recovered');
    const deathsBtn = document.querySelector('.sort-deaths');
    const sortIcon = document.querySelector('.sort-icon');
    let data = storage('Global').Countries;
    let position = true;

    casesBtn.addEventListener('click', () => {
      if (position) {
        data = data.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
        sortIcon.textContent = 'keyboard_arrow_down';
      } else {
        data = data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
        sortIcon.textContent = 'keyboard_arrow_up';
      }
      new CountryList().allCountries(data);
      position = !position;
    });

    recoveredBtn.addEventListener('click', () => {
      if (position) {
        data = data.sort((a, b) => a.TotalRecovered - b.TotalRecovered);
        sortIcon.textContent = 'keyboard_arrow_down';
      } else {
        data = data.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
        sortIcon.textContent = 'keyboard_arrow_up';
      }
      new CountryList().allCountries(data);
      position = !position;
    });

    deathsBtn.addEventListener('click', () => {
      if (position) {
        data = data.sort((a, b) => a.TotalDeaths - b.TotalDeaths);
        sortIcon.textContent = 'keyboard_arrow_down';
      } else {
        data = data.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
        sortIcon.textContent = 'keyboard_arrow_up';
      }
      new CountryList().allCountries(data);
      position = !position;
    });
  }
}
