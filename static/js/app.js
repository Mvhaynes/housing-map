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

// House data 
var housePrices = 'static/data/houses.csv'

// Info box function  
function popups(feature, layer) {
  layer.bindPopup(
    "<h3>" + feature.properties.name + "</h3><hr>" +
    "<p>Median Income: " +
    "<p>Median House Price: "
  )
};

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

// Get house coordinates 
d3.csv(housePrices).then(function(data) {
  data.forEach(d => {
    if (d.lat && d.lng == "")
      {console.log(`empty string`)}
    else {
      var coordinates = [d.lat, d.lng]
    };
    console.log(coordinates);    
  });;
});

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

// Add ons: 
// Grocery store markers (expands when you zoom) 

// Police report layers (color coded?)

// var groceryData = 'static/data/grocerystores.json'
// d3.json(groceryData).then(function(data) {

// })