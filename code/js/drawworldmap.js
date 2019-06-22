function drawworldmap(json, year, sex, age){

  if( $('#containermap').is(':empty')){
    newworldmap(json, year, sex, age)
  }
  else{
    updateworldmap(json, year, sex, age)
  }};


// draw worldmap
function newworldmap(json, year, sex, age){

  var container1 = d3v5.select("#containermap").node().getBoundingClientRect();
  var width = container1.width
  var height = container1.height
  var dataset = retrievedata_map(json, year, sex, age)
  var year = year
  // console.log(year)
  // data = Object.values(json)
  // // console.log(data[0])
  // series = []
  // for (let i = 0; i < data.length; i++){
  //   if (data[i].year == year && data[i].sex == "male" && data[i].age == "15-24 years"){
  //     list = []
  //     // console.log(data[i].suicides_no)
  //     list.push(data[i].alpha_code, data[i].gdp_per_capita)
  //     // list_values[data[i].alpha_code] = data[i].suicides_no
  //     series.push(list)
  //   }
  // }
  // console.log(series)
  //
  // // Datamaps expect data in format:
  // // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
  // //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
  // var dataset = {};
  // // We need to colorize every country based on "numberOfWhatever"
  // // colors should be uniq for every value.
  // // For this purpose we create palette(using min/max series-value)
  // var onlyValues = series.map(function(obj){ return obj[1]; });
  // var minValue = Math.min(... onlyValues),
  //         maxValue = Math.max(... onlyValues);
  // // create color palette function
  // // color can be whatever you wish
  // var paletteScale = d3.scale.linear()
  //         .domain([minValue,maxValue])
  //         .range(["#99ccff","#000099"]); // blue color
  // // fill dataset in appropriate format
  // series.forEach(function(item){ //
  //     // item example value ["USA", 70]
  //     var iso = item[0],
  //             value = item[1];
  //     dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
  // });
  // // render map
  console.log(dataset)
  var sdf = Object.values(dataset)
  console.log(sdf)
  var map = new Datamap({
      element: document.getElementById('containermap'),
      projection: 'mercator', // big world map
      // countries don't listed in dataset will be painted with this color
      fills: { defaultFill: '#ffff99' },
      data: dataset,
      geographyConfig: {
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        // when hovering over countries, don't change country's color
        highlightFillColor: function(geography) {
            return geography['fillColor'] || '#F5F5F5';
        },
        // change borderline only
        highlightBorderColor: '#2ECC71',
        popupTemplate: function(geography, data) {
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Suicides no: ' +  data.numberOfThings
      }},
      done: function(datamap) {
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
             country = geography.properties.name;
             selectedsecondoption(json, country, year)
             console.log(country)
             console.log(year)
             d3.select("#interested").on("change",function(d){selectedsecondoption(json, country, year)})
             d3.select("#secondgroup").on("change",function(d){selectedsecondoption(json, country, year)})
             // var data_male_total = obtaincountrydatamaletotal(data, country)
             // var data_female_total = obtaincountrydatafemaletotal(data, country)
             // var gdp_per_capita = gdppercapita(data, country)
             // var data_pie = datapie(data, country)
             // var data_donut = datadonut(data, country)
             //  if (data_female_total.length > 0){
             //    drawlinegraph(data_male_total, data_female_total, gdp_per_capita);
             //    // makepiechart(data_pie);
             //    // makedonutchart(data_donut);
             //    initializepiechart(data_pie, data_donut);
             //    // initializedonutchart(data_donut);
             //  }
             //   else{
             //     geendataland(country);
             //   }
              })
              }

  });
  // draw legend for datamap
   map.legend({
     legendTitle : "No of suicides",
     defaultFillName: "No data: ",

   });
   // add title
  map.svg.append('text')
         .attr("x", (width / 2))
         .attr("y", 50)
         .attr("text-anchor", "middle")
         .style("font-size", "20px")
         .style("fill", "black")
         // .style("font-family", "Palatino")
         .text("No of suicides per country in year: " + year);
   // makelegend(dataset)
   drawlegend(dataset)

 };

// // source: github https://github.com/SammyH1994/project/blob/master/src/code/js/map.js
//   // Create legend
// var w = 100, h = 250;
// // var key = d3v5.select("container1").append("svg").attr("width", w).attr("height", h);
// var key = d3v5.select("container1").append("g")
//     .attr("id", "legend")
//     .attr("width", w)
//     .attr("height", h);
//
// var legend = key.append("defs")
//     .append("svg:linearGradient")
//     .attr("id", "gradient")
//     .attr("x1", "100%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "100%")
//     .attr("spreadMethod", "pad");
//
// legend
//     .append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", "#008545")
//     .attr("stop-opacity", 1);
//
// legend
//     .append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", "#b5f2d2")
//     .attr("stop-opacity", 1);
//
// key
//     .append("rect")
//     .attr("width", 20)
//     .attr("height", h)
//     .style("fill", "url(#gradient)")
//     .style("stroke", "grey")
//     .attr("transform", "translate(0,10)");
//
// // Create legend axis
// var y = d3v5.scaleLinear()
//     .range([250, 0])
//     .domain([375000, 3500000])
//     .nice();
//
// var yAxis = d3v5.axisRight()
//     .scale(y)
//     .ticks(10)
//     .tickFormat(d3v5.format(".3s"));
//
//  key
//     .append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(22,10)")
//     .call(yAxis)
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 30)
//     .attr("dy", ".71em")
//     .style("text-anchor", "end")
//     .text("axis title");
//
// ----------------------------

                                        // var w = 140, h = 400;
                                        //
                                      	// var key = d3v5.select("container1").append("svg").attr("width", w).attr("height", h);
                                        //
                                      	// var legend = key.append("defs")
                                        //         .append("svg:linearGradient")
                                        //         .attr("id", "gradient")
                                        //         .attr("x1", "100%")
                                        //         .attr("y1", "0%")
                                        //         .attr("x2", "100%")
                                        //         .attr("y2", "100%")
                                        //         .attr("spreadMethod", "pad");
                                        //
                                      	// legend.append("stop")
                                        //       .attr("offset", "0%")
                                        //       .attr("stop-color", "#B30000")
                                        //       .attr("stop-opacity", 1);
                                        //
                                      	// legend.append("stop")
                                        //       .attr("offset", "100%")
                                        //       .attr("stop-color", "#FEE8c8")
                                        //       .attr("stop-opacity", 1);
                                        //
                                      	// key.append("rect")
                                        //     .attr("width", w - 100)
                                        //     .attr("height", h - 100)
                                        //     .style("fill", "url(#gradient)")
                                        //     .attr("transform", "translate(0,10)");
                                        //
                                      	// var y = d3v5.scaleLinear()
                                        //     .range([300, 0])
                                        //     .domain([1, 100]);
                                        //
                                        // var yAxis = d3v5.axisRight()
                                        //         .scale(y);
                                        //
                                      	// key.append("g")
                                        //   .attr("class", "y axis")
                                        //   .attr("transform", "translate(41,10)")
                                        //   .call(yAxis).append("text")
                                        //   .attr("transform", "rotate(-90)")
                                        //   .attr("y", 30).attr("dy", ".71em")
                                        //   .style("text-anchor", "end")
                                        //   .text("axis title");


// --------------------------------------
//   // source: https://bl.ocks.org/duspviz-mit/9b6dce37101c30ab80d0bf378fe5e583
//
// var width = 300, height = 50;
//
// var key = d3v5.select("#containermap")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height);
//
// var legend = key.append("defs")
//   .append("svg:linearGradient")
//   .attr("id", "gradient")
//   .attr("x1", "0%")
//   .attr("y1", "100%")
//   .attr("x2", "100%")
//   .attr("y2", "100%")
//   .attr("spreadMethod", "pad");
//
// legend.append("stop")
//   .attr("class", "start")
//   .attr("offset", "0%")
//   .attr("stop-color", "#99ccff")
//   .attr("stop-opacity", 1);
//
// legend.append("stop")
//   .attr("offset", "100%")
//   .attr("stop-color", "#000099")
//   .attr("stop-opacity", 1);
//
// key.append("rect")
//   .attr("width", width)
//   .attr("height", height - 30)
//   .style("fill", "url(#gradient)")
//   .attr("transform", "translate(0,10)");
//
// var y = d3v5.scaleLinear()
//   .range([300, 0])
//   .domain([68, 12]);
//
// var yAxis = d3v5.axisBottom()
//   .scale(y)
//   .ticks(5);
//
// key.append("g")
//   .attr("class", "y axis")
//   .attr("transform", "translate(0,30)")
//   .call(yAxis)
//   .append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("y", 0)
//   .attr("dy", ".71em")
//   .style("text-anchor", "end")
//   .text("axis title");
//
// function makelegend(dataset){
// ///////////////////////////////////////////////////////////////////////////
// //////////////// Create the gradient for the legend ///////////////////////
// ///////////////////////////////////////////////////////////////////////////
//
// var divsize = d3v5.select("#containermap").node().getBoundingClientRect();
// var margin = {top: 20, right: 30, bottom: 40, left: 25};
// var width = divsize.width - margin.left - margin.right;
// var height = divsize.height - margin.top - margin.bottom;
//
// var svg = d3v5.select('#containermap')
// 	.append("svg")
// 	.attr("width", width + margin.left + margin.right)
// 	.attr("height", height + margin.top + margin.bottom)
// 	.append("g")
// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   // // sort by value
//   // dataset.sort(function (a, b) {
//   //   return a.numberOfThings - b.numberOfThings;
//   // });
//   //
//   // var sorted = dataset.sort(function (a, b) {
//   //   return a.numberOfThings - b.numberOfThings;
//   // });
//
// var colorScale = d3v5.scaleLinear()
// 	.domain([0, d3v5.max(dataset, function(d) {return d.numberOfThings; })])
// 	.range(["#99ccff", "#000099"])
//
// console.log(colorScale)
//
// //Extra scale since the color scale is interpolated
// var countScale = d3v5.scaleLinear(dataset)
// 	.domain([0, d3v5.max(dataset, function(d) {return d.numberOfThings; })])
// 	.range([0, width])
// console.log(countScale)
//
// //Calculate the variables for the temp gradient
// var numStops = 10;
// countRange = countScale.domain();
// countRange[2] = countRange[1] - countRange[0];
// countPoint = [];
// for(var i = 0; i < numStops; i++) {
// 	countPoint.push(i * countRange[2]/(numStops-1) + countRange[0]);
// }//for i
//
// //Create the gradient
// svg.append("defs")
// 	.append("linearGradient")
// 	.attr("id", "legend-traffic")
// 	.attr("x1", "0%").attr("y1", "0%")
// 	.attr("x2", "100%").attr("y2", "0%")
// 	.selectAll("stop")
// 	.data(d3v5.range(numStops))
// 	.enter().append("stop")
// 	.attr("offset", function(d,i) {
// 		return countScale( countPoint[i] )/width;
// 	})
// 	.attr("stop-color", function(d,i) {
// 		return colorScale( countPoint[i] );
// 	});
//
// ///////////////////////////////////////////////////////////////////////////
// ////////////////////////// Draw the legend ////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////
//
//   var legendWidth = Math.min(width*0.8, 400);
//   //Color Legend container
//   var legendsvg = svg.append("g")
//   	.attr("class", "legendWrapper")
//   	.attr("transform", "translate(" + (width/2) + ")");
//
//   //Draw the Rectangle
//   legendsvg.append("rect")
//   	.attr("class", "legendRect")
//   	.attr("x", -legendWidth/2)
//   	.attr("y", 0)
//   	.attr("width", legendWidth)
//   	.attr("height", 10)
//   	.style("fill", "url(#legend-traffic)");
//
//   //Append title
//   legendsvg.append("text")
//   	.attr("class", "legendTitle")
//   	.attr("x", 0)
//   	.attr("y", -10)
//   	.style("text-anchor", "middle")
//   	.text("Number of Accidents");
//
//   //Set scale for x-axis
//   var xScale = d3v5.scaleLinear()
//   	 .range([-legendWidth/2, legendWidth/2])
//   	 .domain([ 0, d3v5.max(dataset, function(d) { return d.numberOfThings; })] );
//
//   //Define x-axis
//   var xAxis = d3v5.axisBottom()
//   	  .ticks(5)
//   	  .scale(xScale);
//
//   //Set up X axis
//   legendsvg.append("g")
//   	.attr("class", "axis")
//   	.attr("transform", "translate(0," + (10) + ")")
//   	.call(xAxis);
// };
// };


// draw worldmap
function updateworldmap(json, year, sex, age){

  // var container1 = d3v5.select("#container1").node().getBoundingClientRect();

  d3.select("#containermap").selectAll("*").remove();
  var container1 = d3v5.select("#containermap").node().getBoundingClientRect();
  var width = container1.width
  var height = container1.height
  var dataset = retrievedata_map(json, year, sex, age)
  var year = year
  console.log(dataset)
  // var map = new Datamap({dataset})
  var map = new Datamap({
      element: document.getElementById('containermap'),
      projection: 'mercator', // big world map
      // countries don't listed in dataset will be painted with this color
      fills: { defaultFill: '#ffff99' },
      data: dataset,
      geographyConfig: {
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        // when hovering over countries, don't change country's color
        highlightFillColor: function(geography) {
            return geography['fillColor'] || '#F5F5F5';
        },
        // change borderline only
        highlightBorderColor: '#2ECC71',
        popupTemplate: function(geography, data) {
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Suicides no: ' +  data.numberOfThings
      }},
       done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              country = geography.properties.name;
              console.log(country)
              console.log(year)
              selectedsecondoption(json, country, year)
              d3.select("#interested").on("change",function(d){selectedsecondoption(json, country, year)})
              d3.select("#secondgroup").on("change",function(d){selectedsecondoption(json, country, year)})
          //     // clickedoncountry(json, country)
          //     var data_male_total = obtaincountrydatamaletotal(data, country)
          //     var data_female_total = obtaincountrydatafemaletotal(data, country)
          //     // var data_male_100k = obtaincountrydatamale100k(json, country)
          //     // var data_female_100k = obtaincountrydatafemale100k(json, country)
          //     var gdp_per_capita = gdppercapita(data, country)
          //     // console.log(gdp_per_capita)
          //     var data_pie = datapie(data, country)
          //     var data_donut = datadonut(data, country)
          //     var optionmale = datamaleoption(data, country)
          //     var optionfemale = datafemaleoption(data, country)
          //      if (data_female_total.length > 0){
          //        drawlinegraph(data_male_total, data_female_total, gdp_per_capita, optionmale, optionfemale);
          //        // makepiechart(data_pie);
          //        // console.log(data_donut);
          //        // console.log(data_pie)
          //        // makedonutchart(data_donut);
          //        initializepiechart(data_pie, data_donut);
          //        // initializedonutchart(data_donut);
          //        //
          //        // makelinegraph(data_country_female, data_country_male)
          //        // donutchart(datadonut(json, country))
          //        // piechart(datapie(json, country))
          //      }
          //       else{
          //         geendataland(country);
          //       }
          // });
      })}
})
// draw legend for datamap
 map.legend({
   legendTitle : "No of suicides",
   defaultFillName: "No data: ",

 });
 // add title
map.svg.append('text')
       .attr("x", (width / 2))
       .attr("y", 50)
       .attr("text-anchor", "middle")
       .style("font-size", "20px")
       .style("fill", "black")
       // .style("font-family", "Palatino")
       .text("No of suicides per country in year: " + year);
   // makelegend(dataset)
   drawlegend(dataset)
};
