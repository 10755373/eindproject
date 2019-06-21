function drawlinegraph(data_male, data_female, country) {

  if ( $('#containerlinegraph').is(':empty')){
    newlinegraph(data_male, data_female, country)
  }
  else{
    updatelinegraph(data_male, data_female, country)
  };

  function newlinegraph(data_male, data_female){

    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.5px";
    var lineStrokeHover = "3.5px";

    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = "0.25"
    var circleRadius = 3;
    var circleRadiusHover = 6;

    console.log(data_male)

    var margin = {top: 30, right: 20, bottom: 30, left: 20};

    var divsize = d3v5.select("#containerlinegraph").node().getBoundingClientRect();

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

    var svg_linegraph_container = d3v5.select("#containerlinegraph").append("svg")
        .attr("class", "svglinegraph")
        .attr("id", "svglinegraph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("id", "svg_linegraph_container")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    var color = d3v5.scaleOrdinal(d3v5.schemeCategory10);
    console.log(data_male)
    console.log(data_male.z)

    // draw line males
    svg_linegraph_container.append("path")
        .data([data_male])
        .attr("class", "line")
        .attr("id", "line_male")
        .attr("d", valueline)
        .attr("data-legend",function(d) { return d.x})
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .style('opacity', lineOpacity)
        .on("mouseover", function(d) {
            d3.selectAll('.line_male')
      					.style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
      					.style('opacity', circleOpacityOnLineHover);
            d3.select(this)
              .style('opacity', lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
          })
        .on("mouseout", function(d) {
            d3.selectAll(".line_male")
      					.style('opacity', lineOpacity);
            d3.selectAll('.circle')
      					.style('opacity', circleOpacity);
            d3.select(this)
              .style("stroke-width", lineStroke)
              .style("cursor", "none");
            })
        .on("mouseover", function(d, i) {
        svg_linegraph_container.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.z)
        .attr("text-anchor", "middle")
        .attr("x", (width-margin)/2)
        .attr("y", 5);
          })
        .on("mouseout", function() {
        svg_linegraph_container.select(".title-text").remove();
      });

    // svg_linegraph_container
    //     .append("text")
    //     .attr("id", "line-name-male")
    //     .data(labelmale(yearsmale, valuesmale))
    //     .attr("transform", function(d, i) {
    //       return "translate (" + x(labelmale.x) + "," +
    //              y(labelmale.y) + ")"; })
    //     .text("Males");

    // draw line females
    svg_linegraph_container.append("path")
        .data([data_female])
        .attr("class", "line")
        .attr("id", "line_female")
        .attr("d", valueline)
        .attr("data-legend",function(d) { return d.x})
        .attr("stroke", "pink")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .on("mouseover", function(d) {
            d3.selectAll('.line_female')
                .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
            		.style('opacity', circleOpacityOnLineHover);
            d3.select(this)
              .style('opacity', lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
          })
        .on("mouseout", function(d) {
            d3.selectAll(".line_female")
                .style('opacity', lineOpacity);
            d3.selectAll('.circle')
            		.style('opacity', circleOpacity);
            d3.select(this)
              .style("stroke-width", lineStroke)
              .style("cursor", "none");
            });
      //   .on("mouseover", function(d, i) {
      //   svg_linegraph_container.append("text")
      //   .attr("class", "title-text")
      //   // .style("fill", color(i))
      //   // .text(d.name)
      //   .attr("text-anchor", "middle")
      //   .attr("x", (width-margin)/2)
      //   .attr("y", 5);
      //     })
      //   .on("mouseout", function(d) {
      //   svg_linegraph_container.select(".title-text").remove();
      // });

    // svg_linegraph_container
    //     .append("text")
    //     .attr("id", "line-name-female")
    //     .data(labelfemale(yearsfemale, valuesfemale))
    //     .attr("transform", function(d, i) {
    //       return "translate (" + x(labelfemale.x) + "," +
    //              y(labelfemale.y) + ")"; })
    //     .text("Females");



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

    var margin = {top: 30, right: 20, bottom: 30, left: 20};

    var divsize = d3v5.select("#svglinegraph").node().getBoundingClientRect();

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

    var svg_linegraph_container = d3v5.select("#svglinegraph").transition();

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

// function labelmale(yearsmale, valuesmale){
//   var lastvaluemale = [yearsmale.slice(-1)[0], valuesmale.slice(-1)[0]];
//   list_linegraph_male_total = []
//   for (let i = 0; i < lastvaluemale.length; i++){
//       dict = {}
//       dict["x"] = lastvaluemale[i][0]
//       dict["y"] = lastvaluemale[i][1]
//       list_linegraph_male_total.push(dict)
// }
//   return list_linegraph_male_total
//   };
//
// function labelfemale(yearsfemale, valuesfemale){
//   var lastvaluefemale = [yearsfemale.slice(-1)[0], valuesfemale.slice(-1)[0]];
//   list_linegraph_female_total = []
//   for (let i = 0; i < lastvaluefemale.length; i++){
//       dict = {}
//       dict["x"] = lastvaluefemale[i][0]
//       dict["y"] = lastvaluefemale[i][1]
//       list_linegraph_female_total.push(dict)
// }
//   return list_linegraph_female_total
//   };


function lines(){
  var width = 500;
  var height = 300;
  var margin = 50;
  var duration = 250;

  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";

  var circleOpacity = '0.85';
  var circleOpacityOnLineHover = "0.25"
  var circleRadius = 3;
  var circleRadiusHover = 6;


  /* Format Data */
  var parseDate = d3.timeParse("%Y");
  data.forEach(function(d) {
    d.values.forEach(function(d) {
      d.x = parseDate(d.x);
      d.x = +d.y;
    });
  });


  /* Scale */
  var xScale = d3.scaleTime()
    .domain(d3.extent(data[0].values, d => d.x))
    .range([0, width-margin]);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data[0].values, d => d.y)])
    .range([height-margin, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  /* Add SVG */
  var svg = d3.select("#chart").append("svg")
    .attr("width", (width+margin)+"px")
    .attr("height", (height+margin)+"px")
    .append('g')
    .attr("transform", `translate(${margin}, ${margin})`);


  /* Add line into SVG */
  var line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  let lines = svg.append('g')
    .attr('class', 'lines');

  lines.selectAll('.line-group')
    .data(data).enter()
    .append('g')
    .attr('class', 'line-group')
    .on("mouseover", function(d, i) {
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", color(i))
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width-margin)/2)
          .attr("y", 5);
      })
    .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })
    .append('path')
    .attr('class', 'line')
    .attr('d', d => line(d.values))
    .style('stroke', (d, i) => color(i))
    .style('opacity', lineOpacity)
    .on("mouseover", function(d) {
        d3.selectAll('.line')
  					.style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle')
  					.style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
    .on("mouseout", function(d) {
        d3.selectAll(".line")
  					.style('opacity', lineOpacity);
        d3.selectAll('.circle')
  					.style('opacity', circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });


  /* Add circles in the line */
  lines.selectAll("circle-group")
    .data(data).enter()
    .append("g")
    .style("fill", (d, i) => color(i))
    .selectAll("circle")
    .data(d => d.values).enter()
    .append("g")
    .attr("class", "circle")
    .on("mouseover", function(d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.y}`)
          .attr("x", d => xScale(d.x) + 5)
          .attr("y", d => yScale(d.y) - 10);
      })
    .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", circleRadius)
    .style('opacity', circleOpacity)
    .on("mouseover", function(d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadiusHover);
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadius);
        });


  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale).ticks(5);
  var yAxis = d3.axisLeft(yScale).ticks(5);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr("y", 15)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text("Total values");
}
