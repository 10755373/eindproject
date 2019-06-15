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

/*
Draws export line chart for selected countries.
https://github.com/jellewe/programmeerproject/blob/master/javascript/project.js
*/
function drawlinegraph1(data_male, data_female) {
  // // only draw new line chart if country is not Netherlands
  // if (country != "NLD") {
  //
  //   // if chart title does not exist yet, draw it
  //   if (!d3.select("#lineChart-title").select("div")[0][0]) {
  //     d3.select("#lineChart-title")
  //     .append("div")
  //       .append("text")
  //         .text("Export data of Netherlands to countries");
  //   };
    var data_male = data_male
    var data_female = data_female
    console.log(data_male)
    console.log(data_female)


    // for (element in data_male){
    //   console.log(data_male[element])
    // // }
    // for (element in data_female){
    //   console.log(data_female[element])
    // }


    d3.select("#container2").selectAll("*").remove();

    var margin = {top: 120, right: 70, bottom: 70, left: 70};

    var divsize = d3.select("#container2").node().getBoundingClientRect();

    // width and height of graph in pixels
    var width = divsize.width - margin.left - margin.right;
    var height = divsize.height - margin.top - margin.bottom;

    var parseTime = d3.timeParse("%y");
    // var parseTime = d3v5.timeFormat('%Y')

    // g element for line chart
    var linegraph = d3.select("#container2")
      .append("svg")
      .attr("id", "linegraph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," +
                             margin.top + ")");

    // // open export data file
    // d3.json("https://raw.githubusercontent.com/jellewe/programmeerproject/master/doc/export_data.json", function(error, exportData) {
    //   if (error) {
    //     window.alert("an error has occured: " + error);
    //   };
    //
    //   // arrays for export and year information
    //   var exportArray = [];
    //   var yearArray = [];
    //   for (key in exportData[country]) {
    //     yearArray.push(parseInt(key));
    //     exportArray.push(parseInt(exportData[country][key]));
    //   };
    //
    //   // check if all data available, else show 'no data' message to user
    //   var noData = false;
    //   exportArray.forEach(function(item) {
    //     if ((!item)) {
    //       noData = true;
    //     };
    //   });
    //   if (noData) {
    //     noDataMessage(data[country]["name"]);
    //   };
    //
    //   // if line not yet drawn, draw it
    //   if (!(lineData[country]) && noData == false) {
    //     lineData[country] = exportArray;
    //   }
    //
    //   // if line already drawn or no data, remove it
    //   else {
    //     delete lineData[country];
    //   };

    // // sum up all the values regarding the men
    // sum_male = 0
    // data_male.forEach(function(item){
    //   sum_male.push()
    // })
    // for (key in data_male[i]) {
    //   // console.log(data_male[i].y)
    //   sum_male += data_male[i].y
    // };

    // sum up all the values regarding the woman
    sum_male = 0
    for (var i = 0; i < data_male.length; i ++) {
      sum_male += data_male[i].y
    };

    // sum up all the values regarding the woman
    sum_female = 0
    for (var i = 0; i < data_female.length; i ++) {
      sum_female += data_female[i].y
    };
    // console.log(sum_female)

    male_yvalues = []
    male_xvalues = []
    for (var i = 0; i < data_male.length; i ++) {
      // console.log(data_male[i].y)
      male_yvalues.push(data_male[i].y)
      male_xvalues.push(data_male[i].x)
    };

    female_yvalues = []
    male_xvalues = []
    for (var i = 0; i < data_female.length; i ++) {
      female_yvalues.push(data_female[i].y)
      male_xvalues.push(data_male[i].x)
    };

    var maxymale = d3.max(male_yvalues)
    var maxyfemale = d3.max(female_yvalues)

    // determine values of ticks
    function maxyvalue() {
      if (maxymale > maxyfemale){
        return maxymale
      }
      else {
        return maxyfemale
            }
      }

    console.log(maxymale)

    // scales for x and y dimensions
    var scalex = d3.scale.linear()
      .domain([d3.min(male_xvalues, function(d) { return d.male_xvalues }),
               d3.max(male_xvalues, function(d) { return d.male_xvalues })])
      .range([0, width]);

    var scaley = d3.scale.linear()
      .domain([0, maxyvalue()])
      .range([height, 0]);

    // variables for x and y axes
    var axisx = d3.svg.axis()
      .scale(scalex)
      .orient("bottom")
      .ticks(10)
      .tickFormat(d3.format("d"));
    var axisy = d3.svg.axis()
      .scale(scaley)
      .orient("left");

    // g element for x axis
    linegraph.append("g")
      .attr("class", "x axis")
      .style("font-size", "10px")
      .attr("transform", "translate(0," + height + ")")
      .call(axisx)
      .selectAll("text")
        .style("font-size", "10px")

    // g element for y axis
    linegraph.append("g")
      .attr("class", "y axis")
      .call(axisy)
      .selectAll("text")
        .style("font-size", "10px");

    // label for y axis
    linegraph.select(".y")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("yScale", 6)
      .attr("dy", "1.5em")
      .style("text-anchor", "end")
      .attr("font-size", "10px")
      .text("No of suicides");

    // var drawlines = d3.svg.line()
    //   .defined(function(d) { return d; })
    //   .x(function(d, i) { return scalex(data_male[element.x]); })
    //   .y(function(d) { return scaley(data_male[element.y]); });

      // define the line
    var drawlines = d3.line()
      .scalex(function(d) { return x(d.x); })
      .scaley(function(d) { return y(d.y); });


    // var colors = d3v5.scaleOrdinal()
    //   .domain(["male", "female"])
    //   .range(["#80aaff", "#ffb3e6"]);

    // Add the valueline path.
     linegraph.append("path")
         .data([data_male])
         .attr("class", "line")
         .attr("d", drawlines)

    // for (element in data_male) {
    //   linegraph.append("path")
    //     .attr("id", "line")
    //     .data(data_male[element])
    //     .attr("stroke", "#80aaff")
    //     .attr("stroke-width", "3px")
    //     .attr("fill", "none")
    //     .attr("d", drawlines(data_male[element]));

      // // draw country text next to line
      // var lastDatum = [yearArray.slice(-1)[0], lineData[key].slice(-1)[0]];
      // linegraph.append("text")
      //   .attr("id", "line-name")
      //   .data(lineData[key])
      //   .attr("transform", function(d, i) {
      //     return "translate (" + xScale(lastDatum[0]) + "," +
      //            yScale(lastDatum[1]) + ")"; })
      //   .text(data[key]["name"]);
      //
      // dataIndex += 1;
    };



function linegraph(json){

  data_male = Object.values(json);

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // parse the date / time
  var parseTime = d3.timeFormat("%Y");

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.no); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#container2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  list = []
  for (let i = 0; i < data_male.length; i++){
    if (data_male[i].country == "Germany" && data_male[i].sex == "male" && data_male[i].age == "15-24 years"){
      dict = {}
      dict["date"] = parseTime(data_male[i].year)
      dict["no"] = +data_male[i].suicides_no
      list.push(dict)
    }}
    console.log(list)
  // // Get the data
  // d3.csv("data.csv", function(error, data) {
  //   // if (error) throw error;
  //   console.log(data)
  //
  // listed = []
  // for (let i = 0; i < list.length; i++){
  //
  // }
  //   // format the data
  //   data.forEach(function(d) {
  //       d.date = parseTime(d.date);
  //       d.no = +d.no;
  //   });
  //
  //   data = []
  //   for (let i = 0; i < data_male.length; i++){
  //     if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
  //       dict = {}
  //       dict["x"] = data[i].year
  //       dict["y"] = data[i].suicides_no
  //       list.push(dict)
  //     }}

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.no; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));



  // // https://www.d3-graph-gallery.com/graph/line_basic.html
  //
  // // set the dimensions and margins of the graph
  // var margin = {top: 40, right: 40, bottom: 40, left: 40},
  //     width = 700 - margin.left - margin.right,
  //     height = 800 - margin.top - margin.bottom;
  //
  // // append the svg object to the body of the page
  // var svg = d3.select("#my_dataviz")
  //   .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //     .attr("transform",
  //           "translate(" + margin.left + "," + margin.top + ")");
  //
  // var country = "Germany"
  //
  // data = Object.values(json);
  // list_values = []
  // for (let i = 0; i < data.length; i++){
  //   if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
  //     // list_val = []
  //     // date = {}
  //     // value = {}
  //     // date["date"] = data[i].year
  //     // value["value"] = data[i].suicides_100k
  //     // // list[data[i].year] = data[i].suicides_no
  //     // // list.push(data[i].alpha_code, data[i].suicides_no)
  //     // // list_values[data[i].alpha_code] = data[i].suicides_no
  //     // list_val.push(date, value)
  //     // list_values.push(list_val)
  //     dict = {}
  //     dict["date"] = d3.timeParse("%Y")data[i].year
  //     dict["value"] = data[i].suicides_100k
  //     list_values.push(dict)
  //   }
  //   }
  //
  // console.log(list_values)
  // var data = list_values
  //
  //   // // When reading the csv, I must format variables:
  //   // function(d){
  //   //   return { date : d3.timeParse("%Y")(d.date), value : d.value }
  //   // },
  //
  //   // Now I can use this dataset:
  //   function(data) {
  //
  //     // Add X axis --> it is a date format
  //     var x = d3.scaleTime()
  //       .domain(d3.extent(data, function(d) { return d.date; }))
  //       .range([ 0, width ]);
  //     svg.append("g")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(d3.axisBottom(x));
  //
  //     // Add Y axis
  //     var y = d3.scaleLinear()
  //       .domain([0, d3.max(data, function(d) { return +d.value; })])
  //       .range([ height, 0 ]);
  //     svg.append("g")
  //       .call(d3.axisLeft(y));
  //
  //     // Add the line
  //     svg.append("path")
  //       .datum(data)
  //       .attr("fill", "none")
  //       .attr("stroke", "steelblue")
  //       .attr("stroke-width", 1.5)
  //       .attr("d", d3.line()
  //         .x(function(d) { return x(d.date) })
  //         .y(function(d) { return y(d.value) })
  //         )
  //
  // })


};
