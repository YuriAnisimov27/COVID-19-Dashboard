import DataTable from './modules/components/DataTable.component';
import CountryList from './modules/components/CountryList.component';
import ScheduleDiseases from './modules/components/ScheduleDiseases.component';
import './css/style.css';

window.addEventListener('load', async () => {
  new DataTable().createTable();
  new CountryList().createList();
  new CountryList().sortList();
  new ScheduleDiseases().createSchedule();
  new ScheduleDiseases().changeData();
});
