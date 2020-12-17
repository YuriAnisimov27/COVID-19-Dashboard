import { storage } from './helpers';

export function reqGlobalData(dataTable) {
  fetch('https://api.covid19api.com/summary')
    .then((data) => data.json())
    .then((data) => {
      storage('Global data', data.Global);
      storage('Global', data);
      // eslint-disable-next-line no-param-reassign
      dataTable.innerHTML = `
      <ul>
        <li>"Total Confirmed": ${JSON.stringify(data.Global.TotalConfirmed)}</li>
        <li>"Total Deaths": ${JSON.stringify(data.Global.TotalDeaths)}</li>
        <li>"Total Recovered": ${JSON.stringify(data.Global.TotalRecovered)}</li>
      </ul>
      `;
    })
    .catch((err) => console.error(err));
}

export function requestTotalCountData(dataTable) {
  const data = storage('Global data');
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>"Confirmed": ${JSON.stringify(data.TotalConfirmed)}</li>
    <li>"Deaths": ${JSON.stringify(data.TotalDeaths)}</li>
    <li>"Recovered": ${JSON.stringify(data.TotalRecovered)}</li>
  </ul>
  `;
}

export function requestCurrentDayData(dataTable) {
  const data = storage('Global data');
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>"Confirmed": ${JSON.stringify(data.NewConfirmed)}</li>
    <li>"Deaths": ${JSON.stringify(data.NewDeaths)}</li>
    <li>"Recovered": ${JSON.stringify(data.NewRecovered)}</li>
  </ul>
  `;
}

export function requestTotalCountDataPer100k(dataTable) {
  const data = storage('Global data');
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>"Confirmed": ${((JSON.stringify(data.TotalConfirmed) / 7800000000) * 100000)
    .toFixed(3)}</li>
    <li>"Deaths": ${((JSON.stringify(data.TotalDeaths) / 7800000000) * 100000)
    .toFixed(3)}</li>
    <li>"Recovered": ${((JSON.stringify(data.TotalRecovered) / 7800000000) * 100000)
    .toFixed(3)}</li>
  </ul>
  `;
}

export function requestCurrentDayDataPer100k(dataTable) {
  const data = storage('Global data');
  const dataTableClone = dataTable;
  dataTableClone.innerHTML = `
  <ul>
    <li>"Confirmed": ${((JSON.stringify(data.NewConfirmed) / 7800000000) * 100000)
    .toFixed(3)}</li>
    <li>"Deaths": ${((JSON.stringify(data.NewDeaths) / 7800000000) * 100000)
    .toFixed(3)}</li>
    <li>"Recovered": ${((JSON.stringify(data.NewRecovered) / 7800000000) * 100000)
    .toFixed(3)}</li>
  </ul>
  `;
}

export function requestCountryData(country, dataTable) {
  fetch('https://api.covid19api.com/summary')
    .then((data) => data.json())
    .then((data) => {
      const searchingCountryData = data.Countries.filter((el) => el.Country === country)[0];
      console.log('searchingCountryData', searchingCountryData);
      // eslint-disable-next-line no-param-reassign
      dataTable.innerHTML = `
      <ul>
        <li>"Country": ${JSON.stringify(searchingCountryData.Country)}</li>
        <li>"CountryCode": "${JSON.stringify(searchingCountryData.CountryCode)}"</li>
        <li>"Slug": "${JSON.stringify(searchingCountryData.Slug)}"</li>
        <li>"NewConfirmed": ${JSON.stringify(searchingCountryData.NewConfirmed)}</li>
        <li>"TotalConfirmed": ${JSON.stringify(searchingCountryData.TotalConfirmed)}</li>
        <li>"NewDeaths": ${JSON.stringify(searchingCountryData.NewDeaths)}</li>
        <li>"TotalDeaths": ${JSON.stringify(searchingCountryData.TotalDeaths)}</li>
        <li>"NewRecovered": ${JSON.stringify(searchingCountryData.NewRecovered)}</li>
        <li>"TotalRecovered": ${JSON.stringify(searchingCountryData.TotalRecovered)}</li>
        <li>"Date": "${JSON.stringify(searchingCountryData.Date)}"</li>
      </ul>
      `;
    })
    .catch((err) => console.error(err));
}

export async function getCountrySchedule(country, from, to) {
  const dates = [];
  const cases = [];
  await fetch(`https://api.covid19api.com/country/${country}/status/confirmed?from=${from}&to=${to}`)
    .then((data) => data.json())
    .then((data) => data.map((el) => {
      dates.push(new Date(el.Date).toLocaleDateString());
      cases.push(+el.Cases);
      return { dates, cases };
    }));

  return { dates, cases };
}
