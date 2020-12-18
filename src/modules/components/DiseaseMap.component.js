/* eslint-disable no-undef */
import { countriesGeo } from '../geodata/countries.geo';
import create from '../utils/helpers';

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
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 1) {
      comp = searchData(currentCountryTofill).TotalDeaths;
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 2) {
      comp = searchData(currentCountryTofill).TotalRecovered;
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 3) {
      comp = (searchData(currentCountryTofill).TotalConfirmed / 100000);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 4) {
      comp = (searchData(currentCountryTofill).TotalDeaths / 100000);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 5) {
      comp = (searchData(currentCountryTofill).TotalRecovered / 100000);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 6) {
      comp = (searchData(currentCountryTofill).NewConfirmed);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 7) {
      comp = (searchData(currentCountryTofill).NewDeaths);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 8) {
      comp = (searchData(currentCountryTofill).NewRecovered);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 9) {
      comp = ((searchData(currentCountryTofill).NewConfirmed) / 100000);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 10) {
      comp = ((searchData(currentCountryTofill).NewDeaths) / 100000);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
    }
    if (counter === 11) {
      comp = ((searchData(currentCountryTofill).NewRecovered) / 100000);
      // eslint-disable-next-line no-nested-ternary
      return comp === 0 ? '#b89c39'
        // eslint-disable-next-line no-nested-ternary
        : comp <= 5000 ? '#4fa0b3'
          // eslint-disable-next-line no-nested-ternary
          : comp <= 50000 ? '#2368b8'
            // eslint-disable-next-line no-nested-ternary
            : comp <= 500000 ? '#0751a6'
              : comp <= 1000000 ? '#053a78' : '#002045';
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
        ? `<b>${current.Country}</b><br />${(current.NewConfirmed) / 100000} New recoveries per 100k`
        : 'Select country'}`;
    }
    if (counter === 10) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> New deathes per 100 k </h4>${current
        ? `<b>${current.Country}</b><br />${(current.NewDeaths) / 100000} New recoveries per 100k`
        : 'Select country'}`;
    }
    if (counter === 11) {
      const current = countryToShowData && searchData(countryToShowData.name);
      this.div.innerHTML = `<h4> New recoveries per 100 k </h4>${current
        ? `<b>${current.Country}</b><br />${(current.NewRecovered) / 100000} New recoveries per 100k`
        : 'Select country'}`;
    }
  };
  info.addTo(map);
  function getColor(param) {
    // eslint-disable-next-line no-nested-ternary
    return param === 0 ? '#b89c39'
      // eslint-disable-next-line no-nested-ternary
      : param <= 5000 ? '#4fa0b3'
        // eslint-disable-next-line no-nested-ternary
        : param <= 50000 ? '#2368b8'
          // eslint-disable-next-line no-nested-ternary
          : param <= 500000 ? '#0751a6'
            : param <= 1000000 ? '#053a78' : '#002045';
  }
  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legeng');
    const gradesCases = [0, 5000, 50000, 500000, 1000000];
    const gradesDeaths = [0, 5000, 50000, 500000, 1000000];
    const gradesRecoveries = [0, 5000, 50000, 500000, 1000000];
    const gradesCasesPer100K = [0, 5000, 50000, 500000, 1000000];
    const gradesDeathsPer100K = [0, 5000, 50000, 500000, 1000000];
    const gradesRecoveriesPer100K = [0, 5000, 50000, 500000, 1000000];
    const gradesNewCases = [0, 5000, 50000, 500000, 1000000];
    const gradesNewDeaths = [0, 5000, 50000, 500000, 1000000];
    const gradesNewRecoveries = [0, 5000, 50000, 500000, 1000000];
    const gradesNewCasesPer100K = [0, 5000, 50000, 500000, 1000000];
    const gradesNewDeathsPer100K = [0, 5000, 50000, 500000, 1000000];
    const gradesNewRecoveriesPer100K = [0, 5000, 50000, 500000, 1000000];
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
