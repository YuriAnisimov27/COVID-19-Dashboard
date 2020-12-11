export function reqGlobalData(dataTable) {
  fetch('https://api.covid19api.com/summary')
    .then((data) => data.json())
    .then((data) => {
      console.log('Global data', data.Global);
      // eslint-disable-next-line no-param-reassign
      dataTable.innerHTML = `
      <ul>
        <li>"NewConfirmed": ${JSON.stringify(data.Global.NewConfirmed)}</li>
        <li>"TotalConfirmed": ${JSON.stringify(data.Global.TotalConfirmed)}</li>
        <li>"NewDeaths": ${JSON.stringify(data.Global.NewDeaths)}</li>
        <li>"TotalDeaths": ${JSON.stringify(data.Global.TotalDeaths)}</li>
        <li>"NewRecovered": ${JSON.stringify(data.Global.NewRecovered)}</li>
        <li>"TotalRecovered": ${JSON.stringify(data.Global.TotalRecovered)}</li>
      </ul>
      `;
    })
    .catch((err) => console.error(err));
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
