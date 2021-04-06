import create, { removeElement } from './helpers';
import { requestCountryData } from './server';
import ScheduleDiseases from '../components/ScheduleDiseases.component';
import { setViewFromList } from '../components/DiseaseMap.component';

export default function controlQuickSearch() {
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
        dataListSearch.append(countyInner);

        return undefined;
      });
    });
}
