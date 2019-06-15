function makepiechart(data_pie){

  d3v5.select("#container3").selectAll("*").remove();


  var width = 450
      height = 450
      margin = 40

  var radius = Math.min(width, height) / 2 - margin

  var svg = d3v5.select("#container3")
    .append("svg")
    .attr("id", "pie")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data = data_pie
  console.log(data)

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["steelblue", "pink"]);

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

  //create tip
  var tip = d3v5.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<span style='color:lavender'>" + d.data.value + "</span> <strong>%</strong>";
        })

  pie.append("path")
      .attr("d", arcGenerator)
      .style("fill", function(d) { return colors(d.data.key);})
      .attr("data-legend",function(d) { return d.data.key})
   pie.append("text")
         .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
         .text(function(d){ return d.data.value })
         .style("text-anchor", "middle")
         .style("font-size", 16)

   // pie.append("path")
   //     .attr("d", arcGenerator)
   //     .style("fill", colors)
   //     .on("mouseover", tip.show)
   //     .on('mouseout', tip.hide);

   // Source: http://bl.ocks.org/ZJONSSON/3918369
   legend = pie.append("g")
   .attr("class","legend")
   .attr("transform","translate(125,150)")
   .style("font-size","12px")
   .call(d3.legend)

  setTimeout(function() {
   legend
     .style("font-size","20px")
     .attr("data-style-padding",10)
     .call(d3.legend)
   },1000)

  // donut
  //   .selectAll('mySlices')
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //   .text(function(d){ return d.data.key + ": " + d.data.value })
  //   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  //   .style("text-anchor", "middle")
  //   .style("font-size", 17)
//
//   //create tip
// var tip = d3v5.tip()
//     .attr('class', 'd3-tip')
//     .offset([-10, 0])
//     .html(function(d) {
//       return "<span style='color:lavender'>" + d.value + "</span> <strong>%</strong>";
//       })
// g.append("path")
//     .attr("d", arc)
//     .style("fill", function(d) { return color(d.data.type);})
//     .on("mouseover", tip.show)
//     .on('mouseout', tip.hide);

  // pie.append("g")
  //     .attr("class", "legend")
  //     .attr("transform", "translate(" + radius + ", 0)")
  //     .style("font-size", "12px")
  //     .call(d3.legend);

};
