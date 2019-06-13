function makelinegraph(data_female, data_male){

  var graph;
  var xPadding = 30;
  var yPadding = 30;

  var data_female = data_female
  var data_male = data_male

  // source:
  // https://web.archive.org/web/20130407101311/http://www.worldwidewhat.net/2011/06/draw-a-line-graph-using-html5-canvas/
  function getMaxY() {
    var max = 0;

    for(var i = 0; i < data_male.length; i ++) {
        if(data_male[i].y > max) {
            max = data_male[i].y;
        }
    }

    max += 10 - max % 10;
    return max;
  }

  function getXPixel(val) {
      return ((linegraph.width - xPadding) / data_male.length) * val + (xPadding * 1.5);
  }

  function getYPixel(val) {
      return linegraph.height - (((linegraph.height - yPadding) / getMaxY()) * val) - yPadding;
  }

  const linegraph = document.getElementById('container2')
  const l = linegraph.getContext('2d');

  // determine styles
  l.lineWidth = 3;
  l.strokeStyle = '#333';
  l.font = 'italic 8pt sans-serif';
  l.textAlign = "center";

  l.beginPath();
  l.moveTo(xPadding, 0);
  l.lineTo(xPadding, linegraph.height - yPadding);
  l.lineTo(linegraph.width, linegraph.height - yPadding);
  l.stroke();

  // draw x-axis values
  for(var i = 0; i < data_male.length; i ++) {
    l.fillText(data_male[i].x, getXPixel(i), linegraph.height - yPadding + 20);
    // l.beginPath();
    // l.moveTo(linegraph.height - yPadding + 20, getXPixel(i));
    // l.lineTo(linegraph.height, getXPixel(i));
    // l.stroke();
  }

  // draw y-axis values
  l.textAlign = "right"
  l.font = 'italic 8pt sans-serif';
  l.textBaseline = "middle";

  for(var i = 0; i < getMaxY(); i += 50) {
      l.fillText(i, xPadding - 10, getYPixel(i));
      l.beginPath();
      l.moveTo(xPadding, getYPixel(i));
      l.lineTo(linegraph.width, getYPixel(i));
      l.stroke();
  }


  // draw actual lines within the graph
  l.strokeStyle = '#ffb3e6';
  l.lineWidth = 3;
  l.beginPath();
  l.moveTo(getXPixel(0), getYPixel(data_female[0].y));

  for(var i = 1; i < data_female.length; i ++) {
      l.lineTo(getXPixel(i), getYPixel(data_female[i].y));
  }
  l.stroke();

  l.fillStyle = '#333';

  for(var i = 0; i < data_female.length; i ++) {
      l.beginPath();
      l.arc(getXPixel(i), getYPixel(data_female[i].y), 4, 0, Math.PI * 2, true);
      l.fill();
      // console.log(data_female[i].y)
  }

  // draw actual lines within the graph
  l.strokeStyle = '#80aaff';
  l.lineWidth = 3;
  l.beginPath();
  l.moveTo(getXPixel(0), getYPixel(data_male[0].y));

  for(var i = 1; i < data_male.length; i ++) {
      l.lineTo(getXPixel(i), getYPixel(data_male[i].y));
  }
  l.stroke();

  l.fillStyle = '#333';

  for(var i = 0; i < data_male.length; i ++) {
      l.beginPath();
      l.arc(getXPixel(i), getYPixel(data_male[i].y), 4, 0, Math.PI * 2, true);
      l.fill();
      // console.log(data_male[i].y)
  }

};

//
// function drawlinegraph(data_male, data_female){
//   // set the dimensions and margins of the graph
//   var margin = {top: 10, right: 30, bottom: 30, left: 60},
//       width = 460 - margin.left - margin.right,
//       height = 400 - margin.top - margin.bottom;
//
//   // append the svg object to the body of the page
//   var svg = d3v5.select("#my_dataviz")
//     .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//
//   //Read the data
//   d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv", function(data) {
//
//     // group the data: I want to draw one line per group
//     var sumstat = d3v5.nest() // nest function allows to group the calculation per level of a factor
//       .key(function(d) { return d.name;})
//       .entries(data);
//
//     // Add X axis --> it is a date format
//     var x = d3v5.scaleLinear()
//       .domain(d3v5.extent(data, function(d) { return d.year; }))
//       .range([ 0, width ]);
//     svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3v5.axisBottom(x).ticks(5));
//
//     // Add Y axis
//     var y = d3v5.scaleLinear()
//       .domain([0, d3.max(data, function(d) { return +d.n; })])
//       .range([ height, 0 ]);
//     svg.append("g")
//       .call(d3.axisLeft(y));
//
//     // color palette
//     var res = sumstat.map(function(d){ return d.key }) // list of group names
//     var color = d3v5.scaleOrdinal()
//       .domain(res)
//       .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
//
//     // Draw the line
//     svg.selectAll(".line")
//         .data(sumstat)
//         .enter()
//         .append("path")
//           .attr("fill", "none")
//           .attr("stroke", function(d){ return color(d.key) })
//           .attr("stroke-width", 1.5)
//           .attr("d", function(d){
//             return d3v5.line()
//               .x(function(d) { return x(d.year); })
//               .y(function(d) { return y(+d.n); })
//               (d.values)
//           })
//
//   })
// };
