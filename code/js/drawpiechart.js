// check if there's alread a visual in the container
function drawpiechart(data_pie, data_donut, country, value, age){
  // make new one in case it's empty
  if ( $('#containerpiechart').is(':empty')){
    newpiedonut(data_pie, data_donut, country, value, age)
  }
  // update existing one in case it's already filled
  else{
    updatepiedonut(data_pie, data_donut, country, value, age)
  }};

// make new pie and donut
function newpiedonut(data_pie, data_donut, country, value, age){
  // retrieve sizes svg
  var divsize = d3v5.select("#containerpiechart").node().getBoundingClientRect();
  var margin = {top: 20, right: 30, bottom: 20, left: 20};
  var width = divsize.width - margin.left - margin.right;
  var height = divsize.height - margin.top - margin.bottom;
  radius = Math.min(width, height) / 2;

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

  // var radius = Math.min(width, height) / 2 - margin
  // append svg and g
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

// var tooltip = d3.tip()
//                 .attr("class", "d3-tip")
//                 .html(function(d){
//                   key = d.data.key
//                   value = d.data.value
//                   return key + "; " + value
//                 })
//   svgpiechart.call(tooltip)

  // var tool_tip = d3.tip()
  // .attr("class", "d3-tip")
  // .offset([-8, 0])
  // .html(function(d) { return "Radius: " + d; });
  // svgpiechart.call(tool_tip);

  // determine values
  var pie = d3v5.pie()
          .value(function(d) {return d.value; })
  // determine pie values
  var data_ready_pie = pie(d3v5.entries(data_pie))
  // make arc generator for piechart
  const arcGenerator = d3v5.arc()
          .innerRadius(0)
          .outerRadius(120)
  // make arc generator for donut
  const generatorarc = d3v5.arc()
          .innerRadius(125)
          .outerRadius(170)
  // determine donut values
  var data_ready_donut = pie(d3v5.entries(data_donut))

  // var div = d3v5.select(".gpiechart").append("div")
  //    .attr("class", "tooltippiechart")
  //    .style("opacity", 0);

// append g for piechart with right data
 var pie = svgpiechart.selectAll("arcpie")
     .data(data_ready_pie)
     .enter().append("g")
     .attr("class", "arc")
     .attr("id", "arcpie")
     .attr("stroke", "black")
     .style("stroke-width", "1px")
     .style("opacity", 0.7)
// append path for piechart
 pie.append("path")
      .attr("class", "classpath")
     .attr("d", arcGenerator)
     .style("fill", function(d) { return colors(d.data.key);})
     .on("mouseover", function(d) {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div .html(d.data.value + "<br/>")
          // .attr("x", function () { return scalex(d.no + 1)})
          // .attr("y", function () { return scaley(d.ratio) - 10});
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
      // .text(function(d){ return d.data.key })
      .style("text-anchor", "middle")
      .style("font-size", 16)

    // append g with right data for donut
   var donut = svgpiechart.selectAll("arcpie2")
       .data(data_ready_donut)
       .enter().append("g")
       .attr("class", "arcs")
       .attr("id", "arcsdonut")
       .attr("stroke", "black")
       .style("stroke-width", "1px")
       .style("opacity", 0.7)
    // append path for donut
   donut.append("path")
        .attr("class", "classpath2")
       .attr("d", generatorarc)
       .style("fill", function(d) { return colors(d.data.key);})
       .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div .html(d.data.value + "<br/>")
            // .attr("x", function () { return scalex(d.no + 1)})
            // .attr("y", function () { return scaley(d.ratio) - 10});
            .style("left", (d3v5.event.pageX + 15) + "px")
            .style("top", (d3v5.event.pageY - 20) + "px");
        })
        .on("mouseout", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", 0);
            });
  // // append tooltip for donut
  //  donut.append("text")
  //       .attr("transform", function(d) { return "translate(" + generatorarc.centroid(d) + ")";  })
  //       // .text(function(d){ return d.data.key })
  //       .style("text-anchor", "middle")
  //       .style("font-size", 16)

  var polyline = d3v5.select("#gpiechart").selectAll("polyline")
      .data(data_ready_donut, function(d){ return d.data.key });
console.log(data_ready_donut)
  polyline.enter()
      .append("polyline");

  // polyline.transition().duration(1000)
  //     .attrTween("points", function(d){
  //         this._current = this._current || d;
  //         var interpolate = d3v5.interpolate(this._current, d);
  //         this._current = interpolate(0);
  //         return function(t) {
  //             var d2 = interpolate(t);
  //             var pos = generatorarc.centroid(d2);
  //             pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
  //             return [innerRadius.centroid(d2), outerRadius.centroid(d2), pos];
  //         };
  //     });

      polyline.transition().duration(1000)
  		.attrTween("points", function(d){
  			this._current = this._current || d;
  			var interpolate = d3.interpolate(this._current, d);
  			this._current = interpolate(0);
  			return function(t) {
  				var d2 = interpolate(t);
  				var pos = generatorarc.centroid(d2);
  				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
  				return [arcGenerator.centroid(d2), generatorarc.centroid(d2), pos];
  			};
  		});

  polyline.exit()
      .remove();

  // // again rebind for legend
  // var legendG = svgpiechart.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
  //   .data([data_ready_pie])
  //   .enter().append("g")
  //   .attr("transform", function(d,i){
  //     return "translate(" + (width - 110) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
  //   })
  //   .attr("class", "legend");
  //
  // legendG.append("rect") // make a matching color rect
  //   .attr("width", 10)
  //   .attr("height", 10)
  //   .attr("fill", function(d, i) {
  //     return colors(i);
  //   });
  //   console.log(typeof(data_ready_pie))
  //
  // legendG.append("text") // add the text
  //   .text(function(d){
  //     return d.key;
  //   })
  //   .style("font-size", 12)
  //   .attr("y", 10)
  //   .attr("x", 11);
  };

// update function for piechart as well as donut
function updatepiedonut(data_pie, data_donut, country, value, age){
  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready_pie = pie(d3v5.entries(data_pie))
  var piesvg = d3v5.select("#containerpiechart")
  pathpie = piesvg.selectAll(".classpath").data(data_ready_pie);
  pathpie.transition().delay(500).duration(1500).attrTween("d", arcTween);
  var data_ready_donut = pie(d3v5.entries(data_donut))
  var piesvg = d3v5.select("#containerpiechart")
  pathdonut = piesvg.selectAll(".classpath2").data(data_ready_donut);
  pathdonut.transition().delay(500).duration(1500).attrTween("d", arc2Tween);


  var title = d3v5.select("#containerpiechart")
    title.select("text.titlepiechart")
    .text("Piechart for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

}

function arcTween(a) {
  // determine arcs for pie
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

function arc2Tween(a) {
  // determine arcs for donut
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
