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
d3.json(outlines).then(function (data) {

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
var colorList = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58']
function getColor(price) { // Change numbers later 
  return price > 4000000 ? colorList[8] :
    price > 1500000 ? colorList[7] :
      price > 850000 ? colorList[6] :
        price > 650000 ? colorList[5] :
          price > 550000 ? colorList[4] :
            price > 350000 ? colorList[3] :
              price > 250000 ? colorList[2] :
                price > 150000 ? colorList[1] :
                  colorList[0]
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
  return size / 200;
}

// House information pop ups
function housePopup(feature, coordinate) {
  coordinate.bindPopup(
    "<h3>" + feature.properties.address + "</h3><hr>" +
    "<p>Price: $" + feature.properties.price +
    "<p>Size: " + feature.properties.size + " sq. ft." +
    "<p>Features: " + feature.properties.beds + " beds" + ", " + feature.properties.baths + " baths" +
    "<p>Type: " + feature.properties.type
  )
};


// Plot houses
d3.json(housePrices).then(function (data) {

  var marker = L.geoJson(data.features, {

    onEachFeature: housePopup,

    pointToLayer: function (feature, coordinate) {
      console.log(coordinate);

      var style = {
        radius: 10,
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

d3.json(crimeUrl).then(function (response) {

  console.log(response);

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    }
  }

});


// var groceryData = 'static/data/grocerystores.json'
// d3.json(groceryData).then(function(data) {

// })