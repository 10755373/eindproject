// call function to draw the scatterplot
function drawscatterplot(json, year, sex, age){

  // check if svg-container for the scatterplot is empty
  if( $('#containerscatterplot').is(':empty')){

    // in case it's empty, draw new scatterplot
    newscatterplot(json, year, sex, age)
  }
  else{

    // update existing scatterplot in case there has already a scatterplot has been drawn
    updatescatterplot(json, year, sex, age)
  }};

// make new scatterplot
function newscatterplot(json, year, sex, age){

  // append title to the svg
  var title = d3v5.select("#containerscatterplot")
        .append("text")
        .attr("class", "titlescatterplot")
        .attr("id", "title")
        .attr("x", (width / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style('fill', 'black')
        .style("text-decoration", "underline")
        .text("Scatterplot regarding suicides amongst " + [sex] + " between " + [age] + " in " + [year]);

  // retrieve sizes from the svg
  var divsize = d3v5.select("#containerscatterplot").node().getBoundingClientRect();

  // retrieve data for the scatterplot
  var data = retrievedata_scatter(json, year, sex, age)
  datascatter = Object.values(data)

  // determine width, height and margins
   var margin = {top: 20, right: 10, bottom: 40, left: 25};
   var width = divsize.width - margin.left - margin.right;
   var height = divsize.height - margin.top - margin.bottom;

   // append svg where scatterplot will be drawn in
   var svgscatterplot = d3v5.select("#containerscatterplot").append("svg")
               .attr("class", "svgscatterplot")
               .attr("id", "scatterplot")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .append("g")
                 .attr("id", "gscatterplot")
                 .attr("transform",
                       "translate(" + margin.left + "," + margin.top + ")");

  // determine scale x axis
   var scalex = d3v5.scaleLinear()
     .domain([d3v5.min(datascatter, function(d) { return d.no; }), d3v5.max(datascatter, function(d) { return d.no; })])
     .range([0, width]);

    // determine scale y axis
   var scaley = d3v5.scaleLinear()
     .domain([d3v5.min(datascatter, function(d) { return d.ratio; }), d3v5.max(datascatter, function(d) { return d.ratio; })])
     .range([height, 0]);

   // draw xaxis
   svgscatterplot.append("g")
       .attr("id", "xaxis")
       .attr("transform", "translate(0," + height + ")")
       .call(d3v5.axisBottom(scalex));

   // write xaxis label
   svgscatterplot.append("text")
       .attr("transform",
       "translate(" + (width - 10) + " ," +
                      (height) + ")")
       .style("text-anchor", "end")
       .attr("font-size", "10px")
       .text("Suicides no");

   // draw yaxis
   svgscatterplot.append("g")
       .attr("id", "yaxisleft")
       .call(d3v5.axisLeft(scaley));

   // write yaxis label
   svgscatterplot.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", -5)
       .attr("dy", "1.5em")
       .style("text-anchor", "end")
       .attr("font-size", "10px")
       .text("Suicides per 100K");

  // make tooltip for the scatterplot
 var div = d3v5.select("#gscatterplot").append("text")
     .attr("class", "tooltipscatter")
     .style("opacity", 0);

  // in case the gender (which is chosen in the dropdown) is female
  if (sex == "female"){

  // determine colors for the dots
  var paletteScale = d3v5.scaleSequential()
      .interpolator(d3v5.interpolatePuRd);
  }

  // in case the gender is male
  else{

    // determine colors for the dots
    var paletteScale = d3v5.scaleSequential()
        .interpolator(d3v5.interpolateBlues);
  }

  // determine min and max for the colors
  var paletteScale = paletteScale.domain([d3v5.min(datascatter, function(d) { return d.no; }), d3v5.max(datascatter, function(d) { return d.no; })])

 // draw colored dots in the scatterplot including an option for the tooltip
   var circles = svgscatterplot.selectAll('circle')
       .data(datascatter)
       .enter()
     .append('circle')
       .attr('cx',function (d) { return scalex(d.no) })
       .attr('cy',function (d) { return scaley(d.ratio) })
       .attr('r','3')
       .style("fill", function (d) { return paletteScale(d.no) })
       .attr('stroke','black')
       .attr('stroke-width',1)
       .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div .html(d.country + "<br/>")
          .attr("x", function () { return scalex(d.no + 1)})
          .attr("y", function () { return scaley(d.ratio) - 10});
        })
        .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
            });

   // append vertical gridlines on the x axis
   function make_x_gridlines() {
       return d3v5.axisBottom(scalex)
           .ticks(6)
   }

   // append horizontal gridlines on the y axis
   function make_y_gridlines() {
       return d3v5.axisLeft(scaley)
           .ticks(6)
   }

   // add the vertical grindlines
   svgscatterplot.append("g")
       .attr("class", "grid")
       .attr("transform", "translate(0," + height + ")")
       .call(make_x_gridlines()
           .tickSize(-height)
           .tickFormat("")
       )

   // add the horizontal gridlines
   svgscatterplot.append("g")
       .attr("class", "grid")
       .call(make_y_gridlines()
           .tickSize(-width)
           .tickFormat("")
       )
};

// function to update existing scatterplot
function updatescatterplot(json, year, sex, age){

  // retrieve sizes of the svg container
  var divsize = d3v5.select("#containerscatterplot").node().getBoundingClientRect();

  // select the svg container containing the scatterplot
  var svgscatterplot = d3v5.select("#containerscatterplot");

  // retrieve data for the scatterplot
  var data = retrievedata_scatter(json, year, sex, age)
  datascatter = Object.values(data)

  // determine width, height and margins
   var margin = {top: 20, right: 30, bottom: 40, left: 25};
   var width = divsize.width - margin.left - margin.right;
   var height = divsize.height - margin.top - margin.bottom;

   // determine scale x axis
   var scalex = d3v5.scaleLinear()
     .domain([d3v5.min(datascatter, function(d) { return d.no; }), d3v5.max(datascatter, function(d) { return d.no; })])
     .range([0, width]);

  // determine scale y axis
   var scaley = d3v5.scaleLinear()
     .domain([d3v5.min(datascatter, function(d) { return d.ratio; }), d3v5.max(datascatter, function(d) { return d.ratio; })])
     .range([height, 0]);

   // update values at the x axis
   svgscatterplot.select("#xaxis")
      .transition().duration(300)
       .call(d3v5.axisBottom(scalex));

   // update values at the y axis
   svgscatterplot.select("#yaxisleft")
      .transition().duration(300)
       .call(d3v5.axisLeft(scaley));

  // in case the gender (which is chosen in the dropdown) is female
   if (sex == "female"){

    // determine colors
   var paletteScale = d3v5.scaleSequential()
       .interpolator(d3v5.interpolatePuRd);
   }

   // in case chosen option is male
   else{

     // determine colors
     var paletteScale = d3v5.scaleSequential()
         .interpolator(d3v5.interpolateBlues);
   }

 // determine min and max for the colors
 var paletteScale = paletteScale.domain([d3v5.min(datascatter, function(d) { return d.no; }), d3v5.max(datascatter, function(d) { return d.no; })])

 // update existing dots in the scatterplot with new data and colors
 var circles = svgscatterplot.selectAll('circle')
     .data(datascatter)
     .transition()
     .duration(300)
     .attr('cx',function (d) { return scalex(d.no) })
     .attr('cy',function (d) { return scaley(d.ratio) })
     .style("fill", function (d) { return paletteScale(d.no) })
     .attr('r','3')
     .attr('stroke','black')
     .attr('stroke-width',1)

// update title above the scatterplot
 var title = d3v5.select("#containerscatterplot")
   title.select("text.titlescatterplot")
   .text("Scatterplot regarding suicides amongst " + [sex] + " between " + [age] + " in " + [year]);

};
