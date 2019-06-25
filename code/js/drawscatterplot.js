function drawscatterplot(json, year, sex, age){

  if( $('#containerscatterplot').is(':empty')){
    newscatterplot(json, year, sex, age)
  }
  else{
    updatescatterplot(json, year, sex, age)
  }};


function newscatterplot(json, year, sex, age){

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

  var divsize = d3v5.select("#containerscatterplot").node().getBoundingClientRect();

  var data = retrievedata_scatter(json, year, sex, age)

  datascatter = Object.values(data)

   var margin = {top: 20, right: 10, bottom: 40, left: 25};
   var width = divsize.width - margin.left - margin.right;
   var height = divsize.height - margin.top - margin.bottom;

   var svgscatterplot = d3v5.select("#containerscatterplot").append("svg")
               .attr("class", "svgscatterplot")
               .attr("id", "scatterplot")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .append("g")
                 .attr("id", "gscatterplot")
                 .attr("transform",
                       "translate(" + margin.left + "," + margin.top + ")");


   var scalex = d3v5.scaleLinear()
     .domain([d3v5.min(datascatter, function(d) { return d.no; }), d3v5.max(datascatter, function(d) { return d.no; })])
     .range([0, width]);

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
       // .attr("y", 6)
       .attr("dy", "1.5em")
       .style("text-anchor", "end")
       .attr("font-size", "10px")
       .text("Suicides per 100K");

   var div = d3v5.select("#gscatterplot").append("text")
       .attr("class", "tooltipscatter")
       .style("opacity", 0);


    if (sex == "female"){
    var paletteScale = d3v5.scaleSequential()
        // .domain([minValue, maxValue])
        // .range(["#b3b3ff", "#000066"]);
        .interpolator(d3v5.interpolatePuRd);
    }
    else{
      var paletteScale = d3v5.scaleSequential()
          // .domain([minValue, maxValue])
          // .range(["#b3b3ff", "#000066"]);
          .interpolator(d3v5.interpolateBlues);
    }
    var paletteScale = paletteScale.domain([d3v5.min(datascatter, function(d) { return d.ratio; }), d3v5.max(datascatter, function(d) { return d.ratio; })])

   // var paletteScale = d3.scale.linear()
   //         .domain([d3v5.min(datascatter, function(d) { return d.no; }), d3v5.max(datascatter, function(d) { return d.no; })])
   //         .range(["#99ccff", "#000099"]);

 // Circles
   var circles = svgscatterplot.selectAll('circle')
       .data(datascatter)
       .enter()
     .append('circle')
       .attr('cx',function (d) { return scalex(d.no) })
       .attr('cy',function (d) { return scaley(d.ratio) })
       .attr('r','3')
       .style("fill", function (d) { return paletteScale(d.ratio) })
       .attr('stroke','black')
       .attr('stroke-width',1)
       .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div .html(d.country + "<br/>")
          .attr("x", function () { return scalex(d.no + 1)})
          .attr("y", function () { return scaley(d.ratio) - 10});
            // .style("left", (d3v5.event.pageX + 15) + "px")
            // .style("top", (d3v5.event.pageY - 20) + "px");
        })
        .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
            });

       // gridlines in x axis function
       function make_x_gridlines() {
           return d3v5.axisBottom(scalex)
               .ticks(6)
       }

       // gridlines in y axis function
       function make_y_gridlines() {
           return d3v5.axisLeft(scaley)
               .ticks(6)
       }

       // add the X gridlines
       svgscatterplot.append("g")
           .attr("class", "grid")
           .attr("transform", "translate(0," + height + ")")
           .call(make_x_gridlines()
               .tickSize(-height)
               .tickFormat("")
           )

       // add the Y gridlines
       svgscatterplot.append("g")
           .attr("class", "grid")
           .call(make_y_gridlines()
               .tickSize(-width)
               .tickFormat("")
           )


};

function updatescatterplot(json, year, sex, age){

  var divsize = d3v5.select("#containerscatterplot").node().getBoundingClientRect();

  var svgscatterplot = d3v5.select("#containerscatterplot");

  var data = retrievedata_scatter(json, year, sex, age)

  datascatter = Object.values(data)

   var margin = {top: 20, right: 30, bottom: 40, left: 25};
   var width = divsize.width - margin.left - margin.right;
   var height = divsize.height - margin.top - margin.bottom;

   var scalex = d3v5.scaleLinear()
     .domain([d3v5.min(datascatter, function(d) { return d.no; }), d3v5.max(datascatter, function(d) { return d.no; })])
     .range([0, width]);

   var scaley = d3v5.scaleLinear()
     .domain([d3v5.min(datascatter, function(d) { return d.ratio; }), d3v5.max(datascatter, function(d) { return d.ratio; })])
     .range([height, 0]);

   // draw xaxis
   svgscatterplot.select("#xaxis")
      .transition().duration(300)
       .call(d3v5.axisBottom(scalex));

   // draw yaxis
   svgscatterplot.select("#yaxisleft")
      .transition().duration(300)
       .call(d3v5.axisLeft(scaley));

   // var paletteScale = d3.scale.linear()
   //         .domain([d3v5.min(datascatter, function(d) { return d.no; }), d3v5.max(datascatter, function(d) { return d.no; })])
   //         .range(["#99ccff", "#000099"]);
   if (sex == "female"){
   var paletteScale = d3v5.scaleSequential()
       // .domain([minValue, maxValue])
       // .range(["#b3b3ff", "#000066"]);
       .interpolator(d3v5.interpolatePuRd);
   }
   else{
     var paletteScale = d3v5.scaleSequential()
         // .domain([minValue, maxValue])
         // .range(["#b3b3ff", "#000066"]);
         .interpolator(d3v5.interpolateBlues);
   }
   var paletteScale = paletteScale.domain([d3v5.min(datascatter, function(d) { return d.ratio; }), d3v5.max(datascatter, function(d) { return d.ratio; })])
 // Circles
   var circles = svgscatterplot.selectAll('circle')
       .data(datascatter)
       .transition()
       .duration(300)
       .attr('cx',function (d) { return scalex(d.no) })
       .attr('cy',function (d) { return scaley(d.ratio) })
       .style("fill", function (d) { return paletteScale(d.ratio) })
       .attr('r','3')
       .attr('stroke','black')
       .attr('stroke-width',1)

 var title = d3v5.select("#containerscatterplot")
   title.select("text.titlescatterplot")
   .text("Scatterplot regarding suicides amongst " + [sex] + " between " + [age] + " in " + [year]);

};
