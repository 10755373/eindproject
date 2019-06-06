var requests = [d3v5.json("bodemgebruikNL.json")];

window.onload = function() {
  Promise.all(requests).then(function(response) {
    // var req = response
    // let draw = world(req)
    console.log(requests)
    })
  };

  // function world(data) {
  //
  //   // Use function to clean data
  //   var data_cleaned = transformresponse(data)
  //
  //   // Set margins
  //   var margin = {top: 70, right: 100, bottom: 20, left: 50},
  //         height = 900 - margin.bottom - margin.top,
  //         width = 1300 - margin.left - margin.right;
  //
  //   // Append title
  //   var svg = d3v5.select("div")
  //     .append("text")
  //     .attr("x", (width / 2))
  //     .attr("y", 20)
  //     .attr("text-anchor", "middle")
  //     .style("font-size", "18px")
  //   	.style('fill', 'darkOrange')
  //     .text("Worldmap: GDP per capita");
  //
  // // Get values from 2016
  // var values_2016 = []
  // for (let i = 0; i < data_cleaned.length; i++){
  //   if (data_cleaned[i][1] == "2016") {
  //     values_2016.push(data_cleaned[i][2]);
  //   }
  // };
  //
  // // Make dictionary with country as key and gdp (2016) as value
  // var saved_dict = {}
  // for (let i = 0; i < data_cleaned.length; i++){
  //   if (data_cleaned[i][1] == "2016") {
  //     saved_dict[data_cleaned[i][0]] = data_cleaned[i][2]
  //   }
  // };
  //
  // // Determine colorscale for every country
  // var dict_2016 = {}
  // for (let i = 0; i < data_cleaned.length; i++){
  //   if (data_cleaned[i][1] == "2016") {
  //     dict_2016[data_cleaned[i][0]] = data_cleaned[i][2]
  //   }
  // };
  //
  // // Determine colorscale
  // var colorScale = d3v5.scaleOrdinal()
  //             .domain([Math.min(... values_2016), Math.max(... values_2016)])
  //             .range(['Laag','Medium','Hoog','Uitzonderlijk']);
  //
  // // Adjust previously made dict
  // for (var key in dict_2016) {
  //   let country_color = {}
  //   country_color["Value"] = parseInt(dict_2016[key])
  //   country_color["fillKey"] = colorScale(dict_2016[key])
  //   dict_2016[key] = country_color;
  // }

  // Make worldmap visible
  var map = new Datamap({
      element: document.getElementById('container'),
      responsive: true,
      fills: {
          defaultFill: '#f0a0fa',
          Ontbrekend: '#f0a0fa',
          Laag: '#ccffcc',
          Semi: '#96c985',
          Hoog: '#61943d',
          Uitzonderlijk: '#336600'
      },
      // data: dict_2016,
      scope: 'nld',
      responsive: true,
      // geographyConfig: {
      //     popupTemplate: function(geo, data) {
      //         return ['<div class="hoverinfo"><strong>',
      //                 'Total GDP in ' + geo.properties.name,
      //                 ': ' + data.Value,
      //                 '</strong></div>'].join('');
      //     }
      // },
      // done: function(datamap) {
      //   datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
      //     setlinegraph(geography.properties.iso);
      //   })}

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
        element: document.getElementById('container'),
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

    // // Function to retrieve the right data
    // function transformresponse(province, data) {
    //     var data_list = []
    //     for (let i = 0; i < data.length; i++){
    //       if (data[i].province == province){
    //         return data[i].
    //       }
    //         data_list.push(data[0].data[i])
    //       }
    //     return data_list;
    //   };

//     var names_provinces = [{'PV20': 'Groningen'}, {'PV21': 'Friesland'}, {'PV22': 'Drenthe'}, {'PV23': 'Overijssel'}, {'PV24': 'Flevoland'}, {'PV25': 'Gelderland'}, {'PV26': 'Utrecht'}, {'PV27': 'Noord-Holland'}, {'PV28': 'Zuid-Holland'}, {'PV29': 'Zeeland'}, {'PV30': 'Noord-Brabant'}, {'PV31': 'Limburg'}]
//     var values_provinces =
//
//       // Get the population size of a certain province
// function getPopulation(province, data){
//     var provinces = []
//     for (var i = 0; i < data.length; i++){
//         var values = {}
//         if (data[i].Perioden == '1996JJ00'){
//
//             return data[i].population.total;
//         }
//     }
// }
