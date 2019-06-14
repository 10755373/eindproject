function makelinegraph(data_female, data_male){

  // // set the dimensions and margins of the graph
  // var margin = {top: 10, right: 30, bottom: 30, left: 60},
  //     width = 700 - margin.left - margin.right,
  //     height = 800 - margin.top - margin.bottom;
  //
  // // append the svg object to the body of the page
  // var svg = d3.select("#container2")
  //   .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //     .attr("transform",
  //           "translate(" + margin.left + "," + margin.top + ")");

  // determine x and y paddings
  var padding_xaxis = 70;
  var padding_yaxis = 70;

  // determine data which is being used for the linegraph
  var data_female = data_female
  var data_male = data_male

  // sum up all the values regarding the men
  sum_male = 0
  for (var i = 0; i < data_male.length; i ++) {
    // console.log(data_male[i].y)
    sum_male += data_male[i].y
  };

  // sum up all the values regarding the woman
  sum_female = 0
  for (var i = 0; i < data_female.length; i ++) {
    sum_female += data_female[i].y
  };

  // source: https://web.archive.org/web/20130407101311/http://www.worldwidewhat.net/2011/06/draw-a-line-graph-using-html5-canvas/
  function getMaxY() {
    var max = 0;
    if (sum_male > sum_female){
      for(var i = 0; i < data_male.length; i ++) {
          if(data_male[i].y > max) {
              max = data_male[i].y;
            }
        }
    }
    else {
        for(var i = 0; i < data_female.length; i ++) {
            if(data_female[i].y > max) {
                max = data_female[i].y;
              }
            }
          }

    max += 10 - max % 10;
    return max;
    }


  function getXPixel(val) {
      return ((linegraph.width - padding_xaxis) / data_male.length) * val + (padding_xaxis * 1.5);
  }

  function getYPixel(val) {
      return linegraph.height - (((linegraph.height - padding_yaxis) / getMaxY()) * val) - padding_yaxis;
  }

  // get canvas context to load in the linegraph
  const linegraph = document.getElementById('container2')
  const l = linegraph.getContext('2d');


  // determine properties for the linegraph
  l.lineWidth = 2;
  l.strokeStyle = '#000';
  l.font = 'italic 10pt sans-serif';
  l.textAlign = "center";

  // append title
  l.fillText("No. of suicides", (linegraph.width + padding_xaxis) / 2, padding_yaxis)

  // draw x and y axis
  l.beginPath();
  l.moveTo(padding_xaxis, padding_yaxis);
  l.lineTo(padding_xaxis, linegraph.height - padding_yaxis);
  l.lineTo(linegraph.width - padding_xaxis, linegraph.height - padding_yaxis);
  l.stroke();

  // // convert years for x-axis regarding male
  // years_male = []
  // for (var i = 0; i < data_male.length; i ++) {
  //   // sum_male += data_male[i].x
  //   var s = d3v5.timeParse("%Y")
  //   y = s(data_male[i].x)
  //   console.log(y)
  //   year = data_male[i].x
  //   console.log(year)
  //   var s = new Date(year)
  //   console.log(s)
  //   var q = s.getYear();
  //   var w = Number(q);
  //   years_male.push(w);
  //   };
  // console.log(years_male)

  // determine style for y-axis values
  l.textAlign = "right";
  l.font = 'italic 10pt sans-serif';
  l.textBaseline = "middle";
  l.strokeStyle = '#bbb';

  // draw x-axis values
  for(var i = 0; i < data_male.length; i ++) {
    l.fillText(data_male[i].x, getXPixel(i), linegraph.height - padding_yaxis + 20);
  }

  // determine values of ticks
  function tickvalue() {
    var max = 0;
    if (sum_male > sum_female){
      for(var i = 0; i < data_male.length; i ++) {
          if(data_male[i].y > max) {
              max = data_male[i].y;
            }
        }
    }
    else {
        for(var i = 0; i < data_female.length; i ++) {
            if(data_female[i].y > max) {
                max = data_female[i].y;
              }
            }
          }
    tick_value = max / 10;
    return tick_value;
    }

  // draw y-axis values
  for(var i = 0; i < getMaxY(); i += tickvalue()) {
      l.fillText(i, padding_xaxis - 10, getYPixel(i));
      l.beginPath();
      l.moveTo(padding_xaxis, getYPixel(i));
      l.lineTo(linegraph.width, getYPixel(i));
      l.stroke();
  }

  // determine properties female line and draw it
  l.strokeStyle = '#ffb3e6';
  l.lineWidth = 2;
  l.beginPath();
  l.moveTo(getXPixel(0), getYPixel(data_female[0].y));

  for(var i = 1; i < data_female.length; i ++) {
      l.lineTo(getXPixel(i), getYPixel(data_female[i].y));
  }
  l.stroke();

  // // append dots
  // l.fillStyle = '#333';
  // for(var i = 0; i < data_female.length; i ++) {
  //     l.beginPath();
  //     l.arc(getXPixel(i), getYPixel(data_female[i].y), 4, 0, Math.PI * 2, true);
  //     l.fill();
  // }

  // determine properties female line and draw it
  l.strokeStyle = '#80aaff';
  l.lineWidth = 2;
  l.beginPath();
  l.moveTo(getXPixel(0), getYPixel(data_male[0].y));

  for(var i = 1; i < data_male.length; i ++) {
      l.lineTo(getXPixel(i), getYPixel(data_male[i].y));
  }
  l.stroke();

  // // append dots
  // l.fillStyle = '#333';
  // for(var i = 0; i < data_male.length; i ++) {
  //     l.beginPath();
  //     l.arc(getXPixel(i), getYPixel(data_male[i].y), 4, 0, Math.PI * 2, true);
  //     l.fill();
  // }

};
