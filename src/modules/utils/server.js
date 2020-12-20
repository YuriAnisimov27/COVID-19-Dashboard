import { storage } from './helpers';
import countries from '../data/countries.data';

export function reqGlobalData(dataTable) {
  fetch('https://api.covid19api.com/summary')
    .then((data) => data.json())
    .then((data) => {
      storage('Global data', data.Global);
      storage('Global', data);
      storage('Current Day', data.Date);
      storage('Countries data', data.Countries);
      // eslint-disable-next-line no-param-reassign
      dataTable.innerHTML = `
      <ul>
        <li>Total Confirmed: ${JSON.stringify(data.Global.TotalConfirmed)}</li>
        <li>Total Deaths: ${JSON.stringify(data.Global.TotalDeaths)}</li>
        <li>Total Recovered: ${JSON.stringify(data.Global.TotalRecovered)}</li>
      </ul>
      `;
    })
    .catch((err) => console.error(err));
}

export function requestTotalCountData(dataTable, country) {
  const data = country
    ? storage('Global').Countries.filter((el) => el.Country === country)[0]
    : storage('Global data');
  const dataTableClone = dataTable;
  // ${country && countries.filter((el) => el.name === country)[0].population}
  dataTableClone.innerHTML = `
  <ul>
    <li>Confirmed: ${JSON.stringify(data.TotalConfirmed)}</li>
    <li>Deaths: ${JSON.stringify(data.TotalDeaths)}</li>
    <li>Recovered: ${JSON.stringify(data.TotalRecovered)}</li>
  </ul>
  `;
}

export function requestCurrentDayData(dataTable, country) {
  const data = country
    ? storage('Global').Countries.filter((el) => el.Country === country)[0]
    : storage('Global data');
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>Last Day Confirmed: ${JSON.stringify(data.NewConfirmed)}</li>
    <li>Last Day Deaths: ${JSON.stringify(data.NewDeaths)}</li>
    <li>Last Day Recovered: ${JSON.stringify(data.NewRecovered)}</li>
  </ul>
  `;
}

export function requestTotalCountDataPer100k(dataTable, country) {
  const data = country
    ? storage('Global').Countries.filter((el) => el.Country === country)[0]
    : storage('Global data');
  const population = country
    ? countries.filter((el) => el.name === country)[0].population
    : 7800000000;
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>Confirmed: ${((JSON.stringify(data.TotalConfirmed) / population) * 100000)
    .toFixed(3)}</li>
    <li>Deaths: ${((JSON.stringify(data.TotalDeaths) / population) * 100000)
    .toFixed(3)}</li>
    <li>Recovered: ${((JSON.stringify(data.TotalRecovered) / population) * 100000)
    .toFixed(3)}</li>
  </ul>
  `;
}

export function requestCurrentDayDataPer100k(dataTable, country) {
  const data = country
    ? storage('Global').Countries.filter((el) => el.Country === country)[0]
    : storage('Global data');
  const population = country
    ? countries.filter((el) => el.name === country)[0].population
    : 7800000000;
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>Confirmed: ${((JSON.stringify(data.NewConfirmed) / population) * 100000)
    .toFixed(3)}</li>
    <li>Deaths: ${((JSON.stringify(data.NewDeaths) / population) * 100000)
    .toFixed(3)}</li>
    <li>Recovered: ${((JSON.stringify(data.NewRecovered) / population) * 100000)
    .toFixed(3)}</li>
  </ul>
  `;
}

export function requestCountryData(country, dataTable) {
  const title = document.querySelector('.table-nav__title');
  const img = document.querySelector('.table-nav__img');
  const currentCountry = countries.filter((el) => el.name === country)[0];
  fetch('https://api.covid19api.com/summary')
    .then((data) => data.json())
    .then((data) => {
      const searchingCountryData = data.Countries.filter((el) => el.Country === country)[0];
      title.textContent = JSON.stringify(searchingCountryData.Country);
      img.src = currentCountry.flag;
      // eslint-disable-next-line no-param-reassign
      dataTable.innerHTML = `
      <ul>
        <li>Country Code: ${JSON.stringify(searchingCountryData.CountryCode)}</li>
        <li>Slug: ${JSON.stringify(searchingCountryData.Slug)}</li>
        <li>New Confirmed: ${JSON.stringify(searchingCountryData.NewConfirmed)}</li>
        <li>Total Confirmed: ${JSON.stringify(searchingCountryData.TotalConfirmed)}</li>
        <li>New Deaths: ${JSON.stringify(searchingCountryData.NewDeaths)}</li>
        <li>Total Deaths: ${JSON.stringify(searchingCountryData.TotalDeaths)}</li>
        <li>New Recovered: ${JSON.stringify(searchingCountryData.NewRecovered)}</li>
        <li>Total Recovered: ${JSON.stringify(searchingCountryData.TotalRecovered)}</li>
        <li>Date: ${JSON.stringify(new Date(searchingCountryData.Date).toLocaleDateString())}</li>
      </ul>
      `;
    })
    .catch((err) => console.error(err));
}

export async function getGlobalSchedule(status) {
  const dates = [];
  const cases = [];
  let statusEdit;
  if (status === 'deaths') {
    statusEdit = 'total_deaths';
  } else if (status === 'recovered') {
    statusEdit = 'total_recovered';
  } else {
    statusEdit = 'total_cases';
  }
  await fetch('https://covid19-api.org/api/timeline')
    .then((data) => data.json())
    .then((data) => data.map((el) => {
      dates.push(new Date(el.last_update).toLocaleDateString());
      cases.push(+el[statusEdit]);
      return { dates, cases };
    }));
  dates.length = 100;
  dates.reverse();
  cases.reverse().length = 100;

  return { dates, cases };
}

export async function getCountrySchedule(country, param, from, to) {
  const dates = [];
  const cases = [];
  await fetch(`https://api.covid19api.com/country/${country}/status/${param}?from=${from}&to=${to}`)
    .then((data) => data.json())
    .then((data) => data.map((el) => {
      dates.push(new Date(el.Date).toLocaleDateString());
      cases.push(+el.Cases);
      return { dates, cases };
    }));

  return { dates, cases };
}
