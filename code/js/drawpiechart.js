

function newpiechart1(data_pie, data_donut, country, value, age){

  var divsize = d3v5.select("#container3").node().getBoundingClientRect();
  console.log(data_pie)
  console.log(data_donut)
  var width = divsize.height
  var height = divsize.width
  var margin = 40

  var radius = Math.min(width, height) / 2 - margin;

  var colors = d3v5.scaleOrdinal()
    .domain(["male", "female"])
    .range(["steelblue", "pink"]);

  var arcGenerator = d3v5.arc()
    .innerRadius(0)
    .outerRadius(140);

  var pie_chart = d3v5.select("#container3").append("svg")
    // .attr("id", "pie")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data_pie = data_pie;

  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
    .sort(null);

  var data_ready = pie(d3v5.entries(data_pie))

  var svgpie = pie_chart.selectAll("path")
        .data(data_pie)
        .enter().append("path")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .style("fill", function(d) {return(colors(d.data.key))})
        .attr("class", "arcpie")
        .attr("d", arcGenerator)
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)


  //create tip
  var tip = d3v5.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<span style='color:orange'>" + d.data.value + "</span> <strong>%</strong>";
        })

  var div = d3v5.select("#container3").append("div")
      .attr("class", "tooltipscatter")
      .style("opacity", 0);



  svgpie.append("path")
        .attr("d", arcGenerator)
        .style("fill", function(d) {return(colors(d.data.key))})
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(d) {
         div.transition()
             .duration(200)
             .style("opacity", .9);
         div .html(d.data.key + "<br/>")
              .html(d.data.value + "<br/>")
             .style("left", (d3v5.event.pageX + 15) + "px")
             .style("top", (d3v5.event.pageY - 20) + "px");
         })
         .on("mouseout", function(d) {
         div.transition()
             .duration(500)
             .style("opacity", 0);
           });


  svgpie.append("text")
        .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 17);

}


function drawpiechart(data_pie, data_donut, country, value, age){
//
  if ( $('#containerpiechart').is(':empty')){
    newpiechart(data_pie, data_donut, country, value, age)
    // newdonut(data_donut)
  }
  else{
    updatepiechart(data_pie, data_donut, country, value, age)
    // updatedonut(data_donut)
  }};


function newpiechart(data_pie, data_donut, country, value, age){

  var divsize = d3v5.select("#containerpiechart").node().getBoundingClientRect();

  var margin = {top: 20, right: 30, bottom: 20, left: 20};
  var width = divsize.width - margin.left - margin.right;
  var height = divsize.height - margin.top - margin.bottom;

  var radius = Math.min(width, height) / 2 - margin

  var svgpiechart = d3v5.select("#containerpiechart").append("svg")
          .attr("class", "classpiechart")
          .attr("id", "piechart")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("id", "gpiechart")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var colors = d3v5.scaleOrdinal()
          .domain(["male", "female"])
          .range(["steelblue", "pink"]);

  var div = d3v5.select("#gpiechart").append("div")
          .attr("class", "tooltippiechart")
          .style("opacity", 0);

  var pie = d3v5.pie()
          .value(function(d) {return d.value; })

  var data_ready = pie(d3v5.entries(data_pie))

  const arcGenerator = d3v5.arc()
          .innerRadius(0)
          .outerRadius(120)

  const generatorarc = d3v5.arc()
          .innerRadius(125)
          .outerRadius(170)

  var data_corrected = pie(d3v5.entries(data_donut))
console.log(data_corrected)
console.log(data_ready)
// console.log(generatorarc)
// console.log(arcGenerator)
  // //create tip
  // var tip = d3v5.tip()
  //     .attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //       return "<span style='color:orange'>" + d.data.value + "</span> <strong>%</strong>";
  //       })

  var div = d3v5.select(".gpiechart").append("div")
     .attr("class", "tooltippiechart")
     .style("opacity", 0);

 var pie = svgpiechart.selectAll("arcpie")
     .data(data_ready)
     .enter().append("g")
     .attr("class", "arc")
     .attr("id", "arcpie")
     .attr("stroke", "black")
     .style("stroke-width", "1px")
     .style("opacity", 0.7)

 pie.append("path")
      .attr("class", "classpath")
     .attr("d", arcGenerator)
     .style("fill", function(d) { return colors(d.data.key);})

 pie.append("text")
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      // .text(function(d){ return d.data.key })
      .style("text-anchor", "middle")
      .style("font-size", 16)
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

   var donut = svgpiechart.selectAll("arcpie2")
       .data(data_corrected)
       .enter().append("g")
       .attr("class", "arcs")
       .attr("id", "arcsdonut")
       .attr("stroke", "black")
       .style("stroke-width", "1px")
       .style("opacity", 0.7)

   donut.append("path")
        .attr("class", "classpath2")
       .attr("d", generatorarc)
       .style("fill", function(d) { return colors(d.data.key);})

   donut.append("text")
        .attr("transform", function(d) { return "translate(" + generatorarc.centroid(d) + ")";  })
        // .text(function(d){ return d.data.key })
        .style("text-anchor", "middle")
        .style("font-size", 16)
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
  };

function newdonut(data_donut){

  var divsize = d3v5.select("#containerpiechart").node().getBoundingClientRect();

  var margin = {top: 20, right: 30, bottom: 20, left: 20};
  var width = divsize.width - margin.left - margin.right;
  var height = divsize.height - margin.top - margin.bottom;

  var radius = Math.min(width, height) / 2 - margin

  var svgdonut = d3v5.select(".gpiechart")
          .append("g")
          .attr("id", "gdonut")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var colors = d3v5.scaleOrdinal()
          .domain(["male", "female"])
          .range(["steelblue", "pink"]);

  var div = d3v5.select("#gdonut").append("div")
          .attr("class", "tooltippiechart")
          .style("opacity", 0);

  var pie = d3v5.pie()
          .value(function(d) {return d.value; })

  const arcGenerator = d3v5.arc()
          .innerRadius(125)
          .outerRadius(radius)

  var data_corrected = pie(d3v5.entries(data_donut))

  var donut = d3v5.pie()
          .value(function(d) {return d.value; })



  // //create tip
  // var tip = d3v5.tip()
  //     .attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //       return "<span style='color:orange'>" + d.data.value + "</span> <strong>%</strong>";
  //       })

  var div = d3v5.select(".gpiechart").append("div")
     .attr("class", "tooltippiechart")
     .style("opacity", 0);

 var donut = svgdonut.selectAll("arcpies")
     .data(data_corrected)
     .enter().append("g")
     .attr("class", "arcies")
     .attr("id", "arciesdonut")
     .attr("stroke", "black")
     .style("stroke-width", "1px")
     .style("opacity", 0.7)

 donut.append("path")
      .attr("class", "classpathstestdonut")
     .attr("d", arcGenerator)
     .style("fill", function(d) { return colors(d.data.key);})

 donut.append("text")
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      // .text(function(d){ return d.data.key })
      .style("text-anchor", "middle")
      .style("font-size", 16)
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
  }

function updatepiechart(data_pie, data_donut, country, value, age){
  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data_pie))
  console.log(data_ready)
  var piesvg = d3v5.select("#containerpiechart")
  pathpie = piesvg.selectAll(".classpath").data(data_ready);
  // console.log(path)
  pathpie.transition().delay(500).duration(1500).attrTween("d", arcTween);
  // path.enter().attr("d", arcTween).each(function(d) {this._current = d; });

  var data_corrected = pie(d3v5.entries(data_donut))
  console.log(data_corrected)
  var piesvg = d3v5.select("#containerpiechart")
  pathdonut = piesvg.selectAll(".classpath2").data(data_corrected);
  // console.log(path)
  pathdonut.transition().delay(500).duration(1500).attrTween("d", arc2Tween);


  piesvg.select("text.titlepiechart")
    .text("Piechart for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

}

function updatedonut(data_donut){
  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_corrected = pie(d3v5.entries(data_donut))

  var donutsvg = d3v5.select("#containerpiechart")
  pathdonut = donutsvg.selectAll("tiloburg").data(data_corrected);
  console.log(data_corrected)
  pathdonut.transition().duration(500).attrTween("d", arc2Tween);
}

function arcTween(a) {

    var divsize = d3v5.select("#containerpiechart").node().getBoundingClientRect();

    var width = divsize.height
    var height = divsize.width
    var margin = 40

    var radius = Math.min(width, height) / 2 - margin

    var arcGenerator = d3v5.arc()
      .innerRadius(0)
      .outerRadius(120)

    const i = d3v5.interpolate(this._current, a);
    this._current = i(0);
      return function(t) {
    return arcGenerator(i(t));
    };
    }

function arc2Tween(a) {
    var divsize = d3v5.select("#containerpiechart").node().getBoundingClientRect();

    var width = divsize.height
    var height = divsize.width
    var margin = 40

    var radius = Math.min(width, height) / 2 - margin

    var arcGenerator = d3v5.arc()
      .innerRadius(125)
      .outerRadius(170)

    const i = d3v5.interpolate(this._current, a);
    this._current = i(0);
      return function(t) {
    return arcGenerator(i(t));
    };
}
