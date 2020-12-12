import '../utils/helpers';
import create from '../utils/helpers';

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};



function listBuilder(result) {
  const list = document.querySelector('.list');
  const globalCases = create('div', 'list-globalCases');
  const globalCasesTitleText = create('span', 'list-globalCases__title');
  const globalCasesTitleAmount = create('span', 'list-globalCases__amount');
  const globalCasesList = create('div', 'list-countries');
  const globalCasesListUl = create('ul', 'list-countries-ul');
  globalCasesTitleText.innerHTML = `Global confirmed`;
  globalCasesTitleAmount.innerHTML = result.Global.TotalDeaths;
  globalCases.appendChild(globalCasesTitleText);
  globalCases.appendChild(globalCasesTitleAmount);
  globalCases.appendChild(globalCasesList);
  globalCasesList.appendChild(globalCasesListUl);
  list.appendChild(globalCases);
  list.appendChild(globalCasesList);
  result.Countries.sort((a,b) => b.TotalConfirmed - a.TotalConfirmed).forEach(el => {
    const country = create('li','list-countries-ul__li');
    const countryNameBlock = create('div','li__nameblock');
    const countrtInfoBLock = create('div', 'li__infoblock');
    const countryName = create('span','nameblock__name');
    const src = (el.CountryCode)
    const countryFlag = create('img','nameblock__flag',['src',`https://www.countryflags.io/${src}/flat/32.png`]);
    countryName.innerHTML = `${el.Country}`;
    countryNameBlock.appendChild(countryName);
    countryNameBlock.appendChild(countryFlag);
    countrtInfoBLock.innerHTML = `Confirmed: ${el.TotalConfirmed}`
    country.appendChild(countryNameBlock);
    country.appendChild(countrtInfoBLock);
    globalCasesListUl.appendChild(country);
  });
}

window.onload = function () {
  fetch("https://api.covid19api.com/summary", requestOptions)
  .then(response => response.json())
  .then(result => listBuilder(result))
  .catch(error => console.log('error', error));
}
