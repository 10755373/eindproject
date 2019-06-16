function initializelinegraph() {

    var margin = {top: 120, right: 70, bottom: 70, left: 70};

    var divsize = d3v5.select("#container2").node().getBoundingClientRect();

    var allGroup = ["5-14 years", "15-24 years", "25-34 years", "35-54 years", "55-74 years", "75+ years"];

    // add the options to the button
    d3v5.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // width and height of graph in pixels
    var width = divsize.width - margin.left - margin.right;
    var height = divsize.height - margin.top - margin.bottom;

    // set the ranges
    var x = d3v5.scaleTime().range([0, width]);
    var y = d3v5.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3v5.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    var svg_linegraph_container = d3v5.select("#container2").append("svg")
        .attr("class", "svglinegraph")
        .attr("id", "svglinegraph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("id", "svg_linegraph_container")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // draw line males
    svg_linegraph_container.append("path")
        .data([0])
        .attr("class", "line")
        .attr("id", "line_male")
        // .attr("d", valueline)
        // .attr("data-legend",function(d) { return d.x})
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2px")
        .attr("fill", "none");
    // draw line females
    svg_linegraph_container.append("path")
        .data([0])
        .attr("class", "line")
        .attr("id", "line_female")
        // .attr("d", valueline)
        // .attr("data-legend",function(d) { return d.x})
        .attr("stroke", "pink")
        .attr("stroke-width", "2px")
        .attr("fill", "none");
    // draw line gdp
    svg_linegraph_container.append("path")
        .data([0])
        .attr("class", "line")
        .attr("id", "gdpline")
        .attr("d", gdpline)
        // .attr("data-legend",function(d) { return d.x})
        .attr("stroke", "#27FF00")
        .attr("stroke-width", "2px")
        .attr("fill", "none");
    // draw xaxis
    svg_linegraph_container.append("g")
        .attr("id", "xaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3v5.axisBottom(x));
    // write xaxis label
    svg_linegraph_container.append("text")
        .attr("transform",
        "translate(" + (width) + " ," +
                       (height + 50) + ")")
        .style("text-anchor", "end")
        .text("Year");
    // draw yaxis
    svg_linegraph_container.append("g")
        .attr("id", "yaxisleft")
        .call(d3v5.axisLeft(y));
    // write yaxis label
    svg_linegraph_container.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        // .attr("y", 6)
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        // .attr("font-size", "15px")
        .text("No of suicides");

    var parseTime = d3v5.timeParse("%Y")

    // define the line
    var gdpline = d3v5.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    // // draw line males
    // svg_linegraph.append("path")
    //     // .data([gdp_per_capita])
    //     .attr("class", "line")
    //     .attr("id", "line_male")
    //     // .attr("d", gdpline)
    //     // .attr("data-legend",function(d) { return d.x})
    //     .attr("stroke", "#27FF00")
    //     .attr("stroke-width", "2px")
    //     .attr("fill", "none");

    // draw yaxis right side of the graph
    svg_linegraph_container.append("g")
        .attr("id", "yaxisright")
        .attr("transform", "translate(" + width + " ,0)")
        .call(d3v5.axisRight(y));
    // write yaxis label rightside
    svg_linegraph_container.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", width)
        // .attr("y", 6)
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        // .attr("font-size", "15px")
        .text("GDP per capita");
    // // append svg or the legend
    // var linegraphlegendsvg = d3v5.select("#svglinegraph").append("svg")
    //       .attr("id", "linegraphlegendsvg")
    //       .attr("height", height + margin.top + margin.bottom)
    //       .attr("width", width + margin.left + margin.right).append("g")
    //       .attr("id", "legendlinegraphcontainer")
    //       .attr("transform", "translate(" + width + "," + 0 + ")");
    // // make container for the legend
    // var legendlinegraphcontainer = linegraphlegendsvg.append("g")
    // .attr("font-family", "sans-serif")
    // .attr("font-size", 10)
    // .attr("text-anchor", "front");
    // make title for line chart
    var titlelinegraph = svg_linegraph_container.append("g")
    .attr("id", "titlelinegraph");
    // add initial title to line chart
    titlelinegraph
    .append("text")
    .attr("x", (width / 2))
    .attr("y", top)
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("No. of suicides and GDP per capita");

};
