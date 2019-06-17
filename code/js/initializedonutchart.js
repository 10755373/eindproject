function initializedonutchart(){

  var divsize = d3v5.select("#container3").node().getBoundingClientRect();

  var width = divsize.height
  var height = divsize.width
  var margin = 40

  var radius = Math.min(width, height) / 2 - margin

  var svgdonutchart = d3v5.select("#container3")
    .append("svg")
    .attr("id", "donut")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data = {male: 600, female: 500};

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["steelblue", "pink"]);

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))

  var arcGenerator = d3v5.arc()
    .innerRadius(125)
    .outerRadius(radius)

  // var donut = svg.selectAll("arc")
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //     .attr('d', arcGenerator)
  //     .attr('fill', function(d){ return(colors(d.data.key)) })
  //     .attr("stroke", "black")
  //     .style("stroke-width", "2px")
  //     .style("opacity", 0.7)

  var donut = svgdonutchart.selectAll("arc")
      .data(data_ready)
      .enter().append("g")
      .attr("id", "arc")
      .attr("class", "arc")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 0.7)

  // var tip = d3v5.tip()
  //     .attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //       return "<span style='color:lavender'>" + d.data.value + "</span> <strong>%</strong>";
  //       })

  donut.append("path")
      .attr("d", arcGenerator)
      .attr("id", "pathdonut")
      .style("fill", function(d) { return colors(d.data.key);})
      .attr("data-legend",function(d) { return d.data.key})
   donut.append("text")
         .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
         .text(function(d){ return d.data.value })
         .style("text-anchor", "middle")
         .style("font-size", 16)


};
