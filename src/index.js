import DataTable from './modules/components/DataTable.component';
import './css/style.css';
import './css/list.css';
import './css/map.css';
import './modules/components/CountryList.component';
import './modules/components/DiseaseMap.component';

window.addEventListener('load', () => {
  new DataTable().createTable();
});
