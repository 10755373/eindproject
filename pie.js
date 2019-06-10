function drawpie(data){
  console.log(data)
  // var data = [2, 4, 8, 10];
  //
  // var svg = d3v5.select("svg"),
  //     width = svg.attr("width"),
  //     height = svg.attr("height"),
  //     radius = Math.min(width, height) / 2,
  //     g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //
  // var color = d3v5.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
  //
  // // Generate the pie
  // var pie = d3v5.pie();
  //
  // // Generate the arcs
  // var arc = d3v5.arc()
  //             .innerRadius(0)
  //             .outerRadius(radius);
  //
  // //Generate groups
  // var arcs = g.selectAll("arc")
  //             .data(pie(data))
  //             .enter()
  //             .append("g")
  //             .attr("class", "arc")
  //
  // //Draw arc paths
  // arcs.append("path")
  //     .attr("fill", function(d, i) {
  //         return color(i);
  //     })
  //     .attr("d", arc);

  // // set the dimensions and margins of the graph
  // var width = 450
  //     height = 450
  //     margin = 40

  // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
  var radius = Math.min(450, 450) / 2 - 50

  // append the svg object to the div called 'my_dataviz'
  var svg = d3.select("#container2")
    .append("svg")
      .attr("width", 450)
      .attr("height", 450)
    .append("g")
      .attr("transform", "translate(" + 450 / 2 + "," + 450 / 2 + ")");

  // set the color scale
  var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3v5.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

};


// // draw datamap with fillkeys from json, if existing
// function makepie(){
//
//   // // create promise for json of gdp-data
//   // d3v5.json("data.json").then(function(data) {
//
//   var data = [2, 4, 8, 10];
//
//   var svg = d3v5.select("svg"),
//       width = svg.attr("width"),
//       height = svg.attr("height"),
//       radius = Math.min(width, height) / 2,
//       g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//
//   var color = d3v5.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
//
//   // Generate the pie
//   var pie = d3.pie();
//
//   // Generate the arcs
//   var arc = d3v5.arc()
//               .innerRadius(0)
//               .outerRadius(radius);
//
//   //Generate groups
//   var arcs = g.selectAll("arc")
//               .data(pie(data))
//               .enter()
//               .append("g")
//               .attr("class", "arc")
//
//   //Draw arc paths
//   arcs.append("path")
//       .attr("fill", function(d, i) {
//           return color(i);
//       })
//       .attr("d", arc)
//
//     };
