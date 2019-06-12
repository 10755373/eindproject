function makelinegraph(){

  var graph;
  var xPadding = 30;
  var yPadding = 30;

  var data = { values:[
        { X: "Jan", Y: 12 },
        { X: "Feb", Y: 28 },
        { X: "Mar", Y: 18 },
        { X: "Apr", Y: 34 },
        { X: "May", Y: 40 },
      ]};

  // source:
  // https://web.archive.org/web/20130407101311/http://www.worldwidewhat.net/2011/06/draw-a-line-graph-using-html5-canvas/
  function getMaxY() {
    var max = 0;

    for(var i = 0; i < data.values.length; i ++) {
        if(data.values[i].Y > max) {
            max = data.values[i].Y;
        }
    }

    max += 10 - max % 10;
    return max;
  }

  function getXPixel(val) {
      return ((linegraph.width - xPadding) / data.values.length) * val + (xPadding * 1.5);
  }

  function getYPixel(val) {
      return linegraph.height - (((linegraph.height - yPadding) / getMaxY()) * val) - yPadding;
  }

  const linegraph = document.getElementById('container2')
  const l = linegraph.getContext('2d');

  // determine styles
  l.lineWidth = 2;
  l.strokeStyle = '#333';
  l.font = 'italic 8pt sans-serif';
  l.textAlign = "center";

  l.beginPath();
  l.moveTo(xPadding, 0);
  l.lineTo(xPadding, linegraph.height - yPadding);
  l.lineTo(linegraph.width, linegraph.height - yPadding);
  l.stroke();

  // draw x-axis values
  for(var i = 0; i < data.values.length; i ++) {
    l.fillText(data.values[i].X, getXPixel(i), linegraph.height - yPadding + 20);
  }

  // draw y-axis values
  l.textAlign = "right"
  l.textBaseline = "middle";

  for(var i = 0; i < getMaxY(); i += 10) {
      l.fillText(i, xPadding - 10, getYPixel(i));
  }

  l.strokeStyle = '#f00';
  l.beginPath();
  l.moveTo(getXPixel(0), getYPixel(data.values[0].Y));

  for(var i = 1; i < data.values.length; i ++) {
      l.lineTo(getXPixel(i), getYPixel(data.values[i].Y));
  }
  l.stroke();

  l.fillStyle = '#333';

  for(var i = 0; i < data.values.length; i ++) {
      l.beginPath();
      l.arc(getXPixel(i), getYPixel(data.values[i].Y), 4, 0, Math.PI * 2, true);
      l.fill();
  }

};

//   // Get the canvas element from the document and a 2D rendering context
//   const canvas = document.getElementById('container2');
//   const c = canvas.getContext('2d');
//
//
//
//   c.beginPath();
//   c.moveTo(xPadding, yPadding);
//   c.lineTo(xPadding, canvas.height - yPadding);
//   c.lineTo(canvas.width, canvas.height - yPadding);
//   c.stroke();
//
//
//   c.fillText("Stroomopwekking van eigen zonnepanelen", (canvas.width + xPadding) / 2, yPadding / 2)
//
//   // Properties for drawing the x-axis values
//   c.font = 'italic 8pt sans-serif';
//   c.lineWidth = 1;
//   c.strokeStyle = '#bbb';
//
//   // Draw the date of the first data point
//   time = timeConverter(Object.values(data)[0])
//   c.fillText(time.day + ' ' + time.month, getXPixel(0), canvas.height - yPadding + 20);
//
//   // Draw every first day of the month in the dataset, including a grid line
//   for(var i = 1; i < Object.values(data).length; i++) {
//       time = timeConverter(Object.values(data)[i])
//       if(time.day == 1) {
//         xValue = getXPixel(i);
//         c.fillText(time.day + ' ' + time.month, xValue, canvas.height - yPadding + 20)
//         c.beginPath();
//         c.moveTo(xValue, canvas.height - yPadding);
//         c.lineTo(xValue, yPadding);
//         c.stroke();
//       };
//   }
//
//   // Draw x-axis label
//   c.font = 'italic 10pt sans-serif';
//   c.fillText("Tijd", canvas.width - 20, canvas.height - (yPadding / 2.0))
//
//
//   // Properties for drawing the y-axis values
//   c.font = 'italic 8pt sans-serif';
//   c.textAlign = "right"
//   c.textBaseline = "middle";
//
//   // Draw every other value, including a grid line
//   for(var i = 0; i < getMaxY(); i += 2) {
//     yValue = getYPixel(i)
//     c.fillText(i, xPadding - 10, yValue);
//     c.beginPath();
//     c.moveTo(xPadding, yValue);
//     c.lineTo(canvas.width, yValue);
//     c.stroke();
//   }
//
//   // Draw y-axis label
//   c.save()
//   c.font = 'italic 10pt sans-serif';
//   c.rotate(-Math.PI / 2)
//
//   c.fillText("Opbrengst (kWh)", -20, (xPadding / 3.5))
//   c.restore()
//
//
//   // Draw data lines
//   c.lineWidth = 2;
//   c.strokeStyle = '#15f';
//   c.beginPath();
//   c.moveTo(getXPixel(0), getYPixel(Object.values(data)[0][yData]));
//
//   for(var i = 1; i < Object.values(data).length; i++) {
//       c.lineTo(getXPixel(i), getYPixel(Object.values(data)[i][yData]));
//   }
//   c.stroke();
// };

// function makelinegraph(){
//
//   // set the dimensions and margins of the graph
//   var margin = {top: 10, right: 30, bottom: 30, left: 60},
//       width = 460 - margin.left - margin.right,
//       height = 400 - margin.top - margin.bottom;
//
//   // append the svg object to the body of the page
//   var svg = d3v5.select("#container2")
//     .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//
//     //Read the data
//   d3v5.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
//
//     // When reading the csv, I must format variables:
//     function(d){
//       return { date : d3v5.timeParse("%Y-%m-%d")(d.date), value : d.value }
//     },
//
//     // Now I can use this dataset:
//     function(data) {
//
//       // Add X axis --> it is a date format
//       var x = d3v5.scaleTime()
//         .domain(d3.extent(data, function(d) { return d.date; }))
//         .range([ 0, width ]);
//       svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3v5.axisBottom(x));
//
//       // Add Y axis
//       var y = d3v5.scaleLinear()
//         .domain([0, d3v5.max(data, function(d) { return +d.value; })])
//         .range([ height, 0 ]);
//       svg.append("g")
//         .call(d3v5.axisLeft(y));
//
//       // Add the line
//       svg.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", 1.5)
//         .attr("d", d3v5.line()
//           .x(function(d) { return x(d.date) })
//           .y(function(d) { return y(d.value) })
//           )
//   })
//
// };
