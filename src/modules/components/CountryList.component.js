import ScheduleDiseases from './ScheduleDiseases.component';
import create, { storage, removeElement } from '../utils/helpers';
import { requestCountryData } from '../utils/server';
import countries from '../data/countries.data';
import { setViewFromList } from './DiseaseMap.component';

export function controlQuickSearch() {
  const dataTable = document.querySelector('.dataTable');
  const inputList = document.querySelector('#country-list');
  removeElement('.dataList');
  const dataListSearch = create('div', 'dataList');
  const list = document.querySelector('.list');
  list.append(dataListSearch);

  fetch('https://disease.sh/v3/covid-19/countries')
    .then((data) => data.json())
    .then((arr) => {
      const searchingCountryData = arr
        .filter((el) => el.country.toLowerCase().startsWith(inputList.value));
      searchingCountryData.forEach((country) => {
        const countyInner = create('div', 'country-inner');
        const flagImg = create('img');
        flagImg.src = country.countryInfo.flag || null;

        const cntr = create('span');
        cntr.textContent = country.country;

        countyInner.addEventListener('click', () => {
          requestCountryData(country.country, dataTable);
          new ScheduleDiseases().createSchedule(country.country);
          setViewFromList(country.country);
        });

        countyInner.append(flagImg);
        countyInner.append(cntr);
        dataListSearch.append(countyInner);

        return undefined;
      });
    });
}

export default class CountryList {
  allCountries(sortType) {
    this.bar = 'Hello world';
    const list = document.querySelector('.list');
    const dataTable = document.querySelector('.dataTable');
    removeElement('.dataList');
    const dataList = create('div', 'dataList');

    const data = sortType || storage('Countries data');

    data.map((country) => {
      const countyInner = create('div', 'country-inner');
      const flagImg = create('img');
      flagImg.src = country.countryInfo.flag;

      const cntr = create('span');
      cntr.textContent = country.country;

      const cases = create('p');
      cases.innerHTML = `Cases:<span class='listSpanCases'> ${country.cases}</span> Recovered:<span class='listSpanRecovered'> ${country.recovered}</span> Deaths: <span class='listSpanDeaths'>${country.deaths}</span>`;

      countyInner.addEventListener('click', () => {
        requestCountryData(country.country, dataTable);
        new ScheduleDiseases().createSchedule(country.country);
        setViewFromList(country.country);
      });

      countyInner.append(flagImg);
      countyInner.append(cntr);
      countyInner.append(cases);
      dataList.append(countyInner);

      return undefined;
    });

    list.append(dataList);
    const fullScreenBtn = create('span', 'fullscreenbtn material-icons screen__manager__icon');
    fullScreenBtn.textContent = 'open_in_full';
    list.appendChild(fullScreenBtn);
    fullScreenBtn.addEventListener('click', () => {
      list.classList.toggle('fullscreen');
      document.body.classList.toggle('noScroll');
    });
  }

  createList() {
    this.bar = 'Hello world';
    this.allCountries();
    const formData = document.querySelector('.form-list');
    const input = document.querySelector('#country-list');
    const dataTable = document.querySelector('.dataTable');

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

    input.addEventListener('input', controlQuickSearch);
  }

  sortList() {
    this.bar = 'Hello World';
    const casesBtn = document.querySelector('.sort-cases');
    const recoveredBtn = document.querySelector('.sort-recovered');
    const deathsBtn = document.querySelector('.sort-deaths');
    const sortIcon = document.querySelector('.sort-icon');
    let data = storage('Countries data');
    let position = true;

    casesBtn.addEventListener('click', () => {
      if (position) {
        data = data.sort((a, b) => a.cases - b.cases);
        sortIcon.textContent = 'keyboard_arrow_down';
      } else {
        data = data.sort((a, b) => b.cases - a.cases);
        sortIcon.textContent = 'keyboard_arrow_up';
      }
      new CountryList().allCountries(data);
      position = !position;
    });

    recoveredBtn.addEventListener('click', () => {
      if (position) {
        data = data.sort((a, b) => a.recovered - b.recovered);
        sortIcon.textContent = 'keyboard_arrow_down';
      } else {
        data = data.sort((a, b) => b.recovered - a.recovered);
        sortIcon.textContent = 'keyboard_arrow_up';
      }
      new CountryList().allCountries(data);
      position = !position;
    });

    deathsBtn.addEventListener('click', () => {
      if (position) {
        data = data.sort((a, b) => a.deaths - b.deaths);
        sortIcon.textContent = 'keyboard_arrow_down';
      } else {
        data = data.sort((a, b) => b.deaths - a.deaths);
        sortIcon.textContent = 'keyboard_arrow_up';
      }
      new CountryList().allCountries(data);
      position = !position;
    });
  }
}
