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
      // var datamale = scattermaletest(json)
      // var datafemale = scatterfemaletest(json)
      // var merged = mergetest(datamale, datafemale)
      // // scattermale(json, year)
      // // scatterfemale(json, year)
      // // var scatter = merge(datamale, datafemale)
      // makescatterplot(merged)
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
// Based on: // https://github.com/markmarkoh/datamaps/blob/master/src/examples/highmaps_world.html
function retrievedata_map(json, currentyear){
  data = Object.values(json)
  list_values = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == currentyear && data[i].sex == "male" && data[i].age == "15-24 years"){
      list = []
      list.push(data[i].alpha_code, data[i].gdp_per_capita)
      list_values.push(list)
    }
  }

  var onlyValues = []
  for (let i = 0; i < list_values.length; i++){
    onlyValues.push(list_values[i][1])
  }

  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);


  var paletteScale = d3.scale.linear()
          .domain([minValue,maxValue])
          .range(["#99ccff", "#000099"]); // blue color

  var data_set = {}
  for (let i = 0; i < list_values.length; i++){
    dict = {}
    dict["numberOfThings"] = list_values[i][1]
    dict["fillColor"] = paletteScale(list_values[i][1])
    land = list_values[i][0]
    data_set[land] = dict
  }
  return data_set
};

function retrievedata_maptestmale(json, year){
  data = Object.values(json)
  list_values_male = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].sex == "male"){
      list = []
      list.push(data[i].alpha_code, data[i].suicides_no)
      list_values_male.push(list)
    }}

  console.log(list_values_male)

  var onlyValues = []
  for (let i = 0; i < list_values_male.length; i++){
        onlyValues.push(list_values_male[i][1])
  }
  console.log(onlyValues)


  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);


  var paletteScale = d3.scale.linear()
          .domain([minValue,maxValue])
          .range(["#99ccff", "#000099"]); // blue color

  var data_set = {}
  for (let i = 0; i < list_values_male.length; i++){
    dict = {}
    dict["numberOfThings"] = list_values_male[i][1]
    dict["fillColor"] = paletteScale(list_values_male[i][1])
    land = list_values_male[i][0]
    data_set[land] = dict
  }
  console.log(data_set)
  return data_set
  // makemap(data_set);
};

function retrievedata_maptest(json, year){
  data = Object.values(json)
  list_values_male = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].sex == "male"){
      list = []
      list.push(data[i].alpha_code, data[i].suicides_no)
      list_values_male.push(list)
    }
  }
  list_values_female = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].sex == "female"){
      list = []
      list.push(data[i].alpha_code, data[i].suicides_no)
      list_values_female.push(list)
    }
  }
  console.log(list_values_male)
  console.log(list_values_female)

  var onlyValues = []
  for (let i = 0; i < list_values_male.length; i++){
    for (let i = 0; i < list_values_female.length; i++){
      if (list_values_male[i][0] == list_values_female[i][0]){
        values = 0
        values += (list_values_male[i][1] + list_values_female[i][1])
        onlyValues.push(values)
  }}}
  console.log(onlyValues)


  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);


  var paletteScale = d3.scale.linear()
          .domain([minValue,maxValue])
          .range(["#99ccff", "#000099"]); // blue color

  var data_set = {}
  for (let i = 0; i < list_values_male.length; i++){
    for (let i = 0; i < list_values_female.length; i++){
      if (list_values_male[i][0] == list_values_female[i][0])
    {dict = {}
    dict["numberOfThings"] = (list_values_male[i][1] + list_values_female[i][1])
    dict["fillColor"] = paletteScale((list_values_male[i][1] + list_values_female[i][1]))
    land = list_values_male[i][0]
    data_set[land] = dict}
  }}
  console.log(data_set)
  return data_set
  // makemap(data_set);
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

function datamaleoption(data, country){
  list_linegraph_male_total = []
  dict_line_male = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_no
      dict["z"] = data[i].age
      list_linegraph_male_total.push(dict)
}}
  return list_linegraph_male_total
  };

function datafemaleoption(data, country){
  list_linegraph_female_total = []
  dict_line_female = {}
  for (i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "female"){
      dict = {}
      dict["x"] = data[i].year
      dict["y"] = data[i].suicides_no
      dict["z"] = data[i].age
      list_linegraph_female_total.push(dict)
}}
  return list_linegraph_female_total
  };

function scattermale(json){
  data = Object.values(json)
  datamale = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].sex == "male", data[i].age == "25-34 years"){
      list = []
      list.push(data[i].country, data[i].suicides_100k)
      datamale.push(list)
}}
return datamale
};

function scatterfemale(json){
  data = Object.values(json)
  datafemale = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].sex == "female", data[i].age == "25-34 years"){
      list = []
      list.push(data[i].country, data[i].suicides_100k)
      datafemale.push(list)
}}
return datafemale
};

function merge(datamale, datafemale){
  country = {}
  for (let i = 0; i < datamale.length; i++){
    for (let i = 0; i < datafemale.length; i++){
      if (datamale[i][0] == datafemale[i][0]){
        if (datamale[i][1] > 2500 || datafemale[i][1] > 2500){
          i++
        }
        else{
        country[datamale[i][0]] = {country: datamale[i][0], male: datamale[i][1], female: datafemale[i][1]}
      }
      }
    }
  }
  return country
}

// function scattermaletest(json, year){
//   data = Object.values(json)
//   datamale = []
//   for (let i = 0; i < data.length; i++){
//     if (data[i].year == year && data[i].sex == "male", data[i].age == "15-24 years"){
//       list = []
//       list.push(data[i].country, data[i].suicides_no)
//       datamale.push(list)
// }}
// return datamale};
//
// function scatterfemaletest(json, year){
//   data = Object.values(json)
//   datafemale = []
//   for (let i = 0; i < data.length; i++){
//     if (data[i].year == year && data[i].sex == "female", data[i].age == "15-24 years"){
//       list = []
//       list.push(data[i].country, data[i].suicides_no)
//       datafemale.push(list)
// }}
// return datafemale
// };
//
// function mergetest(datamale, datafemale){
//   country = {}
//   for (let i = 0; i < datamale.length; i++){
//     for (let i = 0; i < datafemale.length; i++){
//       if (datamale[i][0] == datafemale[i][0]){
//         if (datamale[i][1] > 100 || datafemale[i][1] > 100){
//           i++
//         }
//         else{
//         country[datamale[i][0]] = {country: datamale[i][0], male: datamale[i][1], female: datafemale[i][1]}
//       }
//       }
//     }
//   }
//   return country
// }


// function scattermale1(json){
//   data = Object.values(json)
//   datamale = []
//   for (let i = 0; i < data.length; i++){
//     if (data[i].year == "2000" && data[i].sex == "male"){
//       list = []
//       list.push(data[i].country, data[i].suicides_no)
//       datamale.push(list)
// }}
// console.log(datamale)
// return datamale};
//
// function scatterfemale1(json){
//   data = Object.values(json)
//   datafemale = []
//   for (let i = 0; i < data.length; i++){
//     if (data[i].year == "2000" && data[i].sex == "female"){
//       list = []
//       list.push(data[i].country, data[i].suicides_no)
//       datafemale.push(list)
// }}
// return datafemale
// };
//
// function merge1(datamale, datafemale){
//   console.log(datamale)
//   country = {}
//   for (let i = 0; i < datamale.length; i++){
//     for (let i = 0; i < datafemale.length; i++){
//       if (datamale[i][0] == datafemale[i][0]){
//         // if (datamale[i][1] > 100 || datafemale[i][1] > 100){
//         //   i++
//         // }
//         // else{
//         males = 0
//         females = 0
//         males += datamale[i][1]
//         females += datafemale[i][1]
//         country[datamale[i][0]] = {country: datamale[i][0], male: datamale[i][1], female: datafemale[i][1]}
//       // }
//       }
//     }
//   }
//   return country
// }
