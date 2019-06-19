function makepiechart(data_pie){
// source update: https://bl.ocks.org/adamjanes/5e53cfa2ef3d3f05828020315a3ba18c/22619fa86de2045b6eeb4060e747c5076569ec47
// https://bl.ocks.org/adamjanes/53eedf0b915fd8b20f04fd08bc24ff00
  var divsize = d3v5.select("#container3").node().getBoundingClientRect();

  var width = divsize.width
  var height = divsize.height
      margin = 40

  var radius = Math.min(width, height) / 2 - margin

  var pie_chart = d3v5.select("#pie_chart");

  var data = data_pie
  console.log(data)

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["steelblue", "pink"]);

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))
  console.log(data_ready)
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
      .enter()
      // .append("g")
      // .attr("class", "arc")
      // .attr("stroke", "black")
      // .style("stroke-width", "1px")
      // .style("opacity", 0.7)
      .on("mouseenter", mouseoverpiechart)
      .on("mouseout", mouseoutpiechart)

  pie.selectAll("path")
        .attr("d", arcGenerator)
        .attr("id", "pathdonut")
        .style("fill", function(d) { return colors(d.data.key);})
        .attr("data-legend",function(d) { return d.data.key})
 pie.selectAll("text")
       .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
       .text(function(d){ return d.data.value })
       .style("text-anchor", "middle")
       .style("font-size", 16)

 function mouseoverpiechart() {
     d3v5.select(this)
         .attr("stroke", "red")
         .style("stroke-width", "3px")
         .style("stroke-opacity", 0.7)
 }
 function mouseoutpiechart() {
     d3v5.select(this)
         .attr("stroke", "black")
         .style("stroke-width", "1px")
         .style("stroke-opacity", 0.7)
       }

  // var pie = svgpiechart.selectAll("arc")
  //     .data(data_ready)
  //     .enter()
  //     // .enter().append("g")
  //     // .attr("class", "arc")
  //     // .attr("stroke", "black")
  //     // .style("stroke-width", "1px")
  //     // .style("opacity", 0.7)
  //
  // // var tip = d3v5.tip()
  // //     .attr('class', 'd3-tip')
  // //     .offset([-10, 0])
  // //     .html(function(d) {
  // //       return "<span style='color:lavender'>" + d.data.value + "</span> <strong>%</strong>";
  // //       })
  // pie.selectAll("path")
  //     .attr("d", arcGenerator)
  //     .selectAll("pathdonut")
  //     .style("fill", function(d) { return colors(d.data.key);})
  //     .attr("data-legend",function(d) { return d.data.key})
  // // pie.append("path")
  // //     .attr("d", arcGenerator)
  // //     .style("fill", function(d) { return colors(d.data.key);})
  // //     .attr("data-legend",function(d) { return d.data.key})
  //  pie.select("text")
  //        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  //        .text(function(d){ return d.data.value })
  //        .style("text-anchor", "middle")
  //        .style("font-size", 16)





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

  //  // Source: http://bl.ocks.org/ZJONSSON/3918369
  //  legend = pie.append("g")
  //  .attr("class","legend")
  //  .attr("transform","translate(125,150)")
  //  .style("font-size","12px")
  //  .call(d3.legend)
  //
  // setTimeout(function() {
  //  legend
  //    .style("font-size","20px")
  //    .attr("data-style-padding",10)
  //    .call(d3.legend)
  //  },1000)

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
