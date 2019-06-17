function initializedonutchart(data_donut){
  // d3.select("#container3").selectAll("*").remove();

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

  var data = data_donut;

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["steelblue", "pink"]);

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data))

  var arcGenerator = d3v5.arc()
    .innerRadius(125)
    .outerRadius(radius)

  var donut = svgdonutchart.selectAll("arc")
    .data(data_ready)
    .enter()
    .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(colors(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

  // var donut = svgdonutchart.selectAll("arc")
  //     .data(data_ready)
  //     .enter().append("g")
  //     .attr("id", "arc")
  //     .attr("class", "arc")
  //     .attr("stroke", "black")
  //     .style("stroke-width", "1px")
  //     .style("opacity", 0.7)
  //     .on("mouseenter", mouseoverdonutchart)
  //     .on("mouseout", mouseoutdonutchart)
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
      .append("text")
         .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
         .text(function(d){ return d.data.value })
         .style("text-anchor", "middle")
         .style("font-size", 16)
  // 
  // function mouseoverdonutchart() {
  //     d3v5.select(this)
  //         .attr("stroke", "red")
  //         .style("stroke-width", "3px")
  //         .style("stroke-opacity", 0.7)
  // }
  // function mouseoutdonutchart() {
  //     d3v5.select(this)
  //         .attr("stroke", "black")
  //         .style("stroke-width", "1px")
  //         .style("stroke-opacity", 0.7)
  //       }

};

// function initializedonutchart(){
//
//   var divsize = d3v5.select("#container3").node().getBoundingClientRect();
//
//   var width = divsize.height
//   var height = divsize.width
//   var margin = 40
//
//   var radius = Math.min(width, height) / 2 - margin
//
//   const donut_chart = d3v5.select("#container3").append("svg")
//     .attr("class", "donut")
//     .attr("id", "donut")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("id", "donut_chart")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//
//   var data = {male: 600, female: 500};
//
//   var colors = d3v5.scaleOrdinal()
//     .domain(["male", "female"])
//     .range(["steelblue", "pink"]);
//
//   var pie = d3v5.pie()
//     .value(function(d) {return d.value; })
//   var data_correct = pie(d3v5.entries(data))
//
//   var arcGeneratordonut = d3v5.arc()
//     .innerRadius(125)
//     .outerRadius(radius)
//
//   // var donut = svg.selectAll("arc")
//   //   .data(data_ready)
//   //   .enter()
//   //   .append('path')
//   //     .attr('d', arcGenerator)
//   //     .attr('fill', function(d){ return(colors(d.data.key)) })
//   //     .attr("stroke", "black")
//   //     .style("stroke-width", "2px")
//   //     .style("opacity", 0.7)
//
//
//
//   var donut = donut_chart.select("arc")
//       .data(data_correct)
//       .enter().append("g")
//       .attr("id", "arc")
//       .attr("class", "arc")
//       .attr("stroke", "black")
//       .style("stroke-width", "1px")
//       .style("opacity", 0.7)
//       .on("mouseenter", mouseoverdonutchart)
//       .on("mouseout", mouseoutdonutchart)
//
//   // var tip = d3v5.tip()
//   //     .attr('class', 'd3-tip')
//   //     .offset([-10, 0])
//   //     .html(function(d) {
//   //       return "<span style='color:lavender'>" + d.data.value + "</span> <strong>%</strong>";
//   //       })
//
//   donut.append("path")
//       .attr("d", arcGeneratordonut)
//       .attr("id", "pathdonut")
//       .style("fill", function(d) { return colors(d.data.key);})
//       .attr("data-legend",function(d) { return d.data.key})
//    donut.append("text")
//          .attr("transform", function(d) { return "translate(" + arcGeneratordonut.centroid(d) + ")";  })
//          .text(function(d){ return d.data.value })
//          .style("text-anchor", "middle")
//          .style("font-size", 16)
//
//    function mouseoverdonutchart() {
//        d3v5.select(this)
//            .attr("stroke", "red")
//            .style("stroke-width", "3px")
//            .style("stroke-opacity", 0.7)
//    }
//    function mouseoutdonutchart() {
//        d3v5.select(this)
//            .attr("stroke", "black")
//            .style("stroke-width", "1px")
//            .style("stroke-opacity", 0.7)
//          }
//          //
//          // // make pie chart
//          // donut_chart.selectAll('pie2')
//          //     .data(data_correct)
//          //     .enter()
//          //     .append('path')
//          //     .attr('d', arcGeneratordonut)
//          //     .attr('fill', function(d) { return(secondColor(d.data.key)) })
//          //     .attr("stroke", "#7DC2AF")
//          //     .style("stroke-width", "3px")
//          //     .style("stroke-opacity", 1)
//          //     .on("mouseenter", mouseoverdonutchart)
//          //     .on("mouseout", mouseoutdonutchart)
//          //
//          //
//          // donut_chart.selectAll("pie2")
//          //   .data(data_correct)
//          //   .enter()
//          //   .append('text')
//          //   .text(function(d){ return d.data.key})
//          //   .attr("transform", function(d) { return "translate(" + arcGenerator2.centroid(d) + ")";  })
//          //   .style("text-anchor", "middle")
//          //   .style("font-size", 17)
//          //   .style('fill', 'white')
// };
