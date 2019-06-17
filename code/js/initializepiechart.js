function initializepiechart(){

  var divsize = d3v5.select("#container3").node().getBoundingClientRect();

  var width = divsize.height
  var height = divsize.width
  var margin = 40

  var radius = Math.min(width, height) / 2 - margin

  var pie_chart = d3v5.select("#container3").append("svg")
    .attr("class", "pie")
    .attr("id", "pie")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "pie_chart")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data = {male: 350, female: 211};

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["steelblue", "pink"]);

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))

  var arcGenerator = d3v5.arc()
    .innerRadius(0)
    .outerRadius(120)

  // var donut = svg.selectAll("arc")
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //     .attr('d', arcGenerator)
  //     .attr('fill', function(d){ return(colors(d.data.key)) })
  //     .attr("stroke", "black")
  //     .style("stroke-width", "2px")
  //     .style("opacity", 0.7)

  var pie = pie_chart.selectAll("arc")
      .data(data_ready)
      .enter().append("g")
      .attr("class", "arc")
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 0.7)

  pie.append("path")
        .attr("d", arcGenerator)
        .attr("id", "pathdonut")
        .style("fill", function(d) { return colors(d.data.key);})
        .attr("data-legend",function(d) { return d.data.key})
 pie.append("text")
       .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
       .text(function(d){ return d.data.value })
       .style("text-anchor", "middle")
       .style("font-size", 16)

  // var tip = d3v5.tip()
  //     .attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //       return "<span style='color:lavender'>" + d.data.value + "</span> <strong>%</strong>";
  //       })


    //
    //      .on("mouseover", function(d) {
    //        d3v5.select("#tooltip").style('opacity', 1)
    //          .select("#value").text(d.data.value);
    //      })
    //      .on("mousemove", function(d) {
    //        d3v5.select("#tooltip").style("top", (d3v5.event.pageY - 10) + "px")
    //        .style("left", (d3v5.event.pageX + 10) + "px");
    //      })
    //      .on("mouseout", function() {
    //        d3v5.select("#tooltip").style('opacity', 0);
    //      });
    //
    // pie.call(tip);

   // pie.append("path")
   //     .attr("d", arcGenerator)
   //     .style("fill", colors)
   //     .on("mouseover", tip.show)
   //     .on('mouseout', tip.hide);

   // Source: http://bl.ocks.org/ZJONSSON/3918369
   legend = pie.append("g")
   .attr("class","legend")
   .attr("id", "legend")
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


// Source: http://www.cagrimmett.com/til/2016/08/24/d3-pie-chart-update.html
