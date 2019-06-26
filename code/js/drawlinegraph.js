// function to draw the linegraph
function drawlinegraph(data_male, data_female, country, value, age) {

  // check if svg-container for the linegraph is empty
  if ( $('#containerlinegraph').is(':empty')){

    // in case it's empty, draw new linegraph
    newlinegraph(data_male, data_female, country, value, age)
  }
  else{

    // update existing linegraph in case there has already a linegraph been drawn
    updatelinegraph(data_male, data_female, country, value, age)
  };

// draw new linegraph
function newlinegraph(data_male, data_female, country, value, age){

  // determine values to have make good looking lines
  var duration = 250;
  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "3.5px";

  // append a svg to the linegraph-container which shows a title above the linegraph
  var title = d3v5.select("#containerlinegraph")
        .append("text")
        .attr("class", "titlelinegraph")
        .attr("id", "title")
        .attr("x", (width / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style('fill', 'black')
        .style("text-decoration", "underline")
        .text("Linegraph for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

  // retrieve sizes from the svg-container in which the linegraph will be drawn
  var divsize = d3v5.select("#containerlinegraph").node().getBoundingClientRect();

  // determine width, height and margins
  var margin = {top: 30, right: 20, bottom: 30, left: 60};
  var width = divsize.width - margin.left - margin.right;
  var height = divsize.height - margin.top - margin.bottom;

  // set the scale for both the x axis as well as y axis
  var x = d3v5.scaleTime().range([0, (width - margin.right)]);
  var y = d3v5.scaleLinear().range([height, 0]);

  // parse time in a year-format
  var parseTime = d3v5.timeParse("%Y")

  // determine points in the linegraph where lines will be eventually drawn between
  var valueline = d3v5.line()
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); });

  // get all the years for the male-data
  yearsmale = []

  // get all the values for the male-data
  valuesmale = []

  // for every male-data, transform data into years and push both the years as well as the value to two lists
  data_male.forEach(function(d) {
      d.x = parseTime(d.x);
      yearsmale.push(d.x);
      valuesmale.push(d.y);
      d.y = +d.y;
  });

  // get all the years for the female-data
  yearsfemale = []

  // get all the values for the female-data
  valuesfemale = []

  // for every male-data, transform data into years and push both the years as well as the value to two lists
  data_female.forEach(function(d) {
      d.x = parseTime(d.x);
      yearsfemale.push(d.x);
      valuesfemale.push(d.y);
      d.y = +d.y;
  });

  // determine max values for both the males as well as females
  var maxmale = d3v5.max(data_male, function(d) {return d.y})
  var maxfemale = d3v5.max(data_female, function(d) {return d.y})

  // in case highest value is one form the males
  if (maxmale > maxfemale){

    // determine domain x axis and y axis
    x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
    y.domain([0, d3v5.max(data_male, function(d) { return d.y; })]);
  }

  // in case highest value is one from the females
  else{

    // determine domain x axis and y axis
    x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
    y.domain([0, d3v5.max(data_female, function(d) { return d.y; })]);
  }

  // append svg to the linegraph-container where the linegraph will be drawn in
  var svg_linegraph_container = d3v5.select("#containerlinegraph").append("svg")
      .attr("class", "svglinegraph")
      .attr("id", "svglinegraph")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("id", "svg_linegraph_container")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // draw line males including an option for opacity and text "Males" above the linegraph when mouse is being hold on the line
  svg_linegraph_container.selectAll(".linemales")
      .data([data_male]).enter()
      .append("g")
      .attr("class", "line-males")
      .on("mouseover", function(i) {
      svg_linegraph_container.append("text")
      .attr("class", "title-text")
      .style("fill", "steelblue")
      .style("font-size", "15px")
      .text("Male")
      .attr("text-anchor", "middle")
      .attr("x", width/2)
      .attr("y", 40);
        })
      .on("mouseout", function() {
      svg_linegraph_container.select(".title-text").remove();
      })
      .append("path")
      .attr("class", "maleline")
      .attr("d", valueline)
      .attr("stroke", function(d) { return d.x})
      .attr("stroke", "steelblue")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
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
          });

  // draw line males including an option for opacity and text "Males" above the linegraph when mouse is being hold on the line
  svg_linegraph_container.selectAll(".linefemales")
      .data([data_female]).enter()
      .append("g")
      .attr("class", "line-females")
      .on("mouseover", function(i) {
      svg_linegraph_container.append("text")
      .attr("class", "title-text")
      .style("fill", "#ff55aa")
      .style("font-size", "15px")
      .text("Female")
      .attr("text-anchor", "middle")
      .attr("x", width/2)
      .attr("y", 40);
        })
      .on("mouseout", function() {
      svg_linegraph_container.select(".title-text").remove();
      })
      .append("path")
      .attr("class", "femaleline")
      .attr("d", valueline)
      .attr("stroke", function(d) { return d.x})
      .attr("stroke", "#ff55aa")
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

  // draw x axis
  svg_linegraph_container.append("g")
      .attr("id", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3v5.axisBottom(x));

  // write label for xaxis
  svg_linegraph_container.append("text")
      .attr("transform",
      "translate(" + (width - margin.right) + " ," +
                     (height - 10) + ")")
      .style("text-anchor", "end")
      .attr("font-size", "10px")
      .text("Year");

  // draw y axis
  svg_linegraph_container.append("g")
      .attr("id", "yaxisleft")
      .call(d3v5.axisLeft(y));

  // write label yaxis label
  svg_linegraph_container.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5)
      .attr("dy", "1.5em")
      .attr("id", "labelyaxis")
      .style("text-anchor", "end")
      .attr("font-size", "10px")
      .text([value] + " of suicides");

  // determine veritcal gridlines
  function make_x_gridlines() {
      return d3v5.axisBottom(x)
          .ticks(7);
  }

  // determine horizontal gridlines
  function make_y_gridlines() {
      return d3v5.axisLeft(y)
          .ticks(7);
  }

  // add the vertical gridlines
  svg_linegraph_container.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("");
      )

  // add the horizontal gridlines
  svg_linegraph_container.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize((-width + margin.right))
          .tickFormat("");
      )
};

// update existing linegraph
function updatelinegraph(data_male, data_female) {

  // retrieve sizes form the linegraph-container
  var divsize = d3v5.select("#containerlinegraph").node().getBoundingClientRect();

  // determine width, height and margins
  var margin = {top: 30, right: 20, bottom: 30, left: 60};
  var width = divsize.width - margin.left - margin.right;
  var height = divsize.height - margin.top - margin.bottom;

  // parse time in a year-format
  var parseTime = d3v5.timeParse("%Y")

  // determine scale for both the x axis as well as the y axis
  var x = d3v5.scaleTime().range([0, (width - margin.right)]);
  var y = d3v5.scaleLinear().range([height, 0]);

  // determine points in the linegraph where lines will be eventually drawn between
  var valueline = d3v5.line()
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); });

  // get all the years for the male-data
  yearsmale = []

  // get all the values for the male-data
  valuesmale = []

  // for every male-data, transform data into years and push both the years as well as the value to two lists
  data_male.forEach(function(d) {
      d.x = parseTime(d.x);
      yearsmale.push(d.x);
      valuesmale.push(d.y);
      d.y = +d.y;
  });

  // get all the years for the female-data
  yearsfemale = []

  // get all the values for the female-data
  valuesfemale = []

  // for every male-data, transform data into years and push both the years as well as the value to two lists
  data_female.forEach(function(d) {
      d.x = parseTime(d.x);
      yearsfemale.push(d.x);
      valuesfemale.push(d.y);
      d.y = +d.y;
  });

  // determine max values for both the males as well as females
  var maxmale = d3v5.max(data_male, function(d) {return d.y})
  var maxfemale = d3v5.max(data_female, function(d) {return d.y})

  // in case highest value is one form the males
  if (maxmale > maxfemale){

    // determine domain x axis and y axis
    x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
    y.domain([0, d3v5.max(data_male, function(d) { return d.y; })]);
  }

  // in case highest value is one from the females
  else{

    // determine domain x axis and y axis
    x.domain(d3v5.extent(data_male, function(d) { return d.x; }));
    y.domain([0, d3v5.max(data_female, function(d) { return d.y; })]);
  }

  // get container containing the linegraph
  var svg_linegraph_container = d3v5.select("#svg_linegraph_container");

  // update the line ragarding males
  svg_linegraph_container.select(".maleline").transition().duration(1000)
      .attr("d", valueline(data_male))

  // update the line ragarding females
  svg_linegraph_container.select(".femaleline").transition().duration(1000)
      .attr("d", valueline(data_female))

  // update values at the x axis
  svg_linegraph_container.select("#xaxis")
      .call(d3v5.axisBottom(x));

  // update values at the y axis
  svg_linegraph_container.select("#yaxisleft").transition().duration(1000)
      .call(d3v5.axisLeft(y));

  // update label at the y axis
  svg_linegraph_container.select("#labelyaxis").transition().duration(1000)
      .text([value] + " of suicides")

  // update the title above the linegraph
  var title = d3v5.select("#containerlinegraph")
    title.select("text.titlelinegraph")
    .text("Linegraph for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

};
};
