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
  id: "mapbox/light-v10",
  accessToken: api_key
}).addTo(myMap);


// Neighborhood outlines 
var outlines = 'static/data/dallas_coordinates.json';

// House data 
var housePrices = 'static/data/houses.geojson'

// Info box function  
function popups(feature, layer) {
  layer.bindPopup(
    "<h3>" + feature.properties.name + "</h3><hr>" +
    "<p>Median Income: " +
    "<p>Median House Price: "
  )
};

// Neighborhood information 
d3.json(outlines).then(function(data) {
  
  // create neighborhood outlines
  L.geoJson(data, {
    style: {
      "color": "black",
      "fillColor": 'white',
      "opacity": 1
    },

    // Add pop up boxes 
    onEachFeature: popups 
  }).addTo(myMap);
});


// color each neighborhood (according to median house price)
var colorList = ['#f0f9e8','#bae4bc','#7bccc4','#43a2ca','#0868ac']
function getColor(price) { // Change numbers later 
  return price > 500000 ? colorList[0] :
    price > 400000 ? colorList[1] :
      price > 300000 ? colorList[2] :
        price > 200000 ? colorList[3] :
          price > 100000 ? colorList[4] :
            colorList[5]
};

// Choropleth styling 
function style(data) {
  return {
      fillColor: getColor(data.price),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function markerSize(size) {
  return size / 150;
}

// House information pop ups
function housePopup(feature, coordinate) {
  coordinate.bindPopup(
    "<h3>" + feature.properties.address + "</h3><hr>" +
    "<p>Price: $" + feature.properties.price + 
    "<p>Size: " + feature.properties.size + " sq. ft." +
    "<p> Features: " + feature.properties.beds + " beds" + ", " + feature.properties.baths + " baths"
  )};


// Plot houses
d3.json(housePrices).then(function (data) {

  var marker = L.geoJson(data.features, {
    
    onEachFeature: housePopup,

    pointToLayer: function(feature, coordinate) {
      console.log(coordinate);
      
      var style = {
        radius: markerSize(feature.properties.size),
        fillColor: getColor(feature.properties.price),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }

      return L.circleMarker(coordinate, style)
      }
    })

  marker.addTo(myMap);
});


// Loop through dallas neighborhoods and add median price ? idk
function calculateMedian(neighborhood) {

};


// Add ons: 
// Grocery store markers (expands when you zoom) 

// Police report layers (color coded?)

// var groceryData = 'static/data/grocerystores.json'
// d3.json(groceryData).then(function(data) {

// })