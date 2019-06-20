function drawscatterplot(json, year, sex, age){

  if( $('#container7').is(':empty')){
    newscatterplot(json, year, sex, age)
  }
  else{
    updatescatterplot(json, year, sex, age)
  }};


function newscatterplot(json, year, sex, age){
  console.log(year)
  // d3v5.select("#container7").selectAll("*").remove();

  var divsize = d3v5.select("#container7").node().getBoundingClientRect();

  var data = retrievedata_scatter(json, year, sex, age)
  // console.log(data)

  datascatter = Object.values(data)
  // console.log(datascatter)

   var margin = {top: 80, right: 30, bottom: 40, left: 50};
   var width = divsize.width - margin.left - margin.right;
   var height = divsize.height - margin.top - margin.bottom;

   var svgscatterplot = d3v5.select("#container7").append("svg")
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
       "translate(" + (width) + " ," +
                      (height + 30) + ")")
       .style("text-anchor", "end")
       .text("No of suicides");

   // draw yaxis
   svgscatterplot.append("g")
       .attr("id", "yaxisleft")
       .call(d3v5.axisLeft(scaley));
   // write yaxis label
   svgscatterplot.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", -50)
       // .attr("y", 6)
       .attr("dy", "1.5em")
       .style("text-anchor", "end")
       // .attr("font-size", "15px")
       .text("No of suicides per 100K");

  svgscatterplot.append("text")
      .attr("id", "title")
      .attr("x", (width / 2))
      .attr("y", (margin.bottom / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style('fill', 'darkOrange')
      .text("Scatterplot: no. of suicides of men and woman per country");

   var div = d3v5.select("#container7").append("div")
       .attr("class", "tooltipscatter")
       .style("opacity", 0);

 // Circles
   var circles = svgscatterplot.selectAll('circle')
       .data(datascatter)
       .enter()
     .append('circle')
       .attr('cx',function (d) { return scalex(d.no) })
       .attr('cy',function (d) { return scaley(d.ratio) })
       .attr('r','3')
       .attr('stroke','black')
       .attr('stroke-width',1)
       .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div .html(d.country + "<br/>")
            .style("left", (d3v5.event.pageX + 15) + "px")
            .style("top", (d3v5.event.pageY - 20) + "px");
        })
        .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
            });
       // .on("mouseover", mouseover)
       // .on("mousemove", mousemove)
       // .on("mouseleave", mouseleave)
       //
       // // create a tooltip
       // var Tooltip = d3.select("#container7")
       //   .append("div")
       //   .style("opacity", 0)
       //   .attr("class", "tooltip")
       //   .style("background-color", "white")
       //   .style("border", "solid")
       //   .style("border-width", "2px")
       //   .style("border-radius", "5px")
       //   .style("padding", "5px")
       //
       //   // Three function that change the tooltip when user hover / move / leave a cell
       //   var mouseover = function(d) {
       //     Tooltip
       //       .style("opacity", 1)
       //   }
       //   var mousemove = function(d) {
       //     Tooltip
       //       .html("Exact value: " + d.country)
       //       .style("left", (d3.mouse(this)[0]+70) + "px")
       //       .style("top", (d3.mouse(this)[1]) + "px")
       //   }
       //   var mouseleave = function(d) {
       //     Tooltip
       //       .style("opacity", 0)
       //   }



};

function updatescatterplot(json, year, sex, age){
  console.log(year)

  var divsize = d3v5.select("#container7").node().getBoundingClientRect();

  var svgscatterplot = d3v5.select("#container7")

  var data = retrievedata_scatter(json, year, sex, age)
  console.log(data)

  datascatter = Object.values(data)
  console.log(datascatter)

   var margin = {top: 80, right: 30, bottom: 40, left: 50};
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
       .call(d3v5.axisBottom(scalex));

   // // write xaxis label
   // svgscatterplot.append("text")
   //     .attr("transform",
   //     "translate(" + (width) + " ," +
   //                    (height + 30) + ")")
   //     .style("text-anchor", "end")
   //     .text("No of suicides");

   // draw yaxis
   svgscatterplot.select("#yaxisleft")
       .call(d3v5.axisLeft(scaley));

   // // write yaxis label
   // svgscatterplot.append("text")
   //     .attr("transform", "rotate(-90)")
   //     .attr("y", -50)
   //     // .attr("y", 6)
   //     .attr("dy", "1.5em")
   //     .style("text-anchor", "end")
   //     // .attr("font-size", "15px")
   //     .text("No of suicides per 100K");

  // svgscatterplot.append("text")
  //     .attr("id", "title")
  //     .attr("x", (width / 2))
  //     .attr("y", (margin.bottom / 2))
  //     .attr("text-anchor", "middle")
  //     .style("font-size", "18px")
  //     .style('fill', 'darkOrange')
  //     .text("Scatterplot: no. of suicides of men and woman per country");

   // var div = d3v5.select("#container7").append("div")
   //     .attr("class", "tooltipscatter")
   //     .style("opacity", 0);

 // Circles
   var circles = svgscatterplot.selectAll('circle')
       .data(datascatter)
       .transition()
       .duration(200)
       .attr('cx',function (d) { return scalex(d.no) })
       .attr('cy',function (d) { return scaley(d.ratio) })
       .attr('r','3')
       .attr('stroke','black')
       .attr('stroke-width',1)

};
