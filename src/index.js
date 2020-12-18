import DataTable from './modules/components/DataTable.component';
import CountryList from './modules/components/CountryList.component';
import ScheduleDiseases from './modules/components/ScheduleDiseases.component';
import './css/style.css';

window.addEventListener('load', async () => {
  new DataTable().createTable();
  new CountryList().createList();
  new ScheduleDiseases().createSchedule();
});
