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

// Info box function  
function popups(feature, layer) {
  layer.bindPopup(
    "<h3>" + feature.properties.name + "</h3><hr>" +
    "<p>Median Income: " +
    "<p>Median House Price: "
  )
};

var colorList = ['#f0f9e8','#bae4bc','#7bccc4','#43a2ca','#0868ac']
function getColor(price) { // Change numbers later 
  return price > 500000 ? colorList[0] :
    price > 400000 ? colorList[1] :
      price > 300000 ? colorList[2] :
        price > 200000 ? colorList[3] :
          price > 100000 ? colorList[4] :
            colorList[5]
};

geojson.then(function(data) {
  
  // create neighborhood outlines
  L.geoJson(data, {
    style: {
      "color": "black",
      "fillColor": 'white',
      "opacity": 1
    },
    onEachFeature: popups 
  }).addTo(myMap);

  // color each neighborhood (according to median house price)
  // use https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3 to get color scheme 

  
});
var housePrices = 'static/data/houses.csv'
d3.csv(housePrices).then(function(data) {

})

// add mouseover event to show pop ups

// Add ons: 
// Grocery store markers (expands when you zoom) 

// Police report layers (color coded?)
var myMap = L.map("map", {
  center: [32.82, -96.7970],
  zoom: 11
});

// Adding heat map
var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

// Adding crime markers
var crimeUrl = "https://www.dallasopendata.com/resource/qv6i-rri7.json$limit=1000";

d3.json(crimeUrl).then(function(response) {

  console.log(response);

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    }
  }

});


var groceryData = 'static/data/grocerystores.json'
d3.json(groceryData).then(function(data) {

})