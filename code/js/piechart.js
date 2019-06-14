function piechart(data, country){
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

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["#80aaff", "#ffb3e6"]);

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))

  var arcGenerator = d3v5.arc()
    .innerRadius(0)
    .outerRadius(125)

  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(colors(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

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
