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
      d3v5.select('#value').text(d3v5.timeFormat('%Y')(currentyear));
      year = d3v5.timeFormat('%Y')(currentyear)
      updateworldmap(json, year)
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
  data = Object.values(json)
  list_values = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == currentyear && data[i].sex == "male" && data[i].age == "15-24 years"){
      list = []
      list.push(data[i].alpha_code, data[i].gdp_per_capita)
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
  makemap(data_set);
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
          .range(["#5D6D7E","#212F3D"]); // blue color
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



function datapie(data, country){
  data_pie = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].country == country && data[i].age == "15-24 years"){
      data_pie[data[i].sex] = data[i].suicides_no
    }
  }
  return data_pie
};

function datadonut(data, country){
  data_donut = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].country == country && data[i].age == "15-24 years"){
      data_donut[data[i].sex] = data[i].population
    }
  }
  return data_donut
};


function obtaincountrydatamaletotal(data, country){
  list_linegraph_male_total = []
  dict_line_male = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_no
      list_linegraph_male_total.push(dict)
}}
  return list_linegraph_male_total
  };

function obtaincountrydatamale100k(json, country){
  data = Object.values(json)
  list_linegraph_male_100k = []
  dict_line_male = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_100k
      list_linegraph_male_100k.push(dict)
}}
  return list_linegraph_male_100k
  };

function obtaincountrydatafemaletotal(data, country){
  list_linegraph_female_total = []
  dict_line_female = {}
  for (i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "female" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_no
      list_linegraph_female_total.push(dict)
}}
  return list_linegraph_female_total
  };

function obtaincountrydatafemale100k(json, country){
  data = Object.values(json)
  list_linegraph_female_100k = []
  dict_line_male = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_100k
      list_linegraph_female_100k.push(dict)
}}
  return list_linegraph_female_100k
  };

function gdppercapita(data, country){
  list_gdp_per_capita = []
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].gdp_per_capita
      list_gdp_per_capita.push(dict)
}}
  return list_gdp_per_capita
};

function scatterdata(data, country){

  // console.log(data[0])
  series = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].sex == "male" && data[i].age == "15-24 years"){
      list_men = []
      list_men.push(data[i].country, data[i].gdp_per_capita)
      list_woman = []
      list_woman.push(data[i].country, data[i].gdp_per_capita)
      series.push(list_men, list_woman)
    }
  }
  console.log(series)

  // Datamaps expect data in format:
  // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
  //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
  var dataset = {};
  // We need to colorize every country based on "numberOfWhatever"
  // colors should be uniq for every value.
  // For this purpose we create palette(using min/max series-value)
  var onlyValues = series.map(function(obj){ return obj[1]; });
  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);
  // create color palette function
  // color can be whatever you wish
  var paletteScale = d3.scale.linear()
          .domain([minValue,maxValue])
          .range(["#99ccff","#000099"]); // blue color
  // fill dataset in appropriate format
  series.forEach(function(item){ //
      // item example value ["USA", 70]
      var iso = item[0],
              value = item[1];
      dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
  });
  console.log(dataset)
};
