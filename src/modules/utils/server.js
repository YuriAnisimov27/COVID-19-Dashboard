import { storage } from './helpers';

export async function requestData() {
  await fetch('https://disease.sh/v3/covid-19/countries')
    .then((data) => data.json())
    .then((data) => {
      storage('Countries data', data);
    })
    .catch((err) => console.error(err));

  await fetch('https://covid19-api.org/api/timeline')
    .then((data) => data.json())
    .then((data) => {
      storage('Global timeline', data);
    })
    .catch((err) => console.error(err));

  await fetch('https://disease.sh/v3/covid-19/all')
    .then((data) => data.json())
    .then((data) => {
      storage('Global data', data);
    })
    .catch((err) => console.error(err));
}

export function reqGlobalData(dataTable) {
  fetch('https://disease.sh/v3/covid-19/all')
    .then((data) => data.json())
    .then((data) => {
      // eslint-disable-next-line no-param-reassign
      dataTable.innerHTML = `
      <ul>
        <li>Total Cases: <span class='numberOfconf'> ${JSON.stringify(data.cases)}</span></li>
        <li>Total Deaths: <span class='numberOf'> ${JSON.stringify(data.deaths)}</span></li>
        <li>Total Recovered: <span class='numberOfrec'> ${JSON.stringify(data.recovered)}</span></li>
      </ul>
      `;
    })
    .catch((err) => console.error(err));
}

export function requestTotalCountData(dataTable, country) {
  const data = country
    ? storage('Countries data').filter((el) => el.country === country)[0]
    : storage('Global data');
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>Confirmed: <span class='numberOfconf'> ${JSON.stringify(data.cases)}</span></li>
    <li>Deaths: <span class='numberOf'> ${JSON.stringify(data.deaths)}</span></li>
    <li>Recovered: <span class='numberOfrec'> ${JSON.stringify(data.recovered)}</span></li>
  </ul>
  `;
}

export function requestCurrentDayData(dataTable, country) {
  const data = country
    ? storage('Countries data').filter((el) => el.country === country)[0]
    : storage('Global data');
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>Last Day Confirmed: <span class='numberOfconf'> ${JSON.stringify(data.todayCases) && 'No Data'}</span></li>
    <li>Last Day Deaths: <span class='numberOf'>${JSON.stringify(data.todayDeaths) && 'No Data'}</span></li>
    <li>Last Day Recovered: <span class='numberOfrec'>${JSON.stringify(data.todayRecovered) && 'No Data'}</span></li>
  </ul>
  `;
}

export function requestTotalCountDataPer100k(dataTable, country) {
  const data = country
    ? storage('Countries data').filter((el) => el.country === country)[0]
    : storage('Global data');
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>Confirmed: <span class='numberOfconf'> ${(JSON.stringify(data.casesPerOneMillion) * 10) && 'No Data'}</span></li>
    <li>Deaths: <span class='numberOf'> ${(JSON.stringify(data.deathsPerOneMillion) * 10) && 'No Data'}</span></li>
    <li>Recovered: <span class='numberOfrec'> ${(JSON.stringify(data.recoveredPerOneMillion) * 10) && 'No Data'}</span></li>
  </ul>
  `;
}

export function requestCurrentDayDataPer100k(dataTable, country) {
  const data = country
    ? storage('Countries data').filter((el) => el.country === country)[0]
    : storage('Global data');
  const { population } = data;
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>Confirmed:<span class='numberOfconf'> ${((JSON.stringify(data.todayCases) / population) * 100000)
    .toFixed(3) && 'No Data'}</span></li>
    <li>Deaths: <span class='numberOf'> ${((JSON.stringify(data.todayDeaths) / population) * 100000)
    .toFixed(3) && 'No Data'}</span></li>
    <li>Recovered: <span class='numberOfrec'> ${((JSON.stringify(data.todayRecovered) / population) * 100000)
    .toFixed(3) && 'No Data'}</span></li>
  </ul>
  `;
}

export function requestCountryData(country, dataTable) {
  const title = document.querySelector('.table-nav__title');
  const img = document.querySelector('.table-nav__img');
  fetch('https://disease.sh/v3/covid-19/countries')
    .then((data) => data.json())
    .then((data) => {
      const searchingCountryData = data.filter((el) => el.country === country)[0];
      title.textContent = JSON.stringify(searchingCountryData.country);
      img.src = searchingCountryData.countryInfo.flag;
      // eslint-disable-next-line no-param-reassign
      dataTable.innerHTML = `
      <ul>
        <li>Today Cases:  <span class='numberOfconf'> ${JSON.stringify(searchingCountryData.todayCases) && 'No Data'}</li>
        <li>Total Cases:  <span class='numberOfconf'> ${JSON.stringify(searchingCountryData.cases)}</span></li>
        <li>Today Deaths:  <span class='numberOf'> ${JSON.stringify(searchingCountryData.todayDeaths) && 'No Data'}</span></li>
        <li>Total Deaths:  <span class='numberOf'> ${JSON.stringify(searchingCountryData.deaths)}</span></li>
        <li>Today Recovered:  <span class='numberOfrec'> ${JSON.stringify(searchingCountryData.todayRecovered) && 'No Data'}</span></li>
        <li>Total Recovered: <span class='numberOfrec'>${JSON.stringify(searchingCountryData.recovered)}</span></li>
        <li>Population: ${JSON.stringify(searchingCountryData.population)}</span></li>
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
  cases.length = 100;
  cases.reverse();

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
