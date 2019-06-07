// // creates div for graph and div for tooltip
// var div2 = d3v5.select('body').append('div')
//   .attr('id', 'container')
//
// const div3 = d3v5
//   .select('body')
//   .append('div')
//   .attr('class', 'tooltip')
//   .style('opacity', 0);


window.onload = function() {
  makemap();
};

var req = d3v5.json("data.json")

console.log(req)


// draw datamap with fillkeys from json, if existing
function makemap(){

  // create promise for json of gdp-data
  d3v5.json("data.json").then(function(data) {

    var div2 = d3v5.select('body').append('div')
      .attr('id', 'container')

    // Set margins
      var margin = {top: 70, right: 100, bottom: 20, left: 50},
            height = 400 - margin.bottom - margin.top,
            width = 700 - margin.left - margin.right;

      // Append title
      var svg = d3v5.select("div")
        .append("text")
        .attr("x", (width / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
      	.style('fill', 'darkOrange')
        .text("Worldmap: GDP per capita");

    

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

      // create datamap
      var map = new Datamap({element: document.getElementById('container'),
      fills: {
      defaultFill: 'grey'
      },
      data: data,
      geographyConfig: {
        popupTemplate: function(geography, data) {
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'GDP per capita: ' +  data.GDP
     }},
     //  done: function(datamap) {
     //     datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
     //         country = geography.properties.name;
     //
     //         // create promise for suicide data
     //         d3v5.json("data.json").then(function(data) {
     //           objects_interest_order = getObjectsInterest(data, country)
     //           // suicide data available
     //           if (objects_interest_order != 1){
     //             d3v5.select("#graph").remove()
     //             drawbar(objects_interest_order);
     //           }
     //           // no suicide data avaibale
     //           else{
     //             d3v5.select('#graph').remove()
     //             noDataAvailable();
     //           }
     //         });
     //     });
     // }
      });
      // draw legend for datamap
      map.legend({
        legendTitle : "GDP per capita",
        defaultFillName: "No data: ",
        labels: {
          q0: "one",
          q1: "two",
          q2: "three",
          q3: "four",
          q4: "five",
        },
      });
  });
}
