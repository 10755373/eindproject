// function to draw piechart and donut
function drawpiechart(data_pie, data_donut, country, value, age){

  // check if svg is empty
  if ( $('#containerpiechart').is(':empty')){

    // in case it's empty, draw new piechart and donut
    newpiedonut(data_pie, data_donut, country, value, age);
  }
  else{

    // update existing piechart and donut in case there has already a piechart and donut have been drawn
    updatepiedonut(data_pie, data_donut, country, value, age);
  }};

// make new pie and donut
function newpiedonut(data_pie, data_donut, country, value, age){

  // retrieve sizes svg and determine height, width and margins
  var divsize = d3v5.select("#containerpiechart").node().getBoundingClientRect();
  var margin = {top: 20, right: 30, bottom: 20, left: 20};
  var width = divsize.width - margin.left - margin.right;
  var height = divsize.height - margin.top - margin.bottom;

  // append svg with a title above the pie and donut
  var title = d3v5.select("#containerpiechart")
        .append("text")
        .attr("class", "titlepiechart")
        .attr("id", "title")
        .attr("x", (width / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style('fill', 'black')
        .style("text-decoration", "underline")
        .text("Piechart for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

  // append svg and g where pie and donut will be drawn in
  var svgpiechart = d3v5.select("#containerpiechart").append("svg")
          .attr("class", "classpiechart")
          .attr("id", "piechart")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("id", "gpiechart")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // determine colors
  var colors = d3v5.scaleOrdinal()
          .domain(["male", "female"])
          .range(["steelblue", "#ff55aa"]);

  // append div for tooltip
  var div = d3v5.select("body").append("div")
          .attr("class", "tooltippiechart")
          .style("opacity", 0);

  // determine the values
  var pie = d3v5.pie()
          .value(function(d) {return d.value; });

  // transform data pie into useful data for the piechart
  var data_ready_pie = pie(d3v5.entries(data_pie));

  // transform donut pie into useful data for the donut
  var data_ready_donut = pie(d3v5.entries(data_donut));

  // make arc generator for piechart
  const arcGenerator = d3v5.arc()
          .innerRadius(0)
          .outerRadius(120);

  // make arc generator for donut
  const generatorarc = d3v5.arc()
          .innerRadius(125)
          .outerRadius(170);

// append g for piechart with right data
 var pie = svgpiechart.selectAll("arcpie")
     .data(data_ready_pie)
     .enter().append("g")
     .attr("class", "arc")
     .attr("id", "arcpie")
     .attr("stroke", "black")
     .style("stroke-width", "1px")
     .style("opacity", 0.7)

// append path for piechart including an option for the tooltip
 pie.append("path")
      .attr("class", "classpath")
     .attr("d", arcGenerator)
     .style("fill", function(d) { return colors(d.data.key);})
     .on("mouseover", function(d) {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div .html(d.data.value + "<br/>")
          .style("left", (d3v5.event.pageX + 15) + "px")
          .style("top", (d3v5.event.pageY - 20) + "px");
      })
      .on("mouseout", function(d) {
      div.transition()
          .duration(200)
          .style("opacity", 0);
          });
   pie.append("text")
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 16);

  // append g with right data for donut
 var donut = svgpiechart.selectAll("arcpie2")
     .data(data_ready_donut)
     .enter().append("g")
     .attr("class", "arcs")
     .attr("id", "arcsdonut")
     .attr("stroke", "black")
     .style("stroke-width", "1px")
     .style("opacity", 0.7);

  // append path for donut including an option for the tooltip
 donut.append("path")
      .attr("class", "classpath2")
     .attr("d", generatorarc)
     .attr("data-legend", function(d){return d.data.key})
     .style("fill", function(d) { return colors(d.data.key);})
     .on("mouseover", function(d) {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div .html(d.data.value + "<br/>")
          .style("left", (d3v5.event.pageX + 15) + "px")
          .style("top", (d3v5.event.pageY - 20) + "px");
      })
      .on("mouseout", function(d) {
      div.transition()
          .duration(200)
          .style("opacity", 0);
          });

  // append legend to the svg which will be placed to the right of the visualization
  legend = svgpiechart.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(200,30)")
            .style("font-size", "12px")
            .call(d3.legend);

  };

// update function for piechart as well as donut
function updatepiedonut(data_pie, data_donut, country, value, age){

  // determine the values
  var pie = d3v5.pie()
    .value(function(d) {return d.value; })

  // transform the pie data into useful data for the piechart
  var data_ready_pie = pie(d3v5.entries(data_pie))

  // select the container containing the piechart
  var piesvg = d3v5.select("#containerpiechart")

  // update existing piechart with the new data
  pathpie = piesvg.selectAll(".classpath").data(data_ready_pie);
  pathpie.transition().delay(500).duration(1500).attrTween("d", arcTween);

  // transform dnut data into useful data for the donut
  var data_ready_donut = pie(d3v5.entries(data_donut));

  // select the container containing the donut
  var piesvg = d3v5.select("#containerpiechart");

  // update existing donut with the new data
  pathdonut = piesvg.selectAll(".classpath2").data(data_ready_donut);
  pathdonut.transition().delay(500).duration(1500).attrTween("d", arc2Tween);

  // change the title above the piechart and donut
  var title = d3v5.select("#containerpiechart")
    title.select("text.titlepiechart")
    .text("Piechart for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

}

// function to determine the arcs regarding the piechart
function arcTween(a) {

  // determine both the innerradius as well as the outerradius
    var arcGenerator = d3v5.arc()
      .innerRadius(0)
      .outerRadius(120)

  // do update
    const i = d3v5.interpolate(this._current, a);
    this._current = i(0);
      return function(t) {
    return arcGenerator(i(t));
    };
    }

// function to determine the arcs regarding the donut
function arc2Tween(a) {

  // determine both the innerradius as well as the outerradius
  var arcGenerator = d3v5.arc()
    .innerRadius(125)
    .outerRadius(170)

  // do update
  const i = d3v5.interpolate(this._current, a);
  this._current = i(0);
    return function(t) {
  return arcGenerator(i(t));
  };
}
