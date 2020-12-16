import DataTable from './modules/components/DataTable.component';
import './css/style.css';
import './css/list.css';
import './modules/components/CountryList.component';

window.addEventListener('load', () => {
  new DataTable().createTable();
});
