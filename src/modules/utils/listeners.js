import create from './helpers';

export default function countrySearchingHandler(event, dataTable) {
  // eslint-disable-next-line no-param-reassign
  dataTable.innerHTML = '';
  fetch('https://api.covid19api.com/summary')
    .then((data) => data.json())
    .then((arr) => {
      const searchingCountryData = arr.Countries
        .filter((el) => el.Country.toLowerCase().startsWith(event.target.value));
      searchingCountryData.forEach((el) => {
        const itemCountry = create('p');
        itemCountry.textContent = el.Country;
        dataTable.append(itemCountry);
      });
    });
}
