// Neighborhood outlines 
var outlines = 'static/data/dallas_coordinates.json';

// House data 
var housePrices = 'static/data/houses.geojson';

// Crime reports 
var crimeReports = 'static/data/police_reports.json';

// Grocery store data
var groceryStores = 'static/data/grocerystores.json';
// Variables to create layers
var heatArray = [];
var houseLayer = L.layerGroup();
var crimeLayer = L.layerGroup(crimeHeat);

// Color function based on house price 
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

var colorList = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58']
function colorMap(avg) {  
  return avg > 4000000 ? colorList[8] :
    avg > 1500000 ? colorList[7] :
      avg > 850000 ? colorList[6] :
        avg > 650000 ? colorList[5] :
          avg > 550000 ? colorList[4] :
            avg > 350000 ? colorList[3] :
              avg > 250000 ? colorList[2] :
                avg > 150000 ? colorList[1] :
                  colorList[0],
  console.log( avg > 4000000 ? colorList[8] : // to check function 
    avg > 1500000 ? colorList[7] :
      avg > 850000 ? colorList[6] :
        avg > 650000 ? colorList[5] :
          avg > 550000 ? colorList[4] :
            avg > 350000 ? colorList[3] :
              avg > 250000 ? colorList[2] :
                avg > 150000 ? colorList[1] :
                  colorList[0]
  )};

  
// Info box function  
function popups(feature, layer) {
  layer.bindPopup(
    "<h3>" + feature.properties.name + "</h3><hr>" +
    "<p>Average House Price: $" + feature.properties.avg
  )
};

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

function style(feature) {
  return {
    fillColor: colorMap(feature.properties.avg),
    weight: 2,
    opacity: 1,
    color: 'grey',
    dashArray: '3',
    fillOpacity: 0.4
  }
}

// Neighborhood outline  
d3.json(outlines).then(function (data) {
  var features = data.features;
  function style(feature) {
    var fill = {
      fillColor: returnColor(feature.properties.name),
      weight: 2,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7
    }
  }

  // create neighborhood outlines
  L.geoJson(data.features, {
    onEachFeature: function (feature, coordinates) {
      var style = {
      "color": "black",
      "fillColor": "white",
      "opacity": 1
      }
    },
  }).addTo(myMap);
});

// Plot houses
d3.json(housePrices).then(function (data) {
  markers = L.geoJson(data.features, {
    onEachFeature: housePopup,
    pointToLayer: function (feature, coordinate) {
      var style = {
        radius: 10,
        fillColor: getColor(feature.properties.price),
        color: 'black',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }
      return (L.circleMarker(coordinate, style));
    }
  })
  markers.addTo(houseLayer);
});

// function calculateAvg(place) {
//   d3.json('static/data/joined.json').then(function(data) {
//     var neighborhoodList = [];
//     var neighborhoodAvg = [];
//     // Loop through dallas neighborhoods and calculate average house price 
//     data.features.forEach(feature => {
//       var neighborhood = feature.properties.name;
//       if (neighborhood in neighborhoodList) {
//         neighborhoodList[neighborhood] += 1;
//         neighborhoodList[neighborhood + ' price'] = neighborhoodList[neighborhood + ' price'] + (feature.properties.price);
//         neighborhoodAvg[neighborhood] = neighborhoodList[neighborhood + ' price'] / neighborhoodList[neighborhood];
//       }
//       else {
//         neighborhoodList[neighborhood] = 1;
//         neighborhoodList[neighborhood + ' price'] = (feature.properties.price);
//         neighborhoodAvg[neighborhood] = neighborhoodList[neighborhood + ' price']
//       };
//     })
//     // Fill in empty data (Do an auto loop later)
//     neighborhoodAvg['Design District'] = 0;
//     neighborhoodAvg['University Park'] = 0;
//     neighborhoodAvg['Knox'] = 0;
//     neighborhoodAvg['South Dallas'] = 0;
//     var avg = neighborhoodAvg[place];
//     console.log(avg)
//     colorMap(avg)
//   })
// };

// Police report heat map 
d3.json(crimeReports).then(function(response) {
  // Loop through data and add coordinates to array 
  for (var i = 0; i < response.length; i++) {
    var location = response[i].geocoded_column;
    if (location.latitude) {
      heatArray.push([location.latitude, location.longitude])
      }
    }
})

// Background maps
var base = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: api_key
});

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-streets-v11",
  accessToken: api_key
});

var crimeHeat = L.heatLayer(heatArray, {
  radius: 80,
  blur: 40
});
// Map layer options
var baseMaps = {
  "Grayscale": base,
  "Satellite": satellite
};
var overlayMaps = {
  "Houses": houseLayer,
  "Crime Level": crimeLayer
};

// Default map view
var myMap = L.map("map", {
  center: [32.82, -96.7970],        
  zoom: 11,
  layers: [base, houseLayer]
});
crimeHeat.addTo(crimeLayer);

// Map layer control
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Adding crime markers
// var crimeUrl = "https://www.dallasopendata.com/resource/qv6i-rri7.json$limit=1000";
// d3.json(crimeUrl).then(function (response) {
//   console.log(response);
//   for (var i = 0; i < response.length; i++) {
//     var location = response[i].location;
//     if (location) {
//       L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
//     }
//   }
// });