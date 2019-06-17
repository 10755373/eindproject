function makedonutchart(data_donut){

  var divsize = d3v5.select("#container3").node().getBoundingClientRect();

  var width = divsize.width
  var height = divsize.height
      margin = 40

  var radius = Math.min(width, height) / 2 - margin

  var svg = d3v5.select("#donut");

  var data = data_donut
  console.log(data)

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))
  console.log(data_ready)
  var arcGenerator = d3v5.arc()
    .innerRadius(0)
    .outerRadius(125)

  var donut = svg.select("arc")
      .data(data_ready)

  donut.select("pathonut")
      .attr("d", arcGenerator)
      .style("fill", function(d) { return colors(d.data.key);})
      .attr("data-legend",function(d) { return d.data.key})
      .on("mouseenter", mouseoverdonutchart)
      .on("mouseout", mouseoutdonutchart)

   donut.append("text")
         .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
         .text(function(d){ return d.data.value })
         .style("text-anchor", "middle")
         .style("font-size", 16)

   function mouseoverdonutchart() {
       d3v5.select(this)
           .attr("stroke", "red")
           .style("stroke-width", "3px")
           .style("stroke-opacity", 0.7)
   }
   function mouseoutdonutchart() {
       d3v5.select(this)
           .attr("stroke", "black")
           .style("stroke-width", "1px")
           .style("stroke-opacity", 0.7)
   }

};
