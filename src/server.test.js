const fetch = require('isomorphic-fetch');

test('valid data for countries', async () => {
  let countries;
  const value = await fetch('https://disease.sh/v3/covid-19/countries')
    .then((data) => data.json())
    .then((data) => {
      countries = data;
      return true;
    });
  expect(countries[0].country).not.toBe(undefined);
  expect(countries[0].cases).not.toBe(undefined);
  expect(countries[0].todayCases).not.toBe(undefined);
  expect(countries[0].deaths).not.toBe(undefined);
  expect(countries[0].todayDeaths).not.toBe(undefined);
  expect(countries[0].recovered).not.toBe(undefined);
  expect(countries[0].todayRecovered).not.toBe(undefined);
  expect(countries[0].countryInfo.flag).not.toBe(undefined);
  expect(countries[0].population).not.toBe(undefined);
  expect(value).toBe(true);
});

test('valid global timeline', async () => {
  let timeline;
  const value = await fetch('https://covid19-api.org/api/timeline')
    .then((data) => data.json())
    .then((data) => {
      timeline = data;
      return true;
    });
  expect(timeline[0]).not.toBeUndefined();
  expect(value).toBe(true);
});

test('valid Global data', async () => {
  let global;
  const value = await fetch('https://disease.sh/v3/covid-19/all')
    .then((data) => data.json())
    .then((data) => {
      global = data;
      return true;
    });
  expect(global.cases).not.toBe(undefined);
  expect(global.todayCases).not.toBe(undefined);
  expect(global.deaths).not.toBe(undefined);
  expect(global.todayDeaths).not.toBe(undefined);
  expect(global.recovered).not.toBe(undefined);
  expect(global.todayRecovered).not.toBe(undefined);
  expect(global.population).not.toBe(undefined);
  expect(value).toBe(true);
});

test('checking the definition of global data or for a country', () => {
  function requestTotalCountData(dataTable, country) {
    const data = country
      ? []
      : {};
    const dataTableClone = dataTable;
    dataTableClone.innerHTML = '<span>Some Text</span>';
    return data;
  }
  const dataTable = {};
  const global = requestTotalCountData(dataTable);
  const local = requestTotalCountData(dataTable, 'country');
  expect(global).toStrictEqual({});
  expect(local).toStrictEqual([]);
});

test('change DOM element', () => {
  function requestTotalCountData(dataTable, country) {
    const dataTableClone = dataTable;
    dataTableClone.innerHTML = `<span>${country}</span>`;
    return dataTableClone;
  }
  const dataTable = {};
  requestTotalCountData(dataTable, 'Belarus');
  expect(dataTable.innerHTML).toStrictEqual('<span>Belarus</span>');
});
