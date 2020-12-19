import DataTable from './modules/components/DataTable.component';
import CountryList from './modules/components/CountryList.component';
import ScheduleDiseases from './modules/components/ScheduleDiseases.component';
import './css/style.css';
import { storage } from './modules/utils/helpers';

window.addEventListener('load', async () => {
  new DataTable().createTable();
  new CountryList().createList();
  new ScheduleDiseases().createSchedule();
  new ScheduleDiseases().changeData();

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
});
