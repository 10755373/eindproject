function drawlinegraph(data_male_total, data_female_total, data_male_100k, data_female_100k) {

    var data_male_total = data_male_total
    var data_female_total = data_female_total
    // console.log(data_male_total)
    // console.log(data_female_total)
    var data_male_100k = data_male_100k
    var data_female_100k = data_female_100k
    console.log(data_male_100k)
    console.log(data_female_100k)

    d3v5.select("#container2").selectAll("*").remove();

    var margin = {top: 120, right: 70, bottom: 70, left: 70};

    var divsize = d3v5.select("#container2").node().getBoundingClientRect();

    // width and height of graph in pixels
    var width = divsize.width - margin.left - margin.right;
    var height = divsize.height - margin.top - margin.bottom;

    // var parseTime = d3v5.timeFormat('%Y')
    var parseTime = d3v5.timeParse("%Y")

    // set the ranges
    var x = d3v5.scaleTime().range([0, width]);
    var y = d3v5.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3v5.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    var svg_linegraph = d3v5.select("#container2").append("svg")
        .attr("class", "linegraph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
      // put years in correct format
      data_male_total.forEach(function(d) {
          d.x = parseTime(d.x);
          // console.log(d.x);
          d.y = +d.y;
      });
      data_female_total.forEach(function(d) {
          d.x = parseTime(d.x);
          // console.log(d.x);
          d.y = +d.y;
      });
      // determine scales
      x.domain(d3v5.extent(data_male_total, function(d) { return d.x; }));
      y.domain([0, d3v5.max(data_male_total, function(d) { return d.y; })]);
      // draw line males
      svg_linegraph.append("path")
          .data([data_male_total])
          .attr("class", "line")
          .attr("id", "line_male")
          .attr("d", valueline)
          // .attr("data-legend",function(d) { return d.x})
          .attr("stroke", "steelblue")
          .attr("stroke-width", "2px")
          .attr("fill", "none");
      // draw line females
      svg_linegraph.append("path")
          .data([data_female_total])
          .attr("class", "line")
          .attr("id", "line_female")
          .attr("d", valueline)
          // .attr("data-legend",function(d) { return d.x})
          .attr("stroke", "pink")
          .attr("stroke-width", "2px")
          .attr("fill", "none");
      // draw xaxis
      svg_linegraph.append("g")
          .attr("id", "xaxis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3v5.axisBottom(x));
      // write xaxis label
      svg_linegraph.append("text")
          .attr("transform",
          "translate(" + (width) + " ," +
                         (height - 20) + ")")
          .style("text-anchor", "end")
          .text("Year");
      // draw yaxis
      svg_linegraph.append("g")
          .attr("id", "yaxis")
          .call(d3v5.axisLeft(y));
      // write yaxis label
      svg_linegraph.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "1.5em")
          .style("text-anchor", "end")
          // .attr("font-size", "15px")
          .text("No of suicides");

      // legend = svg_linegraph.append("g")
      //   .attr("class","legend")
      //   .attr("transform","translate(50,30)")
      //   .style("font-size","12px")
      //   .call(d3.legend)
      //
      // setTimeout(function() {
      //   legend
      //     .style("font-size","20px")
      //     .attr("data-style-padding",10)
      //     .call(d3.legend)
      // },1000)

      // legend = svg_linegraph.append("g")
      //   .attr("class","legend")
      //   .attr("transform","translate(200,300)")
      //   .style("font-size","12px")
      //   .call(d3.legend)
      //
      // setTimeout(function() {
      //   legend
      //     .style("font-size","20px")
      //     .attr("data-style-padding",10)
      //     .call(d3.legend)
      // },1000)
    // // set the ranges
    // var xx = d3v5.scaleTime().range([0, width]);
    // var yy = d3v5.scaleLinear().range([height, 0]);
    //
    // // define the line
    // var valueline100k = d3v5.line()
    //     .xx(function(d) { return xx(d.x); })
    //     .yy(function(d) { return yy(d.y); });
    //
    // // put years in correct format
    // data_male_100k.forEach(function(d) {
    //     d.x = parseTime(d.x);
    //     console.log(d.x);
    //     d.y = +d.y;
    // });
    // data_female_100k.forEach(function(d) {
    //     d.x = parseTime(d.x);
    //     // console.log(d.x);
    //     d.y = +d.y;
    // });
    // // determine scales
    // xx.domain(d3v5.extent(data_male_100k, function(d) { return d.x; }));
    // yy.domain([0, d3v5.max(data_male_100k, function(d) { return d.y; })]);
    // // draw line males
    // svg_linegraph.append("path")
    //     .data([data_male_100k])
    //     .attr("class", "line")
    //     .attr("id", "line_male_100k")
    //     .attr("d", valueline100k)
    //     .attr("stroke", "steelblue")
    //     .attr("stroke-width", "2px")
    //     .attr("fill", "none");
    // // draw line females
    // svg_linegraph.append("path")
    //     .data([data_female_100k])
    //     .attr("class", "line")
    //     .attr("id", "line_female_100k")
    //     .attr("d", valueline100k)
    //     .attr("stroke", "pink")
    //     .attr("stroke-width", "2px")
    //     .attr("fill", "none");
    // // draw yaxis
    // svg_linegraph.append("g")
    //     .attr("id", "yaxisright")
    //     .attr("transform", "translate(" + width + " ,0)")
    //     .call(d3v5.axisRight(y));

};

// /*
// http://bl.ocks.org/dbuezas/9306799 */
// /* Mouse-over effects */
// .slider:hover {
//   opacity: 1; /* Fully shown on mouse-over */
// }
//
// /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
// .slider::-webkit-slider-thumb {
//   -webkit-appearance: none; /* Override default look */
//   appearance: none;
//   width: 25px; /* Set a specific slider handle width */
//   height: 25px; /* Slider handle height */
//   background: #4CAF50; /* Green background */
//   cursor: pointer; /* Cursor on hover */
// }
//
// .slider::-moz-range-thumb {
//   width: 25px; /* Set a specific slider handle width */
//   height: 25px; /* Slider handle height */
//   background: #4CAF50; /* Green background */
//   cursor: pointer; /* Cursor on hover */
// }
//
// /*
// pie and donut
// */
// body {
//   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
//   width: 960px;
//   height: 500px;
//   position: absolute;
// }

// svg {
// 	width: 100%;
// 	height: 100%;
//   position: absolute;
// }
//
// path.slice{
// 	stroke-width:2px;
//   position: absolute;
// }
//
// polyline{
// 	opacity: .3;
// 	stroke: black;
// 	stroke-width: 2px;
// 	fill: none;
//   position: absolute;
// }
