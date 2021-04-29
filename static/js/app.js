// Center around Dallas
var myMap = L.map("map", {
  center: [32.82, -96.7970],
  zoom: 11
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
  
  // create neighborhood outlines
  L.geoJson(data).addTo(myMap);

  // color each neighborhood (according to median house price)
  // use https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3 to get color scheme 

  // Add pop ups with neighborhood names and median price for each feature
  
  
});

// add mouseover event to show pop ups

// Add ons: 
// Grocery store markers (expands when you zoom) 
// Police report layers (color coded?)

var groceryData = 'static/data/grocerystores.json'
d3.json(groceryData).then(function(data) {
  
})