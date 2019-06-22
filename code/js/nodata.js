// function geendataland(country){
//
//   var divsize = d3v5.select("#container2").node().getBoundingClientRect();
//
//   var margin = {top: 20, right: 80, bottom: 20, left: 120};
//   var width = divsize.width
//   var height = divsize.height
//   var barPadding = 0.5;
//
//   var svg = d3v5.select("#svg_linegraph_container")
//               .append("svg")
//               .attr("id","graph")
//               .attr("width", width + margin.left + margin.right)
//               .attr("height", height + margin.top + margin.bottom)
//               .append("g")
//               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   svg.append("text")
//       .attr("x", (width / 3))
//       .attr("y", (margin.bottom * 10))
//       .attr("text-anchor", "middle")
//       .style("font-size", "16px")
//       .text("Sorry! Unfortunately, there's no data available for " + country);
//
// };
//
// function makeverticallegend(){
//       var w = 140, h = 400;
//
// 			var key = d3v5.select("#container9").append("svg").attr("width", w).attr("height", h);
//
// 			var legend = key.append("defs")
//               .append("svg:linearGradient")
//               .attr("id", "gradient")
//               .attr("x1", "100%")
//               .attr("y1", "0%")
//               .attr("x2", "100%")
//               .attr("y2", "100%")
//               .attr("spreadMethod", "pad");
//
// 			legend.append("stop")
//             .attr("offset", "0%")
//             .attr("stop-color", "#B30000")
//             .attr("stop-opacity", 1);
//
// 			legend.append("stop")
//             .attr("offset", "100%")
//             .attr("stop-color", "#FEE8c8")
//             .attr("stop-opacity", 1);
//
// 			key.append("rect")
//           .attr("width", w - 100)
//           .attr("height", h - 100)
//           .style("fill", "url(#gradient)")
//           .attr("transform", "translate(0,10)");
//
// 			var y = d3v5.scaleLinear().range([300, 0]).domain([1, 100]);
//
// 			var yAxis = d3v5.axisRight().scale(y);
//
// 			key.append("g")
//           .attr("class", "y axis")
//           .attr("transform", "translate(41,10)")
//           .call(yAxis).append("text")
//           .attr("transform", "rotate(-90)")
//           .attr("y", 30)
//           .attr("dy", ".71em")
//           .style("text-anchor", "end")
//           .text("axis title");
// };
//
//
// function makelegend (){
// data = Object.values(json)
// list_values = []
// for (let i = 0; i < data.length; i++){
//   if (data[i].year == currentyear && data[i].sex == sex && data[i].age == age){
//     list = []
//     list.push(data[i].alpha_code, data[i].suicides_no)
//     list_values.push(list)
//   }
// }
//
// var onlyValues = []
// for (let i = 0; i < list_values.length; i++){
//   onlyValues.push(list_values[i][1])
// }
//
// var minValue = Math.min(... onlyValues),
//         maxValue = Math.max(... onlyValues);
//
//
// var paletteScale = d3.scale.linear()
//         .domain([minValue,maxValue])
//         .range(["#99ccff", "#000099"]); // blue color
//
//
//
