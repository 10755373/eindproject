/*
* Updates the visualizations with selected year
https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
*/
function makeslider() {

    // make a slider to slide over the years
    var slider = d3v5.sliderHorizontal()
      .min(1987)
      .max(2010)
      .step(1)
      .width(800)
      .displayValue(false)
      .tickFormat(d3v5.format(""))
      .on('onchange', val => {
          currentyear = val
          // console.log(currentyear)
          // updateMap(currentyear);
          // worldmap(json, currentyear)
          // return currentyear;
          d3v5.select('#value').text(currentyear);
      });

    // put slider in svg
    var g = d3v5.select("#slider").append("svg")
      .attr("width", 1000)
      .attr("height", 75)
      .append("g")
      .attr("transform", "translate(50,20)");

    g.call(slider);
};

// function callslider(json){
// var slider = d3v5
//   .sliderHorizontal()
//   .min(1987)
//   .max(2010)
//   .step(1)
//   .width(800)
//   .displayValue(false)
//   .on('onchange', val => {
//     currentyear = val
//     d3v5.select('#value').text(currentyear);
//     worldmap(json, currentyear)
//   });
//
// d3v5.select('#slider')
//   .append('svg')
//   .attr('width', 500)
//   .attr('height', 300)
//   .append('g')
//   .attr('transform', 'translate(30,30)')
//   .call(slider);
// };

function timeslider(json){
  // Time
  var dataTime = d3v5.range(0, 24).map(function(d) {
    return new Date(1987 + d, 10, 3);
  });

  var sliderTime = d3v5
    .sliderBottom()
    .min(d3v5.min(dataTime))
    .max(d3v5.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(800)
    .tickFormat(d3v5.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(1987, 10, 3))
    .on('onchange', val => {
      d3v5.select('p#value-time').text(d3v5.timeFormat('%Y')(val));
      currentyear = val
      // console.log(currentyear)
      // console.log(typeof(currentyear))
      d3v5.select('#value').text(d3v5.timeFormat('%Y')(currentyear));
      year = d3v5.timeFormat('%Y')(currentyear)
      worldmap(json, year)
    });

  var gTime = d3v5
    .select('div#slider-time')
    .append('svg')
    .attr('width', 1000)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  d3v5.select('p#value-time').text(d3v5.timeFormat('%Y')(sliderTime.value()));
}

// retrieve right data
function retrievedata_map(json, currentyear){
  // currentyear = makeSlider();
  // console.log(currentyear)
  data = Object.values(json)
  // console.log(data[0])
  list_values = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == currentyear && data[i].sex == "male" && data[i].age == "15-24 years"){
      list = []
      // console.log(data[i].suicides_no)
      list.push(data[i].alpha_code, data[i].suicides_no)
      // list_values[data[i].alpha_code] = data[i].suicides_no
      console.log(list)
      list_values.push(list)
    }
  }

  var onlyValues = []
  for (let i = 0; i < list_values.length; i++){
    onlyValues.push(list_values[i][1])
  }
  console.log(onlyValues)

  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);
  console.log(minValue)
  console.log(maxValue)

  var paletteScale = d3.scale.linear()
          .domain([minValue,maxValue])
          .range(["#EFEFFF","#02386F"]); // blue color

  var data_set = {}
  for (let i = 0; i < list_values.length; i++){
    dict = {}
    console.log(list_values[i][1])
    dict["numberOfThings"] = list_values[i][1]
    dict["fillColor"] = paletteScale(list_values[i][1])
    console.log(paletteScale(list_values[i][1]))
    land = list_values[i][0]
    console.log(land)
    data_set[land] = dict
  }
  console.log(data_set)
  // return data_set
  makemap(data_set);

// return list_values
  // colorscale(list_values)
  // console.log(list_values)
};

// https://github.com/markmarkoh/datamaps/blob/master/src/examples/highmaps_world.html
function colorscale(data_map){
  // We need to colorize every country based on "numberOfWhatever"
  // colors should be uniq for every value.
  // For this purpose we create palette(using min/max series-value)
  var data_map = data_map
  console.log(typeof(data_map))
  var onlyValues = []
  data_map.forEach(function(element){
    onlyValues.push(data_map[i][1])
  })
  // for (var i = 0; i < data_map.length; i++){
  //   console.log(data_map[i][1])
  //   onlyValues.push(data_map[i][1])
  // }
  console.log(onlyValues)
  // var onlyValues = data.map(function(obj){ return obj[1]; });
  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);
  console.log(minValue)
  console.log(maxValue)
  // create color palette function
  // color can be whatever you wish
  var paletteScale = d3.scale.linear()
          .domain([minValue,maxValue])
          .range(["#EFEFFF","#02386F"]); // blue color
  var data_set = {}
  for (let i = 0; i < data_map.length; i++){
    dict = {}
    console.log(data_map[i][1])
    dict["numberOfThings"] = data_map[i][1]
    dict["fillColor"] = paletteScale(data_map[i][1])
    console.log(paletteScale(data_map[i][1]))
    data_set[data_map[i][0]] = dict
  }
  console.log(data_set)
  // // fill dataset in appropriate format
  // data.forEach(function(item){ //
  //     // item example value ["USA", 70]
  //     var iso = item[0],
  //             value = item[1];
  //     data_set[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
  // });
  return data_set
  // makemap(data_set)
};



function datapie(json){
  data_pie = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].country == "Germany" && data[i].age == "15-24 years"){
      data_pie[data[i].sex] = data[i].suicides_no
    }
  }
  return data_pie
};

function datadonut(json){
  data_donut = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].country == "Germany" && data[i].age == "15-24 years"){
      data_donut[data[i].sex] = data[i].population
    }
  }
  return data_donut
};

// function datadonut(json, country){
//   data_donut = {}
//   for (let i = 0; i < data.length; i++){
//     if (data[i].year == "2000" && data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
//       data_donut[data[i].sex] = data[i].population
//     }
//   }
//   for (let i = 0; i < data.length; i++){
//     if (data[i].year == "2000" && data[i].country == country && data[i].sex == "female" && data[i].age == "15-24 years"){
//       data_donut[data[i].sex] = data[i].population
//     }
//   }
//   return data_donut
//
// };


function obtaincountrydatamaletotal(json){
  data = Object.values(json)
  list_linegraph_male_total = []
  dict_line_male = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == "Germany" && data[i].sex == "male" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_no
      list_linegraph_male_total.push(dict)
      // dict_line_male[data[i].year] = data[i].suicides_no
}}
  return list_linegraph_male_total
  // return dict_line_male
  };

function obtaincountrydatamale100k(json){
  data = Object.values(json)
  list_linegraph_male_100k = []
  dict_line_male = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == "Germany" && data[i].sex == "male" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_100k
      list_linegraph_male_100k.push(dict)
      // dict_line_male[data[i].year] = data[i].suicides_no
}}
  return list_linegraph_male_100k
  // return dict_line_male
  };

function obtaincountrydatafemaletotal(json){
  data = Object.values(json)
  list_linegraph_female_total = []
  dict_line_female = {}
  for (i = 0; i < data.length; i++){
    if (data[i].country == "Germany" && data[i].sex == "female" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_no
      list_linegraph_female_total.push(dict)
      // dict_line_female[data[i].year] = data[i].suicides_no
}}
  return list_linegraph_female_total
  // return dict_line_female
  };

function obtaincountrydatafemale100k(json){
  data = Object.values(json)
  list_linegraph_female_100k = []
  dict_line_male = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == "Germany" && data[i].sex == "male" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_100k
      list_linegraph_female_100k.push(dict)
      // dict_line_male[data[i].year] = data[i].suicides_no
}}
  return list_linegraph_female_100k
  // return dict_line_male
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
