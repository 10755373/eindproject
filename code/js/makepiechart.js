function makepiechart(){
  var width = 450
      height = 450
      margin = 40

  var radius = Math.min(width, height) / 2 - margin

  var svg = d3v5.select("#container4")
    .append("svg")
    .attr("id", "donut")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data = {male: 643, female: 350}

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["#80aaff", "#ffb3e6"]);

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))

  var arcGenerator = d3v5.arc()
    .innerRadius(0)
    .outerRadius(125)

  // var donut = svg.selectAll("arc")
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //     .attr('d', arcGenerator)
  //     .attr('fill', function(d){ return(colors(d.data.key)) })
  //     .attr("stroke", "black")
  //     .style("stroke-width", "2px")
  //     .style("opacity", 0.7)

  var pie = svg.selectAll("arc")
      .data(data_ready)
      .enter().append("g")
      .attr("class", "arc")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 0.7)

  pie.append("path")
      .attr("d", arcGenerator)
      .style("fill", function(d) { return colors(d.data.key);})
   pie.append("text")
         .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
         .text(function(d){ return d.data.key + ": " + d.data.value })
         .style("text-anchor", "middle")
         .style("font-size", 16)

  // donut
  //   .selectAll('mySlices')
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //   .text(function(d){ return d.data.key + ": " + d.data.value })
  //   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  //   .style("text-anchor", "middle")
  //   .style("font-size", 17)
};
