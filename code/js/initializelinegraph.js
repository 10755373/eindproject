function drawlinegraph() {

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

};
