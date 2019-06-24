function maketimeslider(json, sex, age){
//
  if ( $('#slider-time').is(':empty')){
    newtimeslider(json, sex, age)
  }
  else{
    updatetimeslider(json, sex, age)
  }};

  function newtimeslider(json, sex, age){
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
        d3v5.select('#value-time').text(d3v5.timeFormat('%Y')(val));
        currentyear = val
        d3v5.select('#value').text(d3v5.timeFormat('%Y')(currentyear));
        year = d3v5.timeFormat('%Y')(currentyear)
        updateworldmap(json, year, sex, age)
        drawscatterplot(json, year, sex, age)
        // var datamale = scattermaletest(json)
        // var datafemale = scatterfemaletest(json)
        // var merged = mergetest(datamale, datafemale)
        // // scattermale(json, year)
        // // scatterfemale(json, year)
        // // var scatter = merge(datamale, datafemale)
        // makescatterplot(merged)
      });

    var gTime = d3v5
      .select('#slider-time')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)');

    gTime.call(sliderTime);

    d3v5.select('#value-time').text(d3v5.timeFormat('%Y')(sliderTime.value()));
  }

  function updatetimeslider(json, sex, age){

    d3.select("div#slider-time").selectAll("*").remove();

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
        updateworldmap(json, year, sex, age)
        drawscatterplot(json, year, sex, age)
        updatetitlescatterplot(year, sex, age)
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

function timeslider(json, sex, age){
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
      updateworldmap(json, year, sex, age)
      drawscatterplot(json, year, sex, age)
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
function retrievedata_map(json, currentyear, sex, age){
  data = Object.values(json)
  list_values = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == currentyear && data[i].sex == sex && data[i].age == age){
      list = []
      list.push(data[i].alpha_code, data[i].suicides_no)
      list_values.push(list)
    }
  }

  var onlyValues = []
  for (let i = 0; i < list_values.length; i++){
    onlyValues.push(list_values[i][1])
  }

  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);

  // var paletteScale = d3v5.scaleLinear()
  //         .domain([minValue,maxValue])
  //         .range(["#99ccff", "#000099"]); // blue color

  var paletteScale = d3v5.scaleSequential()
      .domain([minValue, maxValue])
      .interpolator(d3v5.interpolateBlues);

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

function drawlegend(dataset) {

  var data = Object.values(dataset)
  onlyvalues = []
  for (let i = 0; i < data.length; i++){
    onlyvalues.push(data[i].numberOfThings)
  }

  var minValue = Math.min(... onlyvalues),
          maxValue = Math.max(... onlyvalues);

    colors = d3v5.scaleSequential(d3v5.interpolateBlues).domain([0, 500])

    var width = 500, height = 160;
    var svglegend = d3v5.select("#containerworldmap")
      .append("svg")
      .attr("id", "gradientlegend")
      .attr("width", width)
      .attr("height", height);
      //
      // key.append("text")
      //         .attr("x", (w / 2))
      //         .attr("y", h / 2.5 )
      //         .attr("text-anchor", "middle")
      //         .style("font-size", "20px")
      //         //.style("text-decoration", "underline")
      //         .style("font-style", "bold")
      //         .text("No of suicides");

    var legend = svglegend.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient");

    legend.selectAll("stop")
        .data(colors.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colors(t) })))
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    svglegend.append("rect")
      .attr("width", width)
      .attr("height", height - 130)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(0,100)");

    var y = d3v5.scaleLinear()
      .range([500, 0])
      .domain([maxValue, minValue]);
    var axisy = d3v5.axisBottom()
      .scale(y)
      .ticks(10);
    svglegend.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,130)")
      .call(axisy)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("axis title");
}


function retrievedata_scatter(json, currentyear, sex, age){
    data = Object.values(json)
    countries = {}
    for (let i = 0; i < data.length; i++){
      if (data[i].year == currentyear && data[i].sex == sex && data[i].age == age){
        countries[data[i].country] = {country: data[i].country, no: data[i].suicides_no, ratio: data[i].suicides_100k}
      }
    }
    return countries
  };

function datapienumber(json, country, year, secondgroup){
  data = Object.values(json)
  data_pie = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_pie[data[i].sex] = data[i].suicides_no
    }
  }
  return data_pie
};

function datadonutnumber(json, country, year, secondgroup){
  data = Object.values(json)
  data_donut = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_donut[data[i].sex] = data[i].population
    }
  }
  return data_donut
};

function datapieratio(json, country, year, secondgroup){
  data = Object.values(json)
  data_pie = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_pie[data[i].sex] = data[i].suicides_100k
    }
  }
  return data_pie
};

function datadonutratio(json, country, year, secondgroup){
  data = Object.values(json)
  data_donut = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_donut[data[i].sex] = data[i].population
    }
  }
  return data_donut
};

function obtaincountrydatamaletotal(json, country, secondgroup){
  data = Object.values(json)
  list_linegraph_male_total = []
  // dict2 = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == secondgroup){
      dict1 = {}
      dict1["x"] = data[i].year
      dict1["y"] = data[i].suicides_no
      // dict2[data[i].sex] = dict1
      list_linegraph_male_total.push(dict1)
}}
  return list_linegraph_male_total
  // return dict2
  };

function obtaincountrydatamale100k(json, country, secondgroup){
  data = Object.values(json)
  list_linegraph_male_100k = []
  // dict2 = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == secondgroup){
      dict1 = {}
      // dict2 = {}
      dict1["x"] = data[i].year
      dict1["y"] = data[i].suicides_100k
      // dict2[data[i].sex] = dict1
      list_linegraph_male_100k.push(dict1)
}}
  return list_linegraph_male_100k
  // return dict2
  };

function obtaincountrydatafemaletotal(json, country, secondgroup){
  data = Object.values(json)
  list_linegraph_female_total = []
  // dict2 = {}
  for (i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "female" && data[i].age == secondgroup){
      dict1 = {}
      // dict2 = {}
      dict1["x"] = data[i].year
      dict1["y"] = data[i].suicides_no
      // dict2[data[i].sex] = dict1
      list_linegraph_female_total.push(dict1)
}}
  return list_linegraph_female_total
  // return dict2
  };

function obtaincountrydatafemale100k(json, country, secondgroup){
  data = Object.values(json)
  list_linegraph_female_100k = []
  // dict2 = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "female" && data[i].age == secondgroup){
      dict1 = {}
      // dict2 = {}
      dict1["x"] = data[i].year
      dict1["y"] = data[i].suicides_100k
      // dict2[data[i].sex] = dict1
      list_linegraph_female_100k.push(dict1)
}}
  return list_linegraph_female_100k
  // return dict2
  };



function retrievetest(json, year, sex, age){
  data = Object.values(json)
  list_values_male = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].sex == sex, data[i].age == age){
      list = []
      list.push(data[i].alpha_code, data[i].suicides_no, data[i].suicides_100k, data[i].country)
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
    dict["suicides_no"] = list_values_male[i][1]
    dict["suicides_100k"] = list_values_male[i][2]
    dict["fillColor"] = paletteScale(list_values_male[i][1])
    dict["country"] = list_values_male[i][3]
    land = list_values_male[i][0]
    data_set[land] = dict
  }
  console.log(data_set)
  return data_set
  // makemap(data_set);
};

function data_scatter(data_set){
  data = Object.values(data_set)
  country = {}
  for (let i = 0; i < data.length; i++){
        country[data[i][3]] = {country: data[i][3], no: data[i][1], ratio: data[i][2]}
  }
  return country
}

function datapie(requests, country, year, value, secondgroup){
  data = Object.values(requests)
  data_pie = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_pie[data[i].sex] = data[i].suicides_no
    }
  }
  return data_pie
};

function datadonut(requests, country, year, value, secondgroup){
  data = Object.values(requests)
  data_donut = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup && data[i].age == secondgroup){
      data_donut[data[i].sex] = data[i].population
    }
  }
  return data_donut
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
