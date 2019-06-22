function drawlinegraph(data_male, data_female, country, value, age) {

  if ( $('#containerlinegraph').is(':empty')){
    newlinegraph(data_male, data_female, country, value, age)
  }
  else{
    updatelinegraph(data_male, data_female, country, value, age)
  };

function newlinegraph(data_male, data_female, country, value, age){

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
    svg_linegraph_container.selectAll(".linemales")
        .data([data_male]).enter()
        .append("g")
        .attr("class", "line-males")
        .on("mouseover", function(i) {
        svg_linegraph_container.append("text")
        .attr("class", "title-text")
        .style("fill", "steelblue")
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



      // draw line females
      svg_linegraph_container.selectAll(".linefemales")
          .data([data_female]).enter()
          .append("g")
          .attr("class", "line-females")
          .on("mouseover", function(i) {
          svg_linegraph_container.append("text")
          .attr("class", "title-text")
          .style("fill", "pink")
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


    // svg_linegraph_container.selectAll("circle-male")
    //         .data([data_male]).enter()
    //         .append("g")
    //         .style("fill", "steelblue")
    //         .selectAll("circle")
    //         .data([data_male]).enter()
    //         .append("g")
    //         .attr("class", "circle")
    //         .on("mouseover", function(d) {
    //             d3v5.select(this)
    //               .style("cursor", "pointer")
    //               .append("text")
    //               .attr("class", "text")
    //               // .text(`${d.price}`)
    //               .attr("x", d => x(d.x) + 5)
    //               .attr("y", d => y(d.y) - 10);
    //           })
    //         .on("mouseout", function(d) {
    //             d3v5.select(this)
    //               .style("cursor", "none")
    //               .transition()
    //               .duration(duration)
    //               .selectAll(".text").remove();
    //           })
    //         .append("circle")
    //         .attr("cx", d => x(d.x))
    //         .attr("cy", d => y(d.y))
    //         .attr("r", circleRadius)
    //         .style('opacity', circleOpacity)
    //         .on("mouseover", function(d) {
    //               d3v5.select(this)
    //                 .transition()
    //                 .duration(duration)
    //                 .attr("r", circleRadiusHover);
    //             })
    //           .on("mouseout", function(d) {
    //               d3v5.select(this)
    //                 .transition()
    //                 .duration(duration)
    //                 .attr("r", circleRadius);
    //             });

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

  svg_linegraph_container.append("text")
      .attr("class", "titlelinegraph")
      .attr("id", "title")
      .attr("x", (width / 2))
      .attr("y", (margin.bottom / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style('fill', 'black')
      .text("Linegraph for " + [country] + " which shows " + [value] + " of suicides between " + [age]);


}

function updatelinegraph(data_male, data_female) {

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

    svg_linegraph_container.select(".maleline")
        .attr("d", valueline(data_male))

    svg_linegraph_container.select(".femaleline")
        .attr("d", valueline(data_female))


    svg_linegraph_container.select("#xaxis")
        .call(d3v5.axisBottom(x));

    svg_linegraph_container.select("#yaxisleft")
        .call(d3v5.axisLeft(y));

  svg_linegraph_container.select("text.titlelinegraph")
    .text("Linegraph for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

};
};
