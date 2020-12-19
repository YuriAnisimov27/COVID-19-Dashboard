/* eslint-disable no-undef */
import { countriesGeo } from '../geodata/countries.geo';
import create from '../utils/helpers';

const gradesCases = [0, 5000, 50000, 500000, 1000000];
const gradesDeaths = [0, 50, 500, 50000, 500000];
const gradesRecoveries = [0, 5000, 50000, 500000, 1000000];
const gradesCasesPer100K = [0, 1, 20, 50, 100];
const gradesDeathsPer100K = [0, 0.01, 0.1, 0.5, 1];
const gradesRecoveriesPer100K = [0, 1, 5, 10, 20];
const gradesNewCases = [0, 100, 1000, 50000, 100000];
const gradesNewDeaths = [0, 10, 100, 500, 1000];
const gradesNewRecoveries = [0, 100, 1000, 5000, 10000];
const gradesNewCasesPer100K = [0, 0.01, 0.1, 0.5, 1];
const gradesNewDeathsPer100K = [0, 0.001, 0.01, 0.1, 0.5];
const gradesNewRecoveriesPer100K = [0, 0.001, 0.01, 0.1, 0.5];
const population = 1000000;
let counter = 0;
let dataClone;

export default function mapBuilder(data) {
  dataClone = data;
  const filterMap = create('nav', 'map-nav');
  const filterArrowLeft = create('div', 'map-nav__arrow material-icons');
  const filterArrowRight = create('div', 'map-nav__arrow material-icons');
  filterArrowLeft.innerHTML = 'arrow_left';
  filterArrowRight.innerHTML = 'arrow_right';
  filterMap.appendChild(filterArrowLeft);
  filterMap.appendChild(filterArrowRight);
  const mapBlock = document.querySelector('#mapBlock');
  mapBlock.appendChild(filterMap);
  const jsonWithStatistic = data;
  let geojson;
  const info = L.control();
  const legend = L.control({ position: 'bottomleft' });
  const map = L.map('map').setView([51.505, -0.09], 2);
  const southWest = L.latLng(-90, -180);
  const northEast = L.latLng(90, 180);
  const bounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);
  map.on('drag', () => {
    map.panInsideBounds(bounds, { animate: false });
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 6,
    minZoom: 2,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGV4YW1hcnQiLCJhIjoiY2tpb2JjemY2MTk5bjJzbGJqcTl0dTU1eiJ9.1wnRTye0U-df9rDuEZ8SVA',
  }).addTo(map);

  function searchData(currentCountryTofill) {
    let result = 0;
    jsonWithStatistic.forEach((el) => {
      if (el.Country === currentCountryTofill) {
        result = el;
      }
    });
    return result;
  }
  function getFillColor(currentCountryTofill) {
    let comp;
    if (counter === 0) {
      comp = searchData(currentCountryTofill).TotalConfirmed;
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesCases[0] ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesCases[1] ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesCases[2] ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesCases[3] ? '#0751a6'
              : comp <= gradesCases[4] ? '#053a78' : '#002045';
    }
    if (counter === 1) {
      comp = searchData(currentCountryTofill).TotalDeaths;
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesDeaths[0] ? '#ffd9b3'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesDeaths[1] ? '#ffcc99'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesDeaths[2] ? '#ffb366'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesDeaths[3] ? '#ff9933'
              : comp <= gradesDeaths[4] ? '#cc6600' : '#994d00';
    }
    if (counter === 2) {
      comp = searchData(currentCountryTofill).TotalRecovered;
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesRecoveries[0] ? '#ccffcc'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesRecoveries[1] ? '#1aff1a'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesRecoveries[2] ? '#00e600'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesRecoveries[3] ? '#00b300'
              : comp <= gradesRecoveries[4] ? '#008000' : '#004d00';
    }
    if (counter === 3) {
      comp = (searchData(currentCountryTofill).TotalConfirmed / population);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesCasesPer100K[0] ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesCasesPer100K[1] ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesCasesPer100K[2] ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesCasesPer100K[3] ? '#0751a6'
              : comp <= gradesCasesPer100K[4] ? '#053a78' : '#002045';
    }
    if (counter === 4) {
      comp = (searchData(currentCountryTofill).TotalDeaths / population);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesDeathsPer100K[0] ? '#ffd9b3'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesDeathsPer100K[1] ? '#ffcc99'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesDeathsPer100K[2] ? '#ffb366'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesDeathsPer100K[3] ? '#ff9933'
              : comp <= gradesDeathsPer100K[4] ? '#cc6600' : '#994d00';
    }
    if (counter === 5) {
      comp = (searchData(currentCountryTofill).TotalRecovered / population);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesRecoveriesPer100K[0] ? '#ccffcc'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesRecoveriesPer100K[1] ? '#1aff1a'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesRecoveriesPer100K[2] ? '#00e600'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesRecoveriesPer100K[3] ? '#00b300'
              : comp <= gradesRecoveriesPer100K[4] ? '#008000' : '#004d00';
    }
    if (counter === 6) {
      comp = (searchData(currentCountryTofill).NewConfirmed);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesNewCases[0] ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesNewCases[1] ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesNewCases[2] ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesNewCases[3] ? '#0751a6'
              : comp <= gradesNewCases[4] ? '#053a78' : '#002045';
    }
    if (counter === 7) {
      comp = (searchData(currentCountryTofill).NewDeaths);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesNewDeaths[0] ? '#ffd9b3'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesNewDeaths[1] ? '#ffcc99'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesNewDeaths[2] ? '#ffb366'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesNewDeaths[3] ? '#ff9933'
              : comp <= gradesNewDeaths[4] ? '#cc6600' : '#994d00';
    }
    if (counter === 8) {
      comp = (searchData(currentCountryTofill).NewRecovered);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesNewRecoveries[0] ? '#ccffcc'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesNewRecoveries[1] ? '#1aff1a'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesNewRecoveries[2] ? '#00e600'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesNewRecoveries[3] ? '#00b300'
              : comp <= gradesNewRecoveries[4] ? '#008000' : '#004d00';
    }
    if (counter === 9) {
      comp = ((searchData(currentCountryTofill).NewConfirmed) / population);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesNewCasesPer100K[0] ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesNewCasesPer100K[1] ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesNewCasesPer100K[2] ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesNewCasesPer100K[3] ? '#0751a6'
              : comp <= gradesNewCasesPer100K[4] ? '#053a78' : '#002045';
    }
    if (counter === 10) {
      comp = ((searchData(currentCountryTofill).NewDeaths) / population);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesNewDeathsPer100K[0] ? '#ffd9b3'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesNewDeathsPer100K[1] ? '#ffcc99'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesNewDeathsPer100K[2] ? '#ffb366'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesNewDeathsPer100K[3] ? '#ff9933'
              : comp <= gradesNewDeathsPer100K[4] ? '#cc6600' : '#994d00';
    }
    if (counter === 11) {
      comp = ((searchData(currentCountryTofill).NewRecovered) / population);
      // eslint-disable-next-line no-nested-ternary
      return comp === gradesNewRecoveriesPer100K[0] ? '#ccffcc'
        // eslint-disable-next-line no-nested-ternary
        : comp <= gradesNewRecoveriesPer100K[1] ? '#1aff1a'
          // eslint-disable-next-line no-nested-ternary
          : comp <= gradesNewRecoveriesPer100K[2] ? '#00e600'
            // eslint-disable-next-line no-nested-ternary
            : comp <= gradesNewRecoveriesPer100K[3] ? '#00b300'
              : comp <= gradesNewRecoveriesPer100K[4] ? '#008000' : '#004d00';
    }
    return comp;
  }
  function style(feature) {
    return {
      fillColor: getFillColor(feature.properties.name, counter),
      weight: 0.5,
      color: 'red',
      dashArray: '5',
      fillOpacity: 0.4,
    };
  }
  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    console.log(e.target.feature.properties.name);
    // call builder function of table or schedule.
    // e.target.feature.properties.name - name of chosen country
  }

  function highlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
  }
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  }
  L.geoJson(countriesGeo, { style }).addTo(map);
  geojson = L.geoJson(countriesGeo, {
    style,
    onEachFeature,
  }).addTo(map);

  info.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info');
    this.update();
    return this.div;
  };
  info.update = function (countryToShowData) {
    if (counter === 0) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> Total confirmed cases</h4>${current
        ? `<b>${current.Country}</b><br />${current.TotalConfirmed} Cases`
        : 'Select country'}`;
    }
    if (counter === 1) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> Total confirmed deaths</h4>${current
        ? `<b>${current.Country}</b><br />${current.TotalDeaths} Deaths`
        : 'Select country'}`;
    }
    if (counter === 2) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> Total recovered</h4>${current
        ? `<b>${current.Country}</b><br />${current.TotalRecovered} recoveries`
        : 'Select country'}`;
    }
    if (counter === 3) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> Total confirmed cases per 100k </h4>${current
        ? `<b>${current.Country}</b><br />${(current.TotalConfirmed) / 100000} Cases per 100k`
        : 'Select country'}`;
    }
    if (counter === 4) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> Total confirmed deaths per 100k </h4>${current
        ? `<b>${current.Country}</b><br />${(current.TotalDeaths) / 100000} Deaths per 100k`
        : 'Select country'}`;
    }
    if (counter === 5) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> Total confirmed recoveries per 100k </h4>${current
        ? `<b>${current.Country}</b><br />${(current.TotalRecovered) / 100000} Recoveries per 100k`
        : 'Select country'}`;
    }
    if (counter === 6) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> New cases </h4>${current
        ? `<b>${current.Country}</b><br />${(current.NewConfirmed)} New cases`
        : 'Select country'}`;
    }
    if (counter === 7) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> New deaths </h4>${current
        ? `<b>${current.Country}</b><br />${(current.NewDeaths)} New deaths`
        : 'Select country'}`;
    }
    if (counter === 8) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> New recoveries </h4>${current
        ? `<b>${current.Country}</b><br />${(current.NewRecovered)} New recoveries`
        : 'Select country'}`;
    }
    if (counter === 9) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> New cases per 100 k </h4>${current
        ? `<b>${current.Country}</b><br />${(current.NewConfirmed) / population} New recoveries per 100k`
        : 'Select country'}`;
    }
    if (counter === 10) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> New deathes per 100 k </h4>${current
        ? `<b>${current.Country}</b><br />${(current.NewDeaths) / population} New recoveries per 100k`
        : 'Select country'}`;
    }
    if (counter === 11) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> New recoveries per 100 k </h4>${current
        ? `<b>${current.Country}</b><br />${(current.NewRecovered) / population} New recoveries per 100k`
        : 'Select country'}`;
    }
  };
  info.addTo(map);
  function getColor(param) {
    if (counter === 0) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesCases[0] ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesCases[1] ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesCases[2] ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesCases[3] ? '#0751a6'
              : param <= gradesCases[4] ? '#053a78' : '#002045';
    }
    if (counter === 1) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesDeaths[0] ? '#ffd9b3'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesDeaths[1] ? '#ffcc99'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesDeaths[2] ? '#ffb366'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesDeaths[3] ? '#ff9933'
              : param <= gradesDeaths[4] ? '#cc6600' : '#994d00';
    }
    if (counter === 2) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesRecoveries[0] ? '#ccffcc'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesRecoveries[1] ? '#1aff1a'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesRecoveries[2] ? '#00e600'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesRecoveries[3] ? '#00b300'
              : param <= gradesRecoveries[4] ? '#008000' : '#004d00';
    }
    if (counter === 3) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesCasesPer100K[0] ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesCasesPer100K[1] ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesCasesPer100K[2] ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesCasesPer100K[3] ? '#0751a6'
              : param <= gradesCasesPer100K[4] ? '#053a78' : '#002045';
    }
    if (counter === 4) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesDeathsPer100K[0] ? '#ffd9b3'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesDeathsPer100K[1] ? '#ffcc99'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesDeathsPer100K[2] ? '#ffb366'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesDeathsPer100K[3] ? '#ff9933'
              : param <= gradesDeathsPer100K[4] ? '#cc6600' : '#994d00';
    }
    if (counter === 5) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesRecoveriesPer100K[0] ? '#ccffcc'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesRecoveriesPer100K[1] ? '#1aff1a'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesRecoveriesPer100K[2] ? '#00e600'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesRecoveriesPer100K[3] ? '#00b300'
              : param <= gradesRecoveriesPer100K[4] ? '#008000' : '#004d00';
    }
    if (counter === 6) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesNewCases[0] ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesNewCases[1] ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesNewCases[2] ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesNewCases[3] ? '#0751a6'
              : param <= gradesNewCases[4] ? '#053a78' : '#002045';
    }
    if (counter === 7) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesNewDeaths[0] ? '#ffd9b3'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesNewDeaths[1] ? '#ffcc99'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesNewDeaths[2] ? '#ffb366'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesNewDeaths[3] ? '#ff9933'
              : param <= gradesNewDeaths[4] ? '#cc6600' : '#994d00';
    }
    if (counter === 8) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesNewRecoveries[0] ? '#ccffcc'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesNewRecoveries[1] ? '#1aff1a'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesNewRecoveries[2] ? '#00e600'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesNewRecoveries[3] ? '#00b300'
              : param <= gradesNewRecoveries[4] ? '#008000' : '#004d00';
    }
    if (counter === 9) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesNewCasesPer100K[0] ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesNewCasesPer100K[1] ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesNewCasesPer100K[2] ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesNewCasesPer100K[3] ? '#0751a6'
              : param <= gradesNewCasesPer100K[4] ? '#053a78' : '#002045';
    }
    if (counter === 10) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesNewDeathsPer100K[0] ? '#ffd9b3'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesNewDeathsPer100K[1] ? '#ffcc99'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesNewDeathsPer100K[2] ? '#ffb366'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesNewDeathsPer100K[3] ? '#ff9933'
              : param <= gradesNewDeathsPer100K[4] ? '#cc6600' : '#994d00';
    }
    if (counter === 11) {
      // eslint-disable-next-line no-nested-ternary
      return param === gradesNewRecoveriesPer100K[0] ? '#ccffcc'
        // eslint-disable-next-line no-nested-ternary
        : param <= gradesNewRecoveriesPer100K[1] ? '#1aff1a'
          // eslint-disable-next-line no-nested-ternary
          : param <= gradesNewRecoveriesPer100K[2] ? '#00e600'
            // eslint-disable-next-line no-nested-ternary
            : param <= gradesNewRecoveriesPer100K[3] ? '#00b300'
              : param <= gradesNewRecoveriesPer100K[4] ? '#008000' : '#004d00';
    }
    return param;
  }
  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legeng');
    if (counter === 0) {
      for (let i = 0; i < gradesCases.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesCases[i])}"></div>${gradesCases[i]}${gradesCases[i + 1] ? `&ndash;${gradesCases[i + 1]}` : '+'}`;
      }
    }
    if (counter === 1) {
      for (let i = 0; i < gradesDeaths.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesDeaths[i])}"></div>${gradesDeaths[i]}${gradesDeaths[i + 1] ? `&ndash;${gradesDeaths[i + 1]}` : '+'}`;
      }
    }
    if (counter === 2) {
      for (let i = 0; i < gradesRecoveries.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesRecoveries[i])}"></div>${gradesRecoveries[i]}${gradesRecoveries[i + 1] ? `&ndash;${gradesRecoveries[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 3) {
      for (let i = 0; i < gradesCasesPer100K.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesCasesPer100K[i])}"></div>${gradesCasesPer100K[i]}${gradesCasesPer100K[i + 1] ? `&ndash;${gradesCasesPer100K[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 4) {
      for (let i = 0; i < gradesDeathsPer100K.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesDeathsPer100K[i])}"></div>${gradesDeathsPer100K[i]}${gradesDeathsPer100K[i + 1] ? `&ndash;${gradesDeathsPer100K[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 5) {
      for (let i = 0; i < gradesRecoveriesPer100K.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesRecoveriesPer100K[i])}"></div>${gradesRecoveriesPer100K[i]}${gradesRecoveriesPer100K[i + 1] ? `&ndash;${gradesRecoveriesPer100K[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 6) {
      for (let i = 0; i < gradesNewCases.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesNewCases[i])}"></div>${gradesNewCases[i]}${gradesNewCases[i + 1] ? `&ndash;${gradesNewCases[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 7) {
      for (let i = 0; i < gradesNewDeaths.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesNewDeaths[i])}"></div>${gradesNewDeaths[i]}${gradesNewDeaths[i + 1] ? `&ndash;${gradesNewDeaths[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 8) {
      for (let i = 0; i < gradesNewRecoveries.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesNewRecoveries[i])}"></div>${gradesNewRecoveries[i]}${gradesNewRecoveries[i + 1] ? `&ndash;${gradesNewRecoveries[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 9) {
      for (let i = 0; i < gradesNewCasesPer100K.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesNewCasesPer100K[i])}"></div>${gradesNewCasesPer100K[i]}${gradesNewCasesPer100K[i + 1] ? `&ndash;${gradesNewCasesPer100K[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 10) {
      for (let i = 0; i < gradesNewDeathsPer100K.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesDeathsPer100K[i])}"></div>${gradesNewDeathsPer100K[i]}${gradesNewCasesPer100K[i + 1] ? `&ndash;${gradesNewCasesPer100K[i + 1]}` : ' + '}`;
      }
    }
    if (counter === 11) {
      for (let i = 0; i < gradesNewRecoveriesPer100K.length; i += 1) {
        div.innerHTML
          += `<div= class = "legendText" style = "background:${getColor(gradesNewRecoveriesPer100K[i])}"></div>${gradesNewRecoveriesPer100K[i]}${gradesNewRecoveriesPer100K[i + 1] ? `&ndash;${gradesNewRecoveriesPer100K[i + 1]}` : ' + '}`;
      }
    }
    return div;
  };
  legend.addTo(map);
  filterArrowLeft.addEventListener('click', () => {
    counter = (counter) ? counter - 1 : 11;
    mapBlock.removeChild(filterMap);
    map.remove();
    mapBuilder(dataClone);
  });
  filterArrowRight.addEventListener('click', () => {
    counter = Math.abs(counter + 1) % 12;
    console.log(counter);
    mapBlock.removeChild(filterMap);
    map.remove();
    mapBuilder(dataClone);
  });
}
