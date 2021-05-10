var barChart = d3.select("#bar");
var areaSelect = d3.select("#selDataset");
var areaList = [];

function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; }
    )};

function init() {
    var house_data = "static/data/joined.csv";
    
    d3.csv(house_data).then((data) => {

        console.log(data);
        var sampleName = unpack(data, 'name');


        sampleName.forEach(area => {
            if (!areaList.includes(area)) {
                   areaList.push(area);
                   areaSelect
                        .append("option")
                        .text(area)
                        .property("value", area);
            };
        });

        console.log(sampleName);
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
            orientation: "h"
        };

        var barData = [barTrace];

        var barLayout = {
            xaxis: {title: "Price ($)"},
            padding: {
                left: 50,
                bottom: 100
            }
        };

        d3.select("#bar").html("");

        Plotly.newPlot("bar", barData, barLayout);
    });
}

function optionChanged(newSample) {
    console.log(newSample);
    buildPlot(newSample);
};

init();