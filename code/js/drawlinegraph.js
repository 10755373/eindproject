function drawlinegraph(data_male, data_female, country) {

  if ( $('#container2').is(':empty')){
    newlinegraph(data_male, data_female, country)
  }
  else{
    updatelinegraph(data_male, data_female, country)
  };

  function newlinegraph(data_male, data_female){

    console.log(data_male)

    var margin = {top: 120, right: 70, bottom: 70, left: 70};

    var divsize = d3v5.select("#container2").node().getBoundingClientRect();

    // var ageoptions = ["5-14 years", "15-24 years", "25-34 years", "35-54 years", "55-74 years", "75+ years"];
    //
    // // add the options to the button
    // d3v5.select("#selectButton")
    //     .selectAll('myOptions')
    //    	.data(ageoptions)
    //     .enter()
    //   	.append('option')
    //     .text(function (d) { return d; }) // text showed in the menu
    //     .attr("value", function (d) { return d; }) // corresponding value returned by the button

    var parseTime = d3v5.timeParse("%Y")

    // width and height of graph in pixels
    var width = divsize.width - margin.left - margin.right;
    var height = divsize.height - margin.top - margin.bottom;

    // set the ranges
    var x = d3v5.scaleTime().range([0, (width - margin.right)]);
    var y = d3v5.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3v5.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    yearsmale = []
    valuesmale = []
    data_male.forEach(function(d) {
        d.x = parseTime(d.x);
        yearsmale.push(d.x);
        valuesmale.push(d.y);
        d.y = +d.y;
    });
    yearsfemale = []
    valuesfemale = []
    data_female.forEach(function(d) {
        d.x = parseTime(d.x);
        yearsfemale.push(d.x);
        valuesfemale.push(d.y);
        d.y = +d.y;
    });

    var maxmale = d3v5.max(data_male, function(d) {return d.y})
    var maxfemale = d3v5.max(data_female, function(d) {return d.y})
    if (maxmale > maxfemale){
      x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
      y.domain([0, d3v5.max(data_male, function(d) { return d.y; })]);
    }
    else{
      x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
      y.domain([0, d3v5.max(data_female, function(d) { return d.y; })]);
    }

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
        .data([data_male])
        .attr("class", "line")
        .attr("id", "line_male")
        .attr("d", valueline)
        .attr("data-legend",function(d) { return d.x})
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2px")
        .attr("fill", "none");
        
    svg_linegraph_container
        .append("text")
        .attr("id", "line-name-male")
        .data(labelmale(yearsmale, valuesmale))
        .attr("transform", function(d, i) {
          return "translate (" + x(labelmale.x) + "," +
                 y(labelmale.y) + ")"; })
        .text("Males");
    // draw line females
    svg_linegraph_container.append("path")
        .data([data_female])
        .attr("class", "line")
        .attr("id", "line_female")
        .attr("d", valueline)
        .attr("data-legend",function(d) { return d.x})
        .attr("stroke", "pink")
        .attr("stroke-width", "2px")
        .attr("fill", "none");

    svg_linegraph_container
        .append("text")
        .attr("id", "line-name-female")
        .data(labelfemale(yearsfemale, valuesfemale))
        .attr("transform", function(d, i) {
          return "translate (" + x(labelfemale.x) + "," +
                 y(labelfemale.y) + ")"; })
        .text("Females");
    // // draw line gdp
    // svg_linegraph_container.append("path")
    //     .data([0])
    //     .attr("class", "line")
    //     .attr("id", "gdpline")
    //     .attr("d", gdpline)
    //     // .attr("data-legend",function(d) { return d.x})
    //     .attr("stroke", "#27FF00")
    //     .attr("stroke-width", "2px")
    //     .attr("fill", "none");
    // draw xaxis
    svg_linegraph_container.append("g")
        .attr("id", "xaxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3v5.axisBottom(x));
    // write xaxis label
    svg_linegraph_container.append("text")
        .attr("transform",
        "translate(" + (width - margin.right) + " ," +
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
    //
    // var parseTime = d3v5.timeParse("%Y")
    //
    // // define the line
    // var gdpline = d3v5.line()
    //     .x(function(d) { return x(d.x); })
    //     .y(function(d) { return y(d.y); });
    //
    // // // draw line males
    // // svg_linegraph.append("path")
    // //     // .data([gdp_per_capita])
    // //     .attr("class", "line")
    // //     .attr("id", "line_male")
    // //     // .attr("d", gdpline)
    // //     // .attr("data-legend",function(d) { return d.x})
    // //     .attr("stroke", "#27FF00")
    // //     .attr("stroke-width", "2px")
    // //     .attr("fill", "none");
    //
    // // draw yaxis right side of the graph
    // svg_linegraph_container.append("g")
    //     .attr("id", "yaxisright")
    //     .attr("transform", "translate(" + width + " ,0)")
    //     .call(d3v5.axisRight(y));
    // // write yaxis label rightside
    // svg_linegraph_container.append("text")
    //     .attr("transform", "rotate(-90)")
    //     // .attr("transform", "translate(" + width + " ,0)")
    //     .attr("y", width)
    //     // .attr("y", 6)
    //     .attr("dy", "1.5em")
    //     .style("text-anchor", "end")
    //     // .attr("font-size", "15px")
    //     .text("GDP per capita");
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

    // gridlines in x axis function
    function make_x_gridlines() {
        return d3v5.axisBottom(x)
            .ticks(7)
    }

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3v5.axisLeft(y)
            .ticks(7)
    }

    // add the X gridlines
    svg_linegraph_container.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )

    // add the Y gridlines
    svg_linegraph_container.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize((-width + margin.right))
            .tickFormat("")
        )

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
    .text("No. of suicides and GDP per capita for: ", country);

}

function updatelinegraph(data_male, data_female) {


    console.log(data_female)

    var margin = {top: 120, right: 70, bottom: 70, left: 70};

    var divsize = d3v5.select("#container2").node().getBoundingClientRect();

    var parseTime = d3v5.timeParse("%Y")

    var width = divsize.width - margin.left - margin.right;
    var height = divsize.height - margin.top - margin.bottom;

    var x = d3v5.scaleTime().range([0, (width - margin.right)]);
    var y = d3v5.scaleLinear().range([height, 0]);

    var valueline = d3v5.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    yearsmale = []
    valuesmale = []
    data_male.forEach(function(d) {
        d.x = parseTime(d.x);
        yearsmale.push(d.x);
        valuesmale.push(d.y);
        d.y = +d.y;
    });
    yearsfemale = []
    valuesfemale = []
    data_female.forEach(function(d) {
        d.x = parseTime(d.x);
        yearsfemale.push(d.x);
        valuesfemale.push(d.y);
        d.y = +d.y;
    });

    var maxmale = d3v5.max(data_male, function(d) {return d.y})
    var maxfemale = d3v5.max(data_female, function(d) {return d.y})
    if (maxmale > maxfemale){
      x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
      y.domain([0, d3v5.max(data_male, function(d) { return d.y; })]);
    }
    else{
      x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
      y.domain([0, d3v5.max(data_female, function(d) { return d.y; })]);
    }

    var svg_linegraph_container = d3v5.select("#container2").transition();

    var lastvaluemale = [yearsmale.slice(-1)[0], valuesmale.slice(-1)[0]];
    console.log(lastvaluemale)

    // svg_linegraph_container
    //   .append("text")
    //   .attr("id", "line-name")
    //   .data(lineData[key])
    //   .attr("transform", function(d, i) {
    //     return "translate (" + x(lastvaluemale[0]) + "," +
    //            y(lastvaluemale[1]) + ")"; })
    //   .text("Males");


    svg_linegraph_container.select("#line_male")
        // .data([data_male])
        .attr("d", valueline(data_male))
        // .append("text")
        // // .attr("id", "line-name-male")
        // .data(labelmale(yearsmale, valuesmale))
        // .attr("transform", function(d, i) {
        //   return "translate (" + x(labelmale.x) + "," +
        //          y(labelmale.y) + ")"; })
        // .text("Males");
    //
    var lastvaluefemale = [yearsfemale.slice(-1)[0], valuesfemale.slice(-1)[0]];
    console.log(lastvaluefemale)
    console.log(data_female)
    // svg_linegraph_container.append("text")
    //   .attr("id", "line-name")
    //   .data(lineData[key])
    //   .attr("transform", function(d, i) {
    //     return "translate (" + x(lastvaluefemale[0]) + "," +
    //            y(lastvaluefemale[1]) + ")"; })
    //   .text("Females");

    svg_linegraph_container.select("#line_female")
        // .data([data_female])
        .attr("d", valueline(data_female))
        // .append("text")
        //   .attr("id", "line-name-female")
        //   .data(labelfemale(yearsfemale, valuesfemale))
        //   .attr("transform", function(d, i) {
        //     return "translate (" + x(labelfemale.x) + "," +
        //            y(labelfemale.y) + ")"; })
        //   .text("Females");
        // .attr("data-legend",function(d) { return d.x})
        // .attr("stroke", "pink")
        // .attr("stroke-width", "2px")
        // .attr("fill", "none")
        // .append("text")
        //   .attr("id", "line-name")
        //   .attr("transform", function(d, i) {
        //     return "translate (" + x(lastvaluefemale[0]) + "," +
        //            y(lastvaluefemale[1]) + ")"; })
        //   .text("Females");

    svg_linegraph_container.select("#xaxis")
        .call(d3v5.axisBottom(x));
    // svg_linegraph_container.append("text")
    //     .attr("transform",
    //     "translate(" + (width) + " ," +
    //                    (height + 50) + ")")
    //     .style("text-anchor", "end")
    //     .text("Year");
    svg_linegraph_container.select("#yaxisleft")
        .call(d3v5.axisLeft(y));
    // svg_linegraph_container.append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 0 - margin.left)
    //     .attr("dy", "1.5em")
    //     .style("text-anchor", "end")
    //     .text("No of suicides");

    //     // update title
    document.getElementById("titlelinegraph").innerHTML = "Numbers female and male for: <br>" + country;

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
};
};

function labelmale(yearsmale, valuesmale){
  var lastvaluemale = [yearsmale.slice(-1)[0], valuesmale.slice(-1)[0]];
  list_linegraph_male_total = []
  for (let i = 0; i < lastvaluemale.length; i++){
      dict = {}
      dict["x"] = lastvaluemale[i][0]
      dict["y"] = lastvaluemale[i][1]
      list_linegraph_male_total.push(dict)
}
  return list_linegraph_male_total
  };

function labelfemale(yearsfemale, valuesfemale){
  var lastvaluefemale = [yearsfemale.slice(-1)[0], valuesfemale.slice(-1)[0]];
  list_linegraph_female_total = []
  for (let i = 0; i < lastvaluefemale.length; i++){
      dict = {}
      dict["x"] = lastvaluefemale[i][0]
      dict["y"] = lastvaluefemale[i][1]
      list_linegraph_female_total.push(dict)
}
  return list_linegraph_female_total
  };
