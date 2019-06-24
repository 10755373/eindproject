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
