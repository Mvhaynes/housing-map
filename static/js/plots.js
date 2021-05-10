var barChart = d3.select("#bar");
var areaSelect = d3.select(".menu");
var areaList = [];

function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; }
    )};

function init() {
    var house_data = "static/data/joined.csv";
    
    d3.csv(house_data).then((data) => {

        // Select neighborhood name from dataset 
        var sampleName = unpack(data, 'name');

        // Add neighborhood names to filter list 
        sampleName.forEach(area => {
            if (!areaList.includes(area)) {
                   areaList.push(area);
                   areaSelect
                        .append("option")
                        .attr("class","item")
                        .text(area)
                        .property("value", area);
            };
        });

        // Set first result as default chart
        var firstSample = sampleName[0];
        buildPlot(firstSample);
    });
};

function buildPlot(area) {
    var house_data = "static/data/joined.csv";

    d3.csv(house_data).then(data => {
        console.log(area);
        data = data.filter(d => d['name'] === area);
        console.log(data);
        var price = unpack(data, 'price');
        var address = unpack(data, 'address');

        console.log(address);
        console.log(price);

        var barTrace = {
            type: "bar",
            x: price.slice(0, 10).reverse(),
            y: address.slice(0, 10).reverse(),
            orientation: "h",
            marker: {
                color: price,
                opacity: 0.6}
        };

        var barData = [barTrace];

        var barLayout = {
            xaxis: {title: "Price"},
            padding: {
                left: 50,
                bottom: 100
            },
                margin: {
                  l: 200,
                  r: 100,
                  t: 50,
                  b: 30
                }
              };


        d3.select("#bar").html("");

        Plotly.newPlot("bar", barData, barLayout);
    });
}

$(document).ready(function () {
  $('.ui.floating.dropdown.labeled.icon.button').dropdown({
    on: 'hover',
    onChange: function(value, text, $selectedItem) {
        optionChanged(text);
    }
  });
})
;

function optionChanged(newSample) {
    console.log(newSample)
    buildPlot(newSample);
};

init();