function makepiechart(){
  // set the dimensions and margins of the graph
  var width = 450
      height = 450
      margin = 40

  // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'my_dataviz'
  var svg = d3v5.select("#container2")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Create dummy data
  var data = {a: 9, b: 20, c:30, d:8, e:12}

  // set the color scale
  var color = d3v5.scaleOrdinal()
    .domain(data)
    .range(d3v5.schemeSet2);

  // Compute the position of each group on the pie:
  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  var arcGenerator = d3v5.arc()
    .innerRadius(0)
    .outerRadius(radius)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

  // Now add the annotation. Use the centroid method to get the best coordinates
  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return "grp " + d.data.key})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
};




// https://codepen.io/lisaofalltrades/pen/jZyzKo

// function makepie() {
//   // https://www.d3-graph-gallery.com/graph/pie_changeData.html
// // 				<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
// 				// <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>
//
//
//   // set the dimensions and margins of the graph
//   var width = 450
//       height = 450
//       margin = 40
//
//   // The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
//   var radius = Math.min(width, height) / 2 - margin
//
//   // append the svg object to the div called 'my_dataviz'
//   var svg = d3.select("#container2")
//     .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//     .append("g")
//       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//
//   // create 2 data_set
//   var data1 = {a: 9, b: 20, c:30, d:8, e:12}
//   var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}
//
//   // set the color scale
//   var color = d3v5.scaleOrdinal()
//     .domain(["a", "b", "c", "d", "e", "f"])
//     .range(d3v5.schemeDark2);
//
//   // A function that create / update the plot for a given variable:
//   function update(data) {
//
//     // Compute the position of each group on the pie:
//     var pie = d3v5.pie()
//       .value(function(d) {return d.value; })
//       .sort(function(a, b) { console.log(a) ; return d3v5.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
//     var data_ready = pie(d3v5.entries(data))
//
//     // map to data
//     var u = svg.selectAll("path")
//       .data(data_ready)
//
//     // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
//     u
//       .enter()
//       .append('path')
//       .merge(u)
//       .transition()
//       .duration(1000)
//       .attr('d', d3.arc()
//         .innerRadius(0)
//         .outerRadius(radius)
//       )
//       .attr('fill', function(d){ return(color(d.data.key)) })
//       .attr("stroke", "white")
//       .style("stroke-width", "2px")
//       .style("opacity", 1)
//
//     // remove the group that is not present anymore
//     u
//       .exit()
//       .remove()
//
//   }
//
//   // Initialize the plot with the first dataset
//   update(data1)
//
//   };
