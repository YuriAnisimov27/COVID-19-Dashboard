import DataTable from './modules/components/DataTable.component';
import './css/style.css';
import './css/list.css';
import './css/map.css';
import './modules/components/CountryList.component';
import mapBuilder from './modules/components/DiseaseMap.component';
import { storage } from './modules/utils/helpers';

window.addEventListener('load', () => {
  const mapData = storage('Countries data');
  new DataTable().createTable();
  mapBuilder(mapData);
});
