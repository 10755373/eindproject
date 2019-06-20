function geendataland(country){

  var divsize = d3v5.select("#container2").node().getBoundingClientRect();

  var margin = {top: 20, right: 80, bottom: 20, left: 120};
  var width = divsize.width
  var height = divsize.height
  var barPadding = 0.5;

  var svg = d3v5.select("#svg_linegraph_container")
              .append("svg")
              .attr("id","graph")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
      .attr("x", (width / 3))
      .attr("y", (margin.bottom * 10))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Sorry! Unfortunately, there's no data available for " + country);

};


// d3.select("#container2").selectAll("*").remove();
//
// var margin = {top: 120, right: 70, bottom: 70, left: 70};
//
// var divsize = d3v5.select("#container2").node().getBoundingClientRect();
//
// var parseTime = d3v5.timeParse("%Y")
//
// var width = divsize.width - margin.left - margin.right;
// var height = divsize.height - margin.top - margin.bottom;
//
// var x = d3v5.scaleTime().range([0, width]);
// var y = d3v5.scaleLinear().range([height, 0]);
//
// var valueline = d3v5.line()
//     .x(function(d) { return x(d.x); })
//     .y(function(d) { return y(d.y); });
//
// yearsmale = []
// valuesmale = []
// data_male.forEach(function(d) {
//     d.x = parseTime(d.x);
//     yearsmale.push(d.x);
//     valuesmale.push(d.y);
//     d.y = +d.y;
// });
// yearsfemale = []
// valuesfemale = []
// data_female.forEach(function(d) {
//     d.x = parseTime(d.x);
//     yearsfemale.push(d.x);
//     valuesfemale.push(d.y);
//     d.y = +d.y;
// });
//
// var maxmale = d3v5.max(data_male, function(d) {return d.y})
// var maxfemale = d3v5.max(data_female, function(d) {return d.y})
// if (maxmale > maxfemale){
//   x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
//   y.domain([0, d3v5.max(data_male, function(d) { return d.y; })]);
// }
// else{
//   x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
//   y.domain([0, d3v5.max(data_female, function(d) { return d.y; })]);
// }
//
// var svg_linegraph_container = d3v5.select("#container2").append("svg")
//     .attr("class", "svglinegraph")
//     .attr("id", "svglinegraph")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("id", "svg_linegraph_container")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
//     // .attr("transform",
//     //       "translate(" + margin.left + "," + margin.right + "," + margin.top + ")");
//
// var lastvaluemale = [yearsmale.slice(-1)[0], valuesmale.slice(-1)[0]];
// console.log(lastvaluemale)
// // svg_linegraph_container
// //   .append("text")
// //   .attr("id", "line-name")
// //   .data(lineData[key])
// //   .attr("transform", function(d, i) {
// //     return "translate (" + x(lastvaluemale[0]) + "," +
// //            y(lastvaluemale[1]) + ")"; })
// //   .text("Males");
//
//
// svg_linegraph_container.append("path")
//     .data([data_male])
//     .attr("class", "line")
//     .attr("id", "line_male")
//     .attr("d", valueline)
//     .attr("data-legend",function(d) { return d.x})
//     .attr("stroke", "steelblue")
//     .attr("stroke-width", "2px")
//     .attr("fill", "none")
//     .append("text")
//     .attr("id", "line-name-male")
//     .attr("transform", function(d, i) {
//       return "translate (" + x(lastvaluemale[0]) + "," +
//              y(lastvaluemale[1]) + ")"; })
//     .text("Males");
//
// var lastvaluefemale = [yearsfemale.slice(-1)[0], valuesfemale.slice(-1)[0]];
// console.log(lastvaluefemale)
//
// // svg_linegraph_container.append("text")
// //   .attr("id", "line-name")
// //   .data(lineData[key])
// //   .attr("transform", function(d, i) {
// //     return "translate (" + x(lastvaluefemale[0]) + "," +
// //            y(lastvaluefemale[1]) + ")"; })
// //   .text("Females");
//
// svg_linegraph_container.append("path")
//     .data([data_female])
//     .attr("class", "line")
//     .attr("id", "line_female")
//     .attr("d", valueline)
//     .attr("data-legend",function(d) { return d.x})
//     .attr("stroke", "pink")
//     .attr("stroke-width", "2px")
//     .attr("fill", "none")
//     .append("text")
//       .attr("id", "line-name")
//       .attr("transform", function(d, i) {
//         return "translate (" + x(lastvaluefemale[0]) + "," +
//                y(lastvaluefemale[1]) + ")"; })
//       .text("Females");
//
// svg_linegraph_container.append("g")
//     .attr("id", "xaxis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3v5.axisBottom(x));
// svg_linegraph_container.append("text")
//     .attr("transform",
//     "translate(" + (width) + " ," +
//                    (height + 50) + ")")
//     .style("text-anchor", "end")
//     .text("Year");
// svg_linegraph_container.append("g")
//     .attr("id", "yaxisleft")
//     .call(d3v5.axisLeft(y));
// svg_linegraph_container.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("dy", "1.5em")
//     .style("text-anchor", "end")
//     .text("No of suicides");
//
// //     // update title
// // document.getElementById("titleRadar").innerHTML = "Emissions (%) per sector in <br>" + currentCountry + ", " + currentYear;
//
// var titlelinegraph = svg_linegraph_container.append("g")
// .attr("id", "titlelinegraph");
// titlelinegraph
// .append("text")
// .attr("x", (width / 2))
// .attr("y", top)
// .attr("class", "title")
// .attr("text-anchor", "middle")
// .style("font-size", "14px")
// .text("Data for ");
