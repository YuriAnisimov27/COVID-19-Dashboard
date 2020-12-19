import DataTable from './modules/components/DataTable.component';
import CountryList from './modules/components/CountryList.component';
import ScheduleDiseases from './modules/components/ScheduleDiseases.component';
import './css/style.css';
import './css/list.css';
import './css/map.css';
import './modules/components/CountryList.component';
import mapBuilder from './modules/components/DiseaseMap.component';
import { storage } from './modules/utils/helpers';

window.addEventListener('load', async () => {
  new DataTable().createTable();
  new CountryList().createList();
  new CountryList().sortList();
  new ScheduleDiseases().createSchedule();
  new ScheduleDiseases().changeData();
  const mapData = storage('Countries data');
  mapBuilder(mapData);
});
