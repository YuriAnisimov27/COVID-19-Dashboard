import DataTable from './modules/components/DataTable.component';
import ScheduleDiseases from './modules/components/ScheduleDiseases.component';
import './css/style.css';
import './css/list.css';
import './modules/components/CountryList.component';
import countries from './modules/data/countries.data';
import { storage } from './modules/utils/helpers';

window.addEventListener('load', async () => {
  new DataTable().createTable();
  new ScheduleDiseases().createSchedule();

  console.log(countries[0]);
  const data = storage('Global');
  console.log(data);
});
