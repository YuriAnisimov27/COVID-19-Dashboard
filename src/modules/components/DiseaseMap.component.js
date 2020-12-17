import { countriesGeo } from '../geodata/countries.geo';
// import { jsonWithStatistic } from ...
let jsonWithStatistic;
let geojson;
const info = L.control();
const map = L.map('map').setView([51.505, -0.09], 2);
const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on('drag', function () {
  map.panInsideBounds(bounds, { animate: true });
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
  jsonWithStatistic.Countries.forEach((el) => {
    if (el.Country === currentCountryTofill) {
      result = el;
    }
  });
  return result;
}
function getFillColor(currentCountryTofill) {
  const comp = searchData(currentCountryTofill).Countries.TotalConfirmed;
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
function style(feature) {
  return {
    // fillColor: getFillColor(feature.properties.name),
    weight: 0.5,
    color: 'red',
    dashArray: '5',
    fillOpacity: 0.4,
  };
}
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
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
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
info.update = function (countryToShowData) {
  this._div.innerHTML = '<h4> Total confirmed cases</h4>' + (countryToShowData ?
    '<b>' + countryToShowData.Country + '</b><br />' + countryToShowData.TotalConfirmed + ' Cases'
    : 'Select country');
};
info.addTo(map);
