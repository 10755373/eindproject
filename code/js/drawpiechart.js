

function newpiechart1(data_pie, data_donut){

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


function drawpiechart(data_pie, data_donut){
//
  if ( $('#containerpiechart').is(':empty')){
    newpiechart(data_pie)
    // newdonut(data_donut)
  }
  else{
    updatepiechart(data_pie)
    // updatedonut(data_donut)
  }};


function newpiechart(data_pie, data_donut){

    var divsize = d3v5.select("#containerlinegraph").node().getBoundingClientRect();


      var width = divsize.width
          height = divsize.width
          margin = 40

      var radius = Math.min(width, height) / 2 - margin

      var svg = d3v5.select("#containerpiechart")
        .append("svg")
        .attr("class", "svgpiedonut")
        .attr("id", "pie")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var data = data_pie

      var colors = d3v5.scaleOrdinal()
        .domain(["male", "female"])
        .range(["steelblue", "pink"]);

    var div = d3v5.select("#containerpiechart").append("div")
        .attr("class", "tooltipscatter")
        .style("opacity", 0);

    // //create tip
    // var tip = d3v5.tip()
    //     .attr('class', 'd3-tip')
    //     .offset([-10, 0])
    //     .html(function(d) {
    //       return "<span style='color:orange'>" + d.data.value + "</span> <strong>%</strong>";
    //       })

      var pie = d3v5.pie()
        .value(function(d) {return d.value; })
      var data_ready = pie(d3v5.entries(data))
      var arcGenerator = d3v5.arc()
        .innerRadius(0)
        .outerRadius(120)

      console.log(data_ready)
      var data_corrected = pie(d3v5.entries(data_donut))

      var arcGenerator2 = d3v5.arc()
        .innerRadius(125)
        .outerRadius(radius)

      // var donut = svg.selectAll("arc")
      //   .data(data_ready)
      //   .enter()
      //   .append('path')
      //     .attr('d', arcGenerator)
      //     .attr('fill', function(d){ return(colors(d.data.key)) })
      //     .attr("stroke", "black")
      //     .style("stroke-width", "2px")
      //     .style("opacity", 0.7)

      var pie = svg.selectAll("arc")
          .data(data_ready)
          .enter().append("g")
          .attr("class", "arc")
          .attr("id", "arcpie")
          .attr("stroke", "black")
          .style("stroke-width", "1px")
          .style("opacity", 0.7)

      pie.append("path")
          .attr("d", arcGenerator)
          .style("fill", function(d) { return colors(d.data.key);})
       pie.append("text")
             .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
             .text(function(d){ return d.data.key + ": " + d.data.value })
             .style("text-anchor", "middle")
             .style("font-size", 16)
             // .on("mouseover", function(d) {
             //  pie.transition()
             //      .duration(200)
             //      .style("opacity", .9);
             //  pie .html(d.data.value + "<br/>")
             //      .style("left", (d3v5.event.pageX + 15) + "px")
             //      .style("top", (d3v5.event.pageY - 20) + "px");
             //  })
             //  .on("mouseout", function(d) {
             //  pie.transition()
             //      .duration(500)
             //      .style("opacity", 0);
             //      });

    var donut = svg.selectAll("arc")
        .data(data_corrected)
        .enter().append("g")
        .attr("class", "arc")
        .attr("id", "arcdonut")
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", 0.7)

    donut.append("path")
        .attr("d", arcGenerator2)
        .style("fill", function(d) { return colors(d.data.key);})
   donut.append("text")
         .attr("transform", function(d) { return "translate(" + arcGenerator2.centroid(d) + ")";  })
         .text(function(d){ return d.data.key + ": " + d.data.value })
         .style("text-anchor", "middle")
         .style("font-size", 16)

  // var divsize = d3v5.select("#containerpiechart").node().getBoundingClientRect();
  // console.log(data_pie)
  // console.log(data_donut)
  // var width = divsize.height
  // var height = divsize.width
  // var margin = 40
  //
  // var radius = Math.min(width, height) / 2 - margin
  //
  // var pie_chart = d3v5.select("#containerpiechart").append("svg")
  //   .attr("class", "pie")
  //   .attr("id", "pie_chart1")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .append("g")
  //   .attr("id", "pie_chart")
  //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //
  // var data_pie = data_pie;
  //
  // var colors = d3v5.scaleOrdinal()
  //   .domain(["male", "female"])
  //   .range(["steelblue", "pink"]);
  //
  // var pie = d3v5.pie()
  //   .value(function(d) {return d.value; })
  //
  // var data_ready = pie(d3v5.entries(data_pie))
  //
  // var arcGenerator = d3v5.arc()
  //   .innerRadius(0)
  //   .outerRadius(140)
  //
  // //create tip
  // var tip = d3v5.tip()
  //     .attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //       return "<span style='color:orange'>" + d.data.value + "</span> <strong>%</strong>";
  //       })
  //
  // // var donut = svg.selectAll("arc")
  // //   .data(data_ready)
  // //   .enter()
  // //   .append('path')
  // //     .attr('d', arcGenerator)
  // //     .attr('fill', function(d){ return(colors(d.data.key)) })
  // //     .attr("stroke", "black")
  // //     .style("stroke-width", "2px")
  // //     .style("opacity", 0.7)
  //
  // var div = d3v5.select("#container3").append("div")
  //     .attr("class", "tooltipscatter")
  //     .style("opacity", 0);
  //
  // pie_chart
  //   .selectAll('.piechart')
  //   .data(data_ready)
  //   .enter()
  //   .append('path')
  //     .attr("class", "piechart")
  //     .attr('d', arcGenerator)
  //     .attr('fill', function(d){ return(colors(d.data.key)) })
  //     .attr("stroke", "black")
  //     .style("stroke-width", "2px")
  //     .style("opacity", 0.7)
  //     .on("mouseover", function(d) {
  //      div.transition()
  //          .duration(200)
  //          .style("opacity", .9);
  //      div .html(d.data.key + "<br/>")
  //           .html(d.data.value + "<br/>")
  //          .style("left", (d3v5.event.pageX + 15) + "px")
  //          .style("top", (d3v5.event.pageY - 20) + "px");
  //      })
  //      .on("mouseout", function(d) {
  //      div.transition()
  //          .duration(500)
  //          .style("opacity", 0);
  //          })
  //     // .on("mouseenter", mouseoverpiechart)
  //     // .on("mouseout", mouseoutpiechart);
  //     // .on("mouseover", tip.show)
  //     // .on("mouseout", tip.hide)
  //     // .on("mouseover", function (d) {
  //     // d3.select("#tooltip")
  //     //     .style("left", d3.event.pageX + "px")
  //     //     .style("top", d3.event.pageY + "px")
  //     //     .style("opacity", 1)
  //     //     .select("#value")
  //     //     .text(d.value);
  //     //   })
  //     // .on("mouseout", function () {
  //     // // Hide the tooltip
  //     // d3.select("#tooltip")
  //     //     .style("opacity", 0);;
  //     //   });
  //
  // pie_chart
  //   .selectAll('mySlices')
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //   .text(function(d){ return d.data.value})
  //   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  //   .style("text-anchor", "middle")
  //   .style("font-size", 17)
  //
  //
  //
  // // make donut chart!!!!
  //
  //
  //
  // var data_donut = data_donut;
  //
  // // var colors = d3v5.scaleOrdinal()
  // //   .domain(["male", "female"])
  // //   .range(["steelblue", "pink"]);
  // //
  // // var pie = d3v5.pie()
  // //   .value(function(d) {return d.value; })
  // var data_corrected = pie(d3v5.entries(data_donut))
  //
  // var arcGenerator2 = d3v5.arc()
  //   .innerRadius(145)
  //   .outerRadius(radius)
  //
  // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  // pie_chart
  //   .selectAll('mySlices')
  //   .data(data_corrected)
  //   .enter()
  //   .append('path')
  //     .attr("id", "piechart")
  //     .attr('d', arcGenerator2)
  //     .attr('fill', function(d){ return(colors(d.data.key)) })
  //     .attr("stroke", "black")
  //     .style("stroke-width", "2px")
  //     .style("opacity", 0.7)
  //     .on("mouseover", function(d) {
  //      div.transition()
  //          .duration(200)
  //          .style("opacity", .9);
  //     div  .html(d.data.key + "<br/>")
  //          .html(d.data.value + "<br/>")
  //          .style("left", (d3v5.event.pageX + 15) + "px")
  //          .style("top", (d3v5.event.pageY - 20) + "px");
  //      })
  //      .on("mouseout", function(d) {
  //      div.transition()
  //          .duration(500)
  //          .style("opacity", 0);
  //          })
  //     // .on("mouseenter", mouseoverpiechart)
  //     // .on("mouseover", tip.show)
  //     // .on("mouseout", mouseoutpiechart);
  //     // .on("mouseout", tip.hide)
  //
  // // Now add the annotation. Use the centroid method to get the best coordinates
  // pie_chart
  //   .selectAll('mySlices')
  //   .data(data_corrected)
  //   .enter()
  //   .append('text')
  //   .text(function(d){ return d.data.value})
  //   .attr("transform", function(d) { return "translate(" + arcGenerator2.centroid(d) + ")";  })
  //   .style("text-anchor", "middle")
  //   .style("font-size", 17);

    //
    // function mouseoverpiechart() {
    //     d3v5.select(this)
    //         .attr("stroke", "red")
    //         .style("stroke-width", "2px")
    //         .style("stroke-opacity", 0.7)
    // }
    // function mouseoutpiechart() {
    //     d3v5.select(this)
    //         .attr("stroke", "black")
    //         .style("stroke-width", "2px")
    //         .style("stroke-opacity", 0.7)
    // }

  };

function newdonut(data_donut){
    var width = 450
        height = 450
        margin = 40

    var radius = Math.min(width, height) / 2 - margin

    var svg = d3v5.select("#containerpiechart")
      .append("svg")
      .attr("id", "donut")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var data = data_pie

    var colors = d3v5.scaleOrdinal()
      .domain(["male", "female"])
      .range(["steelblue", "pink"]);

  var div = d3v5.select("#containerpiechart").append("div")
      .attr("class", "tooltipscatter")
      .style("opacity", 0);

  // //create tip
  // var tip = d3v5.tip()
  //     .attr('class', 'd3-tip')
  //     .offset([-10, 0])
  //     .html(function(d) {
  //       return "<span style='color:orange'>" + d.data.value + "</span> <strong>%</strong>";
  //       })

    var pie = d3v5.pie()
      .value(function(d) {return d.value; })
    var data_corrected = pie(d3v5.entries(data_donut))
    console.log(data_corrected)
    var arcGenerator = d3v5.arc()
      .innerRadius(125)
      .outerRadius(radius)

    var donut = svg.selectAll("whatever")
        .data(data_corrected)
        .enter().append("g")
        .attr("class", "sobeit")
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", 0.7)

    donut.append("path")
        .attr("class", "tiloburg")
        .attr("d", arcGenerator)
        .style("fill", function(d) { return colors(d.data.key);})
   donut.append("text")
         .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
         .text(function(d){ return d.data.key + ": " + d.data.value })
         .style("text-anchor", "middle")
         .style("font-size", 16)
  }

function updatepiechart(data_pie){
  var pie = d3v5.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3v5.entries(data_pie))
  console.log(data_ready)
  var piesvg = d3v5.select("#containerpiechart")
  pathpie = piesvg.selectAll("path").data(data_ready);
  // console.log(path)
  pathpie.transition().duration(500).attrTween("d", arcTween);
  // path.enter().attr("d", arcTween).each(function(d) {this._current = d; });


  // path2.enter().attr("d", arc2Tween).each(function(d) {this._current = a; });

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

    var i = d3v5.interpolate(this._current, a);
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

    var arcGenerator2 = d3v5.arc()
      .innerRadius(125)
      .outerRadius(radius)

    var i = d3v5.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arcGenerator2(i(t));
    };
}

 //  var pie = pie_chart.selectAll("arc")
 //      .data(data_ready)
 //      .enter().append("g")
 //      .attr("class", "arc")
 //      .attr("stroke", "black")
 //      .style("stroke-width", "1px")
 //      .style("opacity", 0.7)
 //      // .on("mouseenter", mouseoverpiechart)
 //      // .on("mouseout", mouseoutpiechart)
 //
 //  pie.append("path")
 //        .attr("d", arcGenerator)
 //        .attr("id", "pathdonut")
 //        .style("fill", function(d) { return colors(d.data.key);})
 //        .attr("data-legend",function(d) { return d.data.key})
 // pie.append("text")
 //       .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
 //       .text(function(d){ return d.data.value })
 //       .style("text-anchor", "middle")
 //       .style("font-size", 16)
 //
 //  // var tip = d3v5.tip()
 //  //     .attr('class', 'd3-tip')
 //  //     .offset([-10, 0])
 //  //     .html(function(d) {
 //  //       return "<span style='color:lavender'>" + d.data.value + "</span> <strong>%</strong>";
 //  //       })
 //
 //
 //    //
 //    //      .on("mouseover", function(d) {
 //    //        d3v5.select("#tooltip").style('opacity', 1)
 //    //          .select("#value").text(d.data.value);
 //    //      })
 //    //      .on("mousemove", function(d) {
 //    //        d3v5.select("#tooltip").style("top", (d3v5.event.pageY - 10) + "px")
 //    //        .style("left", (d3v5.event.pageX + 10) + "px");
 //    //      })
 //    //      .on("mouseout", function() {
 //    //        d3v5.select("#tooltip").style('opacity', 0);
 //    //      });
 //    //
 //    // pie.call(tip);
 //
 //   // pie.append("path")
 //   //     .attr("d", arcGenerator)
 //   //     .style("fill", colors)
 //   //     .on("mouseover", tip.show)
 //   //     .on('mouseout', tip.hide);
 //
 //   // Source: http://bl.ocks.org/ZJONSSON/3918369
 //   legend = pie.append("g")
 //   .attr("class","legend")
 //   .attr("id", "legend")
 //   .attr("transform","translate(125,150)")
 //   .style("font-size","12px")
 //   .call(d3.legend)
 //
 //  setTimeout(function() {
 //   legend
 //     .style("font-size","20px")
 //     .attr("data-style-padding",10)
 //     .call(d3.legend)
 //   },1000)

   // function mouseoverpiechart() {
   //     d3v5.select(this)
   //         .attr("stroke", "red")
   //         .style("stroke-width", "3px")
   //         .style("stroke-opacity", 0.7)
   // }
   // function mouseoutpiechart() {
   //     d3v5.select(this)
   //         .attr("stroke", "black")
   //         .style("stroke-width", "1px")
   //         .style("stroke-opacity", 0.7)
   // }

  // donut
  //   .selectAll('mySlices')
  //   .data(data_ready)
  //   .enter()
  //   .append('text')
  //   .text(function(d){ return d.data.key + ": " + d.data.value })
  //   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  //   .style("text-anchor", "middle")
  //   .style("font-size", 17)
//
//   //create tip
// var tip = d3v5.tip()
//     .attr('class', 'd3-tip')
//     .offset([-10, 0])
//     .html(function(d) {
//       return "<span style='color:lavender'>" + d.value + "</span> <strong>%</strong>";
//       })
// g.append("path")
//     .attr("d", arc)
//     .style("fill", function(d) { return color(d.data.type);})
//     .on("mouseover", tip.show)
//     .on('mouseout', tip.hide);

  // pie.append("g")
  //     .attr("class", "legend")
  //     .attr("transform", "translate(" + radius + ", 0)")
  //     .style("font-size", "12px")
  //     .call(d3.legend);


// function initializepiechart(){
//
//   var divsize = d3v5.select("#container3").node().getBoundingClientRect();
//
//   var width = divsize.height
//   var height = divsize.width
//   var margin = 40
//
//   var radius = Math.min(width, height) / 2 - margin
//
//   const pie_chart = d3v5.select("#container3").append("svg")
//     .attr("class", "pie")
//     .attr("id", "pie")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("id", "pie_chart")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//
//   var data = {male: 350, female: 211};
//
//   var colors = d3v5.scaleOrdinal()
//     .domain(["male", "female"])
//     .range(["steelblue", "pink"]);
//
//   var pie = d3v5.pie()
//     .value(function(d) {return d.value; })
//   var data_ready = pie(d3v5.entries(data))
//
//   var arcGenerator = d3v5.arc()
//     .innerRadius(0)
//     .outerRadius(120)
//
//   // var donut = svg.selectAll("arc")
//   //   .data(data_ready)
//   //   .enter()
//   //   .append('path')
//   //     .attr('d', arcGenerator)
//   //     .attr('fill', function(d){ return(colors(d.data.key)) })
//   //     .attr("stroke", "black")
//   //     .style("stroke-width", "2px")
//   //     .style("opacity", 0.7)
//
//   // pie_chart.selectAll('pie')
//   //     .data(data_ready)
//   //     .enter()
//   //     .append('path')
//   //     .attr('d', arcGenerator)
//   //     .attr('fill', function(d) { return(colors(d.data.key)) })
//   //     .attr("stroke", "black")
//   //     .style("stroke-width", "1px")
//   //     .style("stroke-opacity", 1)
//   //     .on("mouseenter", mouseoverpiechart)
//   //     .on("mouseout", mouseoutpiechart)
//
//   var pie = pie_chart.select("arc")
//       .data(data_ready)
//       .enter().append("g")
//       .attr("class", "arc")
//       .attr("stroke", "black")
//       .style("stroke-width", "1px")
//       .style("opacity", 0.7)
//       .on("mouseenter", mouseoverpiechart)
//       .on("mouseout", mouseoutpiechart)
//
//   pie.append("path")
//         .attr("d", arcGenerator)
//         .attr("id", "pathdonut")
//         .style("fill", function(d) { return colors(d.data.key);})
//         .attr("data-legend",function(d) { return d.data.key})
//  // pie.append("text")
//  //       .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
//  //       .text(function(d){ return d.data.value })
//  //       .style("text-anchor", "middle")
//  //       .style("font-size", 16)
// //
// // //        .on("mouseenter", handleMouseOverPie)
// // // .on("mouseout", handleMouseOutPie)
// //
//   function mouseoverpiechart() {
//       d3v5.select(this)
//           .attr("stroke", "red")
//           .style("stroke-width", "3px")
//           .style("stroke-opacity", 0.7)
//   }
//   function mouseoutpiechart() {
//       d3v5.select(this)
//           .attr("stroke", "black")
//           .style("stroke-width", "1px")
//           .style("stroke-opacity", 0.7)
//   }
//
//   // var tip = d3v5.tip()
//   //     .attr('class', 'd3-tip')
//   //     .offset([-10, 0])
//   //     .html(function(d) {
//   //       return "<span style='color:lavender'>" + d.data.value + "</span> <strong>%</strong>";
//   //       })
//
//
//     //
//     //      .on("mouseover", function(d) {
//     //        d3v5.select("#tooltip").style('opacity', 1)
//     //          .select("#value").text(d.data.value);
//     //      })
//     //      .on("mousemove", function(d) {
//     //        d3v5.select("#tooltip").style("top", (d3v5.event.pageY - 10) + "px")
//     //        .style("left", (d3v5.event.pageX + 10) + "px");
//     //      })
//     //      .on("mouseout", function() {
//     //        d3v5.select("#tooltip").style('opacity', 0);
//     //      });
//     //
//     // pie.call(tip);
//
//    // pie.append("path")
//    //     .attr("d", arcGenerator)
//    //     .style("fill", colors)
//    //     .on("mouseover", tip.show)
//    //     .on('mouseout', tip.hide);
//
//   //  // Source: http://bl.ocks.org/ZJONSSON/3918369
//   //  legend = pie.append("g")
//   //  .attr("class","legend")
//   //  .attr("id", "legend")
//   //  .attr("transform","translate(125,150)")
//   //  .style("font-size","12px")
//   //  .call(d3.legend)
//   //
//   // setTimeout(function() {
//   //  legend
//   //    .style("font-size","20px")
//   //    .attr("data-style-padding",10)
//   //    .call(d3.legend)
//   //  },1000)
//
//   // donut
//   //   .selectAll('mySlices')
//   //   .data(data_ready)
//   //   .enter()
//   //   .append('text')
//   //   .text(function(d){ return d.data.key + ": " + d.data.value })
//   //   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
//   //   .style("text-anchor", "middle")
//   //   .style("font-size", 17)
// //
// //   //create tip
// // var tip = d3v5.tip()
// //     .attr('class', 'd3-tip')
// //     .offset([-10, 0])
// //     .html(function(d) {
// //       return "<span style='color:lavender'>" + d.value + "</span> <strong>%</strong>";
// //       })
// // g.append("path")
// //     .attr("d", arc)
// //     .style("fill", function(d) { return color(d.data.type);})
// //     .on("mouseover", tip.show)
// //     .on('mouseout', tip.hide);
//
//   // pie.append("g")
//   //     .attr("class", "legend")
//   //     .attr("transform", "translate(" + radius + ", 0)")
//   //     .style("font-size", "12px")
//   //     .call(d3.legend);
//
// };
//
//
// // Source: http://www.cagrimmett.com/til/2016/08/24/d3-pie-chart-update.html
