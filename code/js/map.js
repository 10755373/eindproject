// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data = [
    ['nl-fr', 0],
    ['nl-gr', 1],
    ['nl-fl', 2],
    ['nl-ze', 3],
    ['nl-nh', 4],
    ['nl-zh', 5],
    ['nl-dr', 6],
    ['nl-ge', 7],
    ['nl-li', 8],
    ['nl-ov', 9],
    ['nl-nb', 10],
    ['nl-ut', 11]
];

// Create the chart
Highcharts.mapChart('container', {
    chart: {
        map: 'countries/nl/nl-all'
    },

    title: {
        text: 'Highmaps basic demo'
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/nl/nl-all.js">The Netherlands</a>'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: data,
        name: 'Random data',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});

// Set margins
  var margin = {top: 70, right: 100, bottom: 20, left: 50},
        height = 900 - margin.bottom - margin.top,
        width = 1300 - margin.left - margin.right;

  // Append title
  var svg = d3v5.select("div")
    .append("text")
    .attr("x", (width / 2))
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
  	.style('fill', 'darkOrange')
    .text("Map of The Netherlands");

  // Get values from 2016
  var values_2016 = []
  for (let i = 0; i < data_cleaned.length; i++){
    if (data_cleaned[i][1] == "2016") {
      values_2016.push(data_cleaned[i][2]);
    }
  };

  // Make dictionary with country as key and gdp (2016) as value
  var saved_dict = {}
  for (let i = 0; i < data_cleaned.length; i++){
    if (data_cleaned[i][1] == "2016") {
      saved_dict[data_cleaned[i][0]] = data_cleaned[i][2]
    }
  };

  // Determine colorscale for every country
  var dict_2016 = {}
  for (let i = 0; i < data_cleaned.length; i++){
    if (data_cleaned[i][1] == "2016") {
      dict_2016[data_cleaned[i][0]] = data_cleaned[i][2]
    }
  };

  // Determine colorscale
  var colorScale = d3v5.scaleOrdinal()
              .domain([Math.min(... values_2016), Math.max(... values_2016)])
              .range(['Laag','Medium','Hoog','Uitzonderlijk']);

  // Adjust previously made dict
  for (var key in dict_2016) {
    let country_color = {}
    country_color["Value"] = parseInt(dict_2016[key])
    country_color["fillKey"] = colorScale(dict_2016[key])
    dict_2016[key] = country_color;
  }

var map = new Datamap({
        element: document.getElementById('map_netherlands'),
        scope: "collection",
        geographyConfig: {
            dataJson: data
        },
       setProjection: function(element) {
       var projection = d3.geo.mercator()
         .scale(3000)
         .center([0, 52])
         .rotate([-4.8, 0])
         .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
      var path = d3.geo.path()
         .projection(projection);

      return {path: path, projection: projection};
     },
    });

    // Function to retrieve the right data
    function transformresponse(province, data) {
        var data_list = []
        for (let i = 0; i < data.length; i++){
          if (data[i].province == province){
            return data[i].
          }
            data_list.push(data[0].data[i])
          }
        return data_list;
      };

    var names_provinces = [{'PV20': 'Groningen'}, {'PV21': 'Friesland'}, {'PV22': 'Drenthe'}, {'PV23': 'Overijssel'}, {'PV24': 'Flevoland'}, {'PV25': 'Gelderland'}, {'PV26': 'Utrecht'}, {'PV27': 'Noord-Holland'}, {'PV28': 'Zuid-Holland'}, {'PV29': 'Zeeland'}, {'PV30': 'Noord-Brabant'}, {'PV31': 'Limburg'}]
    var values_provinces =

      // Get the population size of a certain province
function getPopulation(province, data){
    var provinces = []
    for (var i = 0; i < data.length; i++){
        var values = {}
        if (data[i].Perioden == '1996JJ00'){
          
            return data[i].population.total;
        }
    }
}
