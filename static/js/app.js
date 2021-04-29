// Center around Dallas
var myMap = L.map("map", {
  center: [32.7767, -96.7970],
  zoom: 12
});

// Create background 
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: api_key
}).addTo(myMap);

// Neighborhood outlines 
var outlines = 'static/data/dallas_coordinates.json';
var geojson = d3.json(outlines);
geojson.then(function(data) {

  L.geoJson(data).addTo(myMap);

})