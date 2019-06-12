function makepiechart2(data, country){
  var width = 450
      height = 450
      margin = 40

  var radius = Math.min(width, height) / 2 - margin

  var svg = d3v5.select("#container4")
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data = data

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
    .text(function(d){ return d.data.key + ": " + d.data.value })
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 17)
};
