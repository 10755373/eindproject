function geendataland(country){

  var divsize = d3v5.select("#container2").node().getBoundingClientRect();

  var margin = {top: 20, right: 80, bottom: 20, left: 120};
  var width = divsize.width
  var height = divsize.height
  var barPadding = 0.5;

  var svg = d3v5.select("#svg_linegraph_container")
              .append("svg")
              .attr("id","graph")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
      .attr("x", (width / 3))
      .attr("y", (margin.bottom * 10))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Sorry! Unfortunately, there's no data available for " + country);

};


// d3.select("#container2").selectAll("*").remove();
//
// var margin = {top: 120, right: 70, bottom: 70, left: 70};
//
// var divsize = d3v5.select("#container2").node().getBoundingClientRect();
//
// var parseTime = d3v5.timeParse("%Y")
//
// var width = divsize.width - margin.left - margin.right;
// var height = divsize.height - margin.top - margin.bottom;
//
// var x = d3v5.scaleTime().range([0, width]);
// var y = d3v5.scaleLinear().range([height, 0]);
//
// var valueline = d3v5.line()
//     .x(function(d) { return x(d.x); })
//     .y(function(d) { return y(d.y); });
//
// yearsmale = []
// valuesmale = []
// data_male.forEach(function(d) {
//     d.x = parseTime(d.x);
//     yearsmale.push(d.x);
//     valuesmale.push(d.y);
//     d.y = +d.y;
// });
// yearsfemale = []
// valuesfemale = []
// data_female.forEach(function(d) {
//     d.x = parseTime(d.x);
//     yearsfemale.push(d.x);
//     valuesfemale.push(d.y);
//     d.y = +d.y;
// });
//
// var maxmale = d3v5.max(data_male, function(d) {return d.y})
// var maxfemale = d3v5.max(data_female, function(d) {return d.y})
// if (maxmale > maxfemale){
//   x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
//   y.domain([0, d3v5.max(data_male, function(d) { return d.y; })]);
// }
// else{
//   x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
//   y.domain([0, d3v5.max(data_female, function(d) { return d.y; })]);
// }
//
// var svg_linegraph_container = d3v5.select("#container2").append("svg")
//     .attr("class", "svglinegraph")
//     .attr("id", "svglinegraph")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("id", "svg_linegraph_container")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
//     // .attr("transform",
//     //       "translate(" + margin.left + "," + margin.right + "," + margin.top + ")");
//
// var lastvaluemale = [yearsmale.slice(-1)[0], valuesmale.slice(-1)[0]];
// console.log(lastvaluemale)
// // svg_linegraph_container
// //   .append("text")
// //   .attr("id", "line-name")
// //   .data(lineData[key])
// //   .attr("transform", function(d, i) {
// //     return "translate (" + x(lastvaluemale[0]) + "," +
// //            y(lastvaluemale[1]) + ")"; })
// //   .text("Males");
//
//
// svg_linegraph_container.append("path")
//     .data([data_male])
//     .attr("class", "line")
//     .attr("id", "line_male")
//     .attr("d", valueline)
//     .attr("data-legend",function(d) { return d.x})
//     .attr("stroke", "steelblue")
//     .attr("stroke-width", "2px")
//     .attr("fill", "none")
//     .append("text")
//     .attr("id", "line-name-male")
//     .attr("transform", function(d, i) {
//       return "translate (" + x(lastvaluemale[0]) + "," +
//              y(lastvaluemale[1]) + ")"; })
//     .text("Males");
//
// var lastvaluefemale = [yearsfemale.slice(-1)[0], valuesfemale.slice(-1)[0]];
// console.log(lastvaluefemale)
//
// // svg_linegraph_container.append("text")
// //   .attr("id", "line-name")
// //   .data(lineData[key])
// //   .attr("transform", function(d, i) {
// //     return "translate (" + x(lastvaluefemale[0]) + "," +
// //            y(lastvaluefemale[1]) + ")"; })
// //   .text("Females");
//
// svg_linegraph_container.append("path")
//     .data([data_female])
//     .attr("class", "line")
//     .attr("id", "line_female")
//     .attr("d", valueline)
//     .attr("data-legend",function(d) { return d.x})
//     .attr("stroke", "pink")
//     .attr("stroke-width", "2px")
//     .attr("fill", "none")
//     .append("text")
//       .attr("id", "line-name")
//       .attr("transform", function(d, i) {
//         return "translate (" + x(lastvaluefemale[0]) + "," +
//                y(lastvaluefemale[1]) + ")"; })
//       .text("Females");
//
// svg_linegraph_container.append("g")
//     .attr("id", "xaxis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3v5.axisBottom(x));
// svg_linegraph_container.append("text")
//     .attr("transform",
//     "translate(" + (width) + " ," +
//                    (height + 50) + ")")
//     .style("text-anchor", "end")
//     .text("Year");
// svg_linegraph_container.append("g")
//     .attr("id", "yaxisleft")
//     .call(d3v5.axisLeft(y));
// svg_linegraph_container.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("dy", "1.5em")
//     .style("text-anchor", "end")
//     .text("No of suicides");
//
// //     // update title
// // document.getElementById("titleRadar").innerHTML = "Emissions (%) per sector in <br>" + currentCountry + ", " + currentYear;
//
// var titlelinegraph = svg_linegraph_container.append("g")
// .attr("id", "titlelinegraph");
// titlelinegraph
// .append("text")
// .attr("x", (width / 2))
// .attr("y", top)
// .attr("class", "title")
// .attr("text-anchor", "middle")
// .style("font-size", "14px")
// .text("Data for ");


function testdrawpiechart(data_pie, data_donut){
//
  if ( $('#container3').is(':empty')){
    newpiechart(data_pie, data_donut)
  }
  else{
    updatepiechart(data_pie, data_donut)
  }};


  function newpiechart(data_pie, data_donut){

  var divsize = d3v5.select("#container3").node().getBoundingClientRect();
  console.log(data_pie)
  console.log(data_donut)
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

  var data_pie = data_pie;

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["steelblue", "pink"]);

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })

  var data_ready = pie(d3v5.entries(data_pie))

  var arcGenerator = d3v5.arc()
    .innerRadius(0)
    .outerRadius(140)

  var path = svg.datum(data).selectAll("path")
      .data(data_pie)
    .enter().append("path")
      .attr("fill", function(d){ return(colors(d.data.key)) })
      .attr("d", arcGenerator)
      .each(function(d) { this._current = d; }); // store the initial angles

  // //create tip
  // var tip = d3v5.tip()
  //     .attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //       return "<span style='color:orange'>" + d.data.value + "</span> <strong>%</strong>";
  //       })

  // var donut = svg.selectAll("arc")
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //     .attr('d', arcGenerator)
  //     .attr('fill', function(d){ return(colors(d.data.key)) })
  //     .attr("stroke", "black")
  //     .style("stroke-width", "2px")
  //     .style("opacity", 0.7)

  // var div = d3v5.select("#container3").append("div")
  //     .attr("class", "tooltipscatter")
  //     .style("opacity", 0);
  //
  // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  // pie_chart
  //   .selectAll('.piechart')
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //     .attr("class", "piechart")
  //     .attr('d', arcGenerator)
  //     .attr('fill', function(d){ return(colors(d.data.key)) })
  //     .attr("stroke", "black")
  //     .style("stroke-width", "2px")
  //     .style("opacity", 0.7)
  //     .on("mouseover", function(d) {
  //      div.transition()
  //          .duration(200)
  //          .style("opacity", .9);
  //      div .html(d.data.key + "<br/>")
  //           .html(d.data.value + "<br/>")
  //          .style("left", (d3v5.event.pageX + 15) + "px")
  //          .style("top", (d3v5.event.pageY - 20) + "px");
  //      })
  //      .on("mouseout", function(d) {
  //      div.transition()
  //          .duration(500)
  //          .style("opacity", 0);
  //          })
  //     .on("mouseenter", mouseoverpiechart)
  //     // .on("mouseover", tip.show)
  //     .on("mouseout", mouseoutpiechart);
  //     // .on("mouseout", tip.hide)
  //     // .on("mouseover", function (d) {
  //     // d3.select("#tooltip")
  //     //     .style("left", d3.event.pageX + "px")
  //     //     .style("top", d3.event.pageY + "px")
  //     //     .style("opacity", 1)
  //     //     .select("#value")
  //     //     .text(d.value);
  //     //   })
  //     // .on("mouseout", function () {
  //     // // Hide the tooltip
  //     // d3.select("#tooltip")
  //     //     .style("opacity", 0);;
  //     //   });
  //
  // // Now add the annotation. Use the centroid method to get the best coordinates
  // pie_chart
  //   .selectAll('mySlices')
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //   .text(function(d){ return d.data.value})
  //   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  //   .style("text-anchor", "middle")
  //   .style("font-size", 17)

  // make donut chart!!!!

  var data_donut = data_donut;

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["steelblue", "pink"]);

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_corrected = pie(d3v5.entries(data_donut))

  var arcGenerator2 = d3v5.arc()
    .innerRadius(145)
    .outerRadius(radius)

  var path = svg.datum(data).selectAll("path")
    .data(data_donut)
  .enter().append("path")
    .attr("fill", function(d){ return(colors(d.data.key)) })
    .attr("d", arc)
    .each(function(d) { this._current = d; }); // store the initial angles

  // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  // pie_chart
  //   .selectAll('mySlices')
  //   .data(data_corrected)
  //   .enter()
  //   .append('path')
  //     .attr("id", "piechart")
  //     .attr('d', arcGenerator2)
  //     .attr('fill', function(d){ return(colors(d.data.key)) })
  //     .attr("stroke", "black")
  //     .style("stroke-width", "2px")
  //     .style("opacity", 0.7)
  //     .on("mouseover", function(d) {
  //      div.transition()
  //          .duration(200)
  //          .style("opacity", .9);
  //     div  .html(d.data.key + "<br/>")
  //          .html(d.data.value + "<br/>")
  //          .style("left", (d3v5.event.pageX + 15) + "px")
  //          .style("top", (d3v5.event.pageY - 20) + "px");
  //      })
  //      .on("mouseout", function(d) {
  //      div.transition()
  //          .duration(500)
  //          .style("opacity", 0);
  //          })
  //     .on("mouseenter", mouseoverpiechart)
  //     // .on("mouseover", tip.show)
  //     .on("mouseout", mouseoutpiechart);
  //     // .on("mouseout", tip.hide)
  //
  // // Now add the annotation. Use the centroid method to get the best coordinates
  // pie_chart
  //   .selectAll('mySlices')
  //   .data(data_corrected)
  //   .enter()
  //   .append('text')
  //   .text(function(d){ return d.data.value})
  //   .attr("transform", function(d) { return "translate(" + arcGenerator2.centroid(d) + ")";  })
  //   .style("text-anchor", "middle")
  //   .style("font-size", 17)
  //
  //
  //   function mouseoverpiechart() {
  //       d3v5.select(this)
  //           .attr("stroke", "red")
  //           .style("stroke-width", "2px")
  //           .style("stroke-opacity", 0.7)
  //   }
  //   function mouseoutpiechart() {
  //       d3v5.select(this)
  //           .attr("stroke", "black")
  //           .style("stroke-width", "2px")
  //           .style("stroke-opacity", 0.7)
  //   }


    }

    function updatepiechart(data_pie, data_donut){
      console.log(data_pie)
      var pie = d3v5.pie()
        .value(function(d) {return d.value; })
      var data_ready = pie(d3v5.entries(data_pie))
      var data_corrected = pie(d3v5.entries(data_donut))

      path = d3v5.select("#container3").selectAll("path").data(data_ready);
      console.log(path)
      path.transition().duration(500).attrTween("d", arcTween);
      path.enter().append("path").attr("d", arcTween).each(function(d) {this._current = d; });


      path2 = d3v5.select("#container3").selectAll("path").data(data_corrected);
      console.log(path2)
      path2.transition().duration(500).attrTween("d", arc2Tween);
      path2.enter().append("path").attr("d", arc2Tween).each(function(d) {this._current = d; });

    }


  function arcTween(a) {

    var divsize = d3v5.select("#container3").node().getBoundingClientRect();

    var width = divsize.height
    var height = divsize.width
    var margin = 40

    var radius = Math.min(width, height) / 2 - margin

    var arcGenerator = d3v5.arc()
      .innerRadius(0)
      .outerRadius(140)

    var i = d3v5.interpolate(this._current, a);
    this._current = i(0);
      return function(t) {
    return arcGenerator(i(t));
    };
    }


  function arc2Tween(a) {
    var divsize = d3v5.select("#container3").node().getBoundingClientRect();

    var width = divsize.height
    var height = divsize.width
    var margin = 40

    var radius = Math.min(width, height) / 2 - margin

    var arcGenerator2 = d3v5.arc()
      .innerRadius(145)
      .outerRadius(radius)

    var i = d3v5.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arcGenerator2(i(t));
    };
}
