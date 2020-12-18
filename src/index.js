import DataTable from './modules/components/DataTable.component';
import CountryList from './modules/components/CountryList.component';
import ScheduleDiseases from './modules/components/ScheduleDiseases.component';
import './css/style.css';
import countries from './modules/data/countries.data';
import { storage } from './modules/utils/helpers';

window.addEventListener('load', async () => {
  new DataTable().createTable();
  new CountryList().createList();
  new ScheduleDiseases().createSchedule();

  console.log(countries[0]);
  const data = storage('Global');
  console.log('Global', data);
  const currentDay = storage('Current Day');
  console.log('currentDay', currentDay);
});
