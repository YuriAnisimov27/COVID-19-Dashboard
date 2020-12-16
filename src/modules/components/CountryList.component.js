import '../utils/helpers';
import create from '../utils/helpers';

const arrowLeftBlock = create('div', 'list-listHeader__left list__arrows');
const arrowRightBlock = create('div', 'list-listHeader__right list__arrows');
const leftArrow = create('span', 'material-icons');
const rightArrow = create('span', 'material-icons');
const list = document.querySelector('.list');
const listHeader = create('div', 'list-listHeader');
const listHeaderInfo = create('div', 'listHeader__info')
const listHeaderTitleText = create('span', 'list-listHeader__title');
const listHeaderTitleAmount = create('span', 'list-listHeader__amount');
const listOfCountries = create('div', 'list-countries');
const listOfCountriesUl = create('ul', 'list-countries-ul');
const headerArr = ['Global confirmed', 'Global deaths', 'Global recovered'];
const countriesArr = ['Confirmed', 'Deths', 'Recovered'];
const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
let seted = false;
let resultGlobal;
let counter = 0;
function sortResultByCurrentCattegory(counter) {
  let res;
  switch (counter) {
    case 1:
      res = resultGlobal.Countries.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
      break;
    case 2:
      res = resultGlobal.Countries.sort((a, b) => b.TotalRecovered - a.TotalRecovered);
      break;
    default:
      res = resultGlobal.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      break;
  }
  return res;
}
function sendData(data) {
  console.log(data);
}
function changeEl(el, toChange) {
  el.innerHTML = `${toChange}`;
}
function clearEl(el) {
  el.innerHTML = '';
}
function getCountryData(currentCountry, counter) {
  let res;
  switch (counter) {
    case 1:
      res = currentCountry.TotalDeaths;
      break;
    case 2:
      res = currentCountry.TotalRecovered;
      break;
    default:
      res = currentCountry.TotalConfirmed;
      break;
  }
  return res;
}
function countriesListBuilder() {
  sortResultByCurrentCattegory(counter).forEach(el => {
    const country = create('li', 'list-countries-ul__li');
    const countryNameBlock = create('div', 'li__nameblock');
    const countrytInfoBLock = create('div', 'li__infoblock');
    const countryName = create('span', 'nameblock__name');
    const src = (el.CountryCode);
    const countryFlag = create('img', 'nameblock__flag', ['src', `https://www.countryflags.io/${src}/flat/32.png`]);
    countryName.innerHTML = `${el.Country}`;
    countryNameBlock.appendChild(countryName);
    countryNameBlock.appendChild(countryFlag);
    countrytInfoBLock.innerHTML = `${countriesArr[counter]}: ${getCountryData(el, counter)}`;
    country.appendChild(countryNameBlock);
    country.appendChild(countrytInfoBLock);
    listOfCountriesUl.appendChild(country);
    country.addEventListener('click', () => {
      if (!seted) {
        seted = true;
        country.classList.add('set');
        sendData(el); // It sends the object of current country
      } else {
        document.querySelector('.set').classList.remove('set');
        country.classList.add('set');
        sendData(el);
      }
    });
  });
}
function headerInfoBuilder() {
  leftArrow.innerHTML = 'arrow_left';
  rightArrow.innerHTML = 'arrow_right';
  arrowLeftBlock.appendChild(leftArrow);
  arrowRightBlock.appendChild(rightArrow);
  listHeaderInfo.appendChild(listHeaderTitleText);
  listHeaderInfo.appendChild(listHeaderTitleAmount);
  listHeaderTitleText.innerHTML = headerArr[counter];
  listHeaderTitleAmount.innerHTML = resultGlobal.Global.TotalConfirmed;
  listHeader.appendChild(arrowLeftBlock);
  listHeader.appendChild(listHeaderInfo);
  listHeader.appendChild(arrowRightBlock);
  listOfCountries.appendChild(listOfCountriesUl);
  list.appendChild(listHeader);
  list.appendChild(listOfCountries);
  leftArrow.addEventListener('click', () => {
    counter = (counter) ? counter - 1 : 2;
    arrowClick(counter);
    seted = false;
  });
  rightArrow.addEventListener('click', () => {
    counter = Math.abs(counter + 1) % 3;
    arrowClick(counter);
    seted = false;
  });
}
function arrowClick(counter) {
  switch (counter) {
    case 1:
      clearEl(listOfCountriesUl);
      changeEl(listHeaderTitleText, headerArr[counter]);
      changeEl(listHeaderTitleAmount, resultGlobal.Global.TotalDeaths);
      countriesListBuilder();
      break;
    case 2:
      clearEl(listOfCountriesUl);
      changeEl(listHeaderTitleText, headerArr[counter]);
      changeEl(listHeaderTitleAmount, resultGlobal.Global.TotalRecovered);
      countriesListBuilder();
      break;
    default:
      clearEl(listOfCountriesUl);
      changeEl(listHeaderTitleText, headerArr[counter]);
      changeEl(listHeaderTitleAmount, resultGlobal.Global.TotalConfirmed);
      countriesListBuilder();
      break;
  }
}

function getData(result) {
  resultGlobal = result;
  headerInfoBuilder();
  countriesListBuilder();
}

window.onload = function () {
  fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then(result => getData(result))
    .catch(error => console.log('error', error));
};
