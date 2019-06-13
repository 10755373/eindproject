// retrieve right data
function retrievedata_map(json){
  data = Object.values(json);
  list_values = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].sex == "male" && data[i].age == "15-24 years"){
      list = []
      list.push(data[i].alpha_code, data[i].suicides_no)
      // list_values[data[i].alpha_code] = data[i].suicides_no
      list_values.push(list)
    }
  }
  return list_values
};


function datapie(json, country){
  data_pie = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
      data_pie[data[i].sex] = data[i].suicides_no
    }
  }
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].country == country && data[i].sex == "female" && data[i].age == "15-24 years"){
      data_pie[data[i].sex] = data[i].suicides_no
    }
  }
  return data_pie
};

function datadonut(json, country){
  data_donut = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
      data_donut[data[i].sex] = data[i].population
    }
  }
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].country == country && data[i].sex == "female" && data[i].age == "15-24 years"){
      data_donut[data[i].sex] = data[i].population
    }
  }
  return data_donut

};

// https://github.com/markmarkoh/datamaps/blob/master/src/examples/highmaps_world.html
function colorscale(data_map){
  // We need to colorize every country based on "numberOfWhatever"
  // colors should be uniq for every value.
  // For this purpose we create palette(using min/max series-value)
  var data = data_map
  var data_set = {}
  var onlyValues = data.map(function(obj){ return obj[1]; });
  var minValue = Math.min.apply(null, onlyValues),
          maxValue = Math.max.apply(null, onlyValues);
  // create color palette function
  // color can be whatever you wish
  var paletteScale = d3.scale.linear()
          .domain([minValue,maxValue])
          .range(["#EFEFFF","#02386F"]); // blue color
  // fill dataset in appropriate format
  data.forEach(function(item){ //
      // item example value ["USA", 70]
      var iso = item[0],
              value = item[1];
      data_set[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
  });
  return data_set

};

function obtaincountrydatamale(data, country){
  data = Object.values(data)
  list = []
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_no
      list.push(dict)
}}
  return list
  };


function obtaincountrydatafemale(data, country){
  data = Object.values(data)
  list_linegraph_female = []
  for (i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "female" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_no
      list_linegraph_female.push(dict)
}}
  return list_linegraph_female
  };

/*
* Updates the visualizations with selected year
*/
function makeSlider() {

    // make a slider to slide over the years
    var slider = d3v5.sliderHorizontal()
      .min(1987)
      .max(2010)
      .step(1)
      .width(800)
      .tickFormat(d3v5.format(""))
      .on('onchange', val => {
          currentyear = val;
          // updateMap(currentyear);
          // retrievedata_map(json, currentyear)
          return currentyear
      });

    // put slider in svg
    var g = d3v5.select("#sliderMap").append("svg")
      .attr("width", 1000)
      .attr("height", 75)
      .append("g")
      .attr("transform", "translate(50,20)");

    g.call(slider);
};

// var test = [{"name":"aName","lastName":"aLastname"},{"name":"bName","lastName":"bLastname"}];
//
// for (var i = 0; i < test.length; ++i) {
//     alert(test[i].name + ", " + test[i].lastName);
// }

// function color_gradient_legend(){
//
//   // https://bl.ocks.org/duspviz-mit/9b6dce37101c30ab80d0bf378fe5e583
//   var w = 300, h = 50;
//
//     var key = d3.select("#legend1")
//       .append("svg")
//       .attr("width", w)
//       .attr("height", h);
//
//     var legend = key.append("defs")
//       .append("svg:linearGradient")
//       .attr("id", "gradient")
//       .attr("x1", "0%")
//       .attr("y1", "100%")
//       .attr("x2", "100%")
//       .attr("y2", "100%")
//       .attr("spreadMethod", "pad");
//
//     legend.append("stop")
//       .attr("offset", "0%")
//       .attr("stop-color", "#f7fcf0")
//       .attr("stop-opacity", 1);
//
//     legend.append("stop")
//       .attr("offset", "33%")
//       .attr("stop-color", "#bae4bc")
//       .attr("stop-opacity", 1);
//
//     legend.append("stop")
//       .attr("offset", "66%")
//       .attr("stop-color", "#7bccc4")
//       .attr("stop-opacity", 1);
//
//     legend.append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", "#084081")
//       .attr("stop-opacity", 1);
//
//     key.append("rect")
//       .attr("width", w)
//       .attr("height", h - 30)
//       .style("fill", "url(#gradient)")
//       .attr("transform", "translate(0,10)");
//
//     var y = d3.scaleLinear()
//       .range([300, 0])
//       .domain([68, 12]);
//
//     var yAxis = d3.axisBottom()
//       .scale(y)
//       .ticks(5);
//
//     key.append("g")
//       .attr("class", "y axis")
//       .attr("transform", "translate(0,30)")
//       .call(yAxis)
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("axis title");
// };


function data_pie(dummyvarable){
  // Create dummy data
  var data = {a: 9, b: 20, c:30, d:8, e:12}
  return data
};

// function datapie(data){
//   fetch("outputted.json")
//     .then(response => response.json())
//     .then(json => {
//         data = Object.values(json);
//         list_values = []
//         list_male = {}
//         list_female = {}
//         for (let i = 0; i < data.length; i++){
//           if (data[i].year == "2000" && data[i].sex == "male" && data[i].age == "15-24 years"){
//             list_male[data[i].alpha_code] = data[i].suicides_no
//             // list.push(data[i].alpha_code, data[i].suicides_no)
//             // list_values[data[i].alpha_code] = data[i].suicides_no
//           }
//           else if (data[i].year == "2000" && data[i].sex == "male" && data[i].age == "15-24 years"){
//             list_female[data[i].alpha_code] = data[i].suicides_no
//           }
//           else {
//             break
//           }
//         }
//         list_values.push(list_male)
//         list_values.push(list_female)
//         var data_pie = list_values
//         return data_pie
//       })};


// function parseData(data, country) {
//   var arr = [];
//   for (let i  = 0; i < data.length; i++){
//     if
//     arr.push(         {            date: new Date(i), //date            value: +data.bpi[i] //convert string to number         });   }   return arr;}
// };
//
// function parseData(data) {   var arr = [];   for (var i in data.bpi) {      arr.push(         {            date: new Date(i), //date            value: +data.bpi[i] //convert string to number         });   }   return arr;}
