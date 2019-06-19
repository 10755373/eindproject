function drawlinegraph(data_male_total, data_female_total, optionmale, optionfemale) {
  // eventueel een hover: https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3
    // var data_male_total = data_male_total
    // var data_female_total = data_female_total
    // console.log(data_male_total)
    // console.log(data_female_total)
    // // var data_male_100k = data_male_100k
    // // var data_female_100k = data_female_100k
    // // var gdp_per_capita = gdp_per_capita
    // // console.log(data_male_100k)
    // // console.log(data_female_100k)
    // var optionmale = optionmale
    // var optionfemale = optionfemale
    // console.log(optionmale)
    // console.log(optionfemale)
    // console.log(typeof(optionfemale[0].z))

    

    // d3v5.select("#container2").selectAll("*").remove();

    var margin = {top: 120, right: 70, bottom: 70, left: 70};

    var divsize = d3v5.select("#svglinegraph").node().getBoundingClientRect();

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

    var svg_linegraph_container = d3v5.select("#svg_linegraph_container")

      // put years in correct format
      optionmale.forEach(function(d) {
          d.x = parseTime(d.x);
          // console.log(d.x);
          d.y = +d.y;
      });
      optionfemale.forEach(function(d) {
          d.x = parseTime(d.x);
          // console.log(d.x);
          d.y = +d.y;
      });
      // // determine scales
      // x.domain(d3v5.extent(optionmale, function(d) { return d.x; }));
      // y.domain([0, d3v5.max(optionfemale, function(d) { return d.y; })]);

      var initialgraph = function(agegroup){
        var datamaletest = []
        for (let i = 0; i < optionmale.length; i++){
          if (optionmale[i].z == agegroup){
            datamaletest.push(optionmale[i])
          }
        }
        var datafemaletest = []
        for (let i = 0; i < optionfemale.length; i++){
          if (optionfemale[i].z == agegroup){
            datafemaletest.push(optionfemale[i])
          }
        }
        // determine scales
        x.domain(d3v5.extent(datamaletest, function(d) { return d.x; }));
        y.domain([0, d3v5.max(datafemaletest, function(d) { return d.y; })]);

        // var datamale = optionmale.map(function(d){return {x: d.x, y: d.y, z:d[agegroup]} })
        // var datafemale = optionfemale.map(function(d){return {x: d.x, y: d.y, z:d[agegroup]} })
        // console.log(datamale)
        // console.log(datafemale)
        // console.log(typeof(datafemale[0].z))
        // draw line males
        svg_linegraph_container.select("#line_male")
            .data([datamaletest])
            .attr("d", valueline)
        // draw line females
        svg_linegraph_container.select("#line_female")
            .data([datafemaletest])
            .attr("d", valueline)
        // draw xaxis
        svg_linegraph_container.select("#xaxis")
            .call(d3v5.axisBottom(x));
        // draw yaxis
        svg_linegraph_container.select("#yaxisleft")
            .call(d3v5.axisLeft(y));
          }

      initialgraph("5-14 years")

   function update(selectedGroup) {
     var datamaletest = []
     for (let i = 0; i < optionmale.length; i++){
       if (optionmale[i].z == selectedGroup){
         datamaletest.push(optionmale[i])
       }
     }
     var datafemaletest = []
     for (let i = 0; i < optionfemale.length; i++){
       if (optionfemale[i].z == selectedGroup){
         datafemaletest.push(optionfemale[i])
       }
     }
     svg_linegraph_container.select("#line_male")
         .data([datamaletest])
         // .transition()
         .attr("d", d3v5.line()
           .x(function(d) { return x(d.x) })
           .y(function(d) { return y(d.y) })
         )
         svg_linegraph_container.select("#line_female")
         .data([datafemaletest])
         // .transition()
         .attr("d", d3v5.line()
           .x(function(d) { return x(d.x) })
           .y(function(d) { return y(d.y) })
         )
         // draw xaxis
         svg_linegraph_container.select("#xaxis")
             .call(d3v5.axisBottom(x));
         // draw yaxis
         svg_linegraph_container.select("#yaxisleft")
             .call(d3v5.axisLeft(y));
       }

   // When the button is changed, run the updateChart function
   d3v5.select("#selectButton").on("change", function(d) {
       // recover the option that has been chosen
       var selectedOption = d3v5.select(this).property("value")
       // run the updateChart function with this selected option
       update(selectedOption)
   })
};

  // // ** Update data section (Called from the onclick)
  // function updateData() {
  //
  //   var requests = [d3v5.json("/data/dataproject.json")];
  //     // Get the data again
  //     d3v5.json("/data/dataproject.json", function(error, data) {
  //        	data.forEach(function(d) {
  //           if
  // 	    	d.date = parseDate(d.date);
  // 	    	d.close = +d.close;
  // 	    });
  //
  //     	// Scale the range of the data again
  //     	x.domain(d3.extent(data, function(d) { return d.date; }));
  // 	    y.domain([0, d3.max(data, function(d) { return d.close; })]);
  //
  //     // Select the section we want to apply our changes to
  //     var svg = d3.select("body").transition();
  //
  //     // Make the changes
  //         svg.select(".line")   // change the line
  //             .duration(750)
  //             .attr("d", valueline(data));
  //         svg.select(".x.axis") // change the x axis
  //             .duration(750)
  //             .call(xAxis);
  //         svg.select(".y.axis") // change the y axis
  //             .duration(750)
  //             .call(yAxis);
  //
  //     });
  // }

      // legend = svg_linegraph_container.append("g")
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
