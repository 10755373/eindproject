// function regarding the timeslider
function maketimeslider(json, sex, age){
//
  if ( $('#slider-time').is(':empty')){
    newtimeslider(json, sex, age)
  }
  else{
    updatetimeslider(json, sex, age)
  }};

  function newtimeslider(json, sex, age){
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
      // .style("font-size", "12px")
      // .style('fill', 'black')
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
  // gather data if gender in dropdown is female
  list_values = []
  if (sex == "female"){
  for (let i = 0; i < data.length; i++){
    if (data[i].year == currentyear && data[i].sex == sex && data[i].age == age){
      list = []
      list.push(data[i].alpha_code, data[i].suicides_no)
      list_values.push(list)
    }
  }
  // retrieve only the values
  var onlyValues = []
  for (let i = 0; i < list_values.length; i++){
    onlyValues.push(list_values[i][1])
  }

// `find min and max values`
  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);

// determine colors based on a color gradient scale
  var paletteScale = d3v5.scaleSequential()
      .domain([minValue, maxValue])
      // .range(["#b3b3ff", "#000066"]);
      .interpolator(d3v5.interpolatePuRd);

// place in a dict for use of the worldmap
  var data_set = {}
  for (let i = 0; i < list_values.length; i++){
    dict = {}
    dict["numberOfThings"] = list_values[i][1]
    dict["fillColor"] = paletteScale(list_values[i][1])
    land = list_values[i][0]
    data_set[land] = dict
  }
  return data_set
}

// gather data in case the dropdown-gender is male
else{
  for (let i = 0; i < data.length; i++){
    if (data[i].year == currentyear && data[i].sex == sex && data[i].age == age){
      list = []
      list.push(data[i].alpha_code, data[i].suicides_no)
      list_values.push(list)
    }
  }

  // retrieve only the values
  var onlyValues = []
  for (let i = 0; i < list_values.length; i++){
    onlyValues.push(list_values[i][1])
  }

// determine the min and max values
  var minValue = Math.min(... onlyValues),
          maxValue = Math.max(... onlyValues);

// determine colors based on a color gradient scale
  var paletteScale = d3v5.scaleSequential()
      .domain([minValue, maxValue])
      // .range(["#b3b3ff", "#000066"]);
      .interpolator(d3v5.interpolateBlues);

// make dict for use of the worldmap
  var data_set = {}
  for (let i = 0; i < list_values.length; i++){
    dict = {}
    dict["numberOfThings"] = list_values[i][1]
    dict["fillColor"] = paletteScale(list_values[i][1])
    land = list_values[i][0]
    data_set[land] = dict
  }
  return data_set
}

};

// function regarding the legend of the worldmap and scatterplot
function drawlegend(dataset, sex) {

// get only the values
  var data = Object.values(dataset)
  onlyvalues = []
  for (let i = 0; i < data.length; i++){
    onlyvalues.push(data[i].numberOfThings)
  }

// determine the min and max values
  var minValue = Math.min(... onlyvalues),
          maxValue = Math.max(... onlyvalues);

  // append svg fto place legend in
  var width = 500, height = 100;
  var svglegend = d3v5.select("#containerworldmap")
    .append("svg")
    .attr("id", "gradientlegend")
    .attr("width", width)
    .attr("height", height);

  // append linear gradient to that svg
  var legend = svglegend.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient");

// in case gender in dropdown is female
  if (sex == "female"){
  colors = d3v5.scaleSequential(d3v5.interpolatePuRd).domain([0, 500])
  legend.selectAll("stop")
      .data(colors.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colors(t) })))
      .enter().append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);
    }

  // in case the gender is male
  else{
    colors = d3v5.scaleSequential(d3v5.interpolateBlues).domain([0, 500])

    legend.selectAll("stop")
        .data(colors.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colors(t) })))
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);
  }

  // append rect in svg
    svglegend.append("rect")
      .attr("width", 490)
      .attr("height", 20)
      .style("fill", "url(#gradient)")
      .attr("x", 10)
      .attr("y", 40);

// determine y range and domain
    var y = d3v5.scaleLinear()
      .range([500, 0])
      .domain([maxValue, minValue]);

  // determine y axis
    var axisy = d3v5.axisBottom()
      .scale(y)
      .ticks(10);

  // append g to the svg
  svglegend.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(10,60)")
    .call(axisy)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("axis title");

// append title to the svg
  svglegend.append("text")
          .attr("x", (width / 2))
          .attr("y", (height / 3) )
          .attr("text-anchor", "middle")
          .style("font-size", "15px")
          .style("text-decoration", "underline")
          .style("font-style", "bold")
          .text("Color gradient legend based on the no of suicides");
}

// function to retrieve data for the scaterplot
function retrievedata_scatter(json, currentyear, sex, age){
    data = Object.values(json)
    // make a dict based on options which are chosen in the dropdowns
    countries = {}
    for (let i = 0; i < data.length; i++){
      if (data[i].year == currentyear && data[i].sex == sex && data[i].age == age){
        countries[data[i].country] = {country: data[i].country, no: data[i].suicides_no, ratio: data[i].suicides_100k}
      }
    }
    return countries
  };

// function to retrieve data for the piechart in case user would like to see the absolute number of suicides
function datapienumber(json, country, year, secondgroup){
  data = Object.values(json)
  // gather data and put it into a dict
  data_pie = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_pie[data[i].sex] = data[i].suicides_no
    }
  }
  return data_pie
};

// function to retrieve data for the donut in case would like to see the absolute number of suicides
function datadonutnumber(json, country, year, secondgroup){
  data = Object.values(json)
  // gather data and put it into a dict
  data_donut = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_donut[data[i].sex] = data[i].population
    }
  }
  return data_donut
};

// function to retrieve data for the piechart in case user would like to see the ratio of suicides
function datapieratio(json, country, year, secondgroup){
  data = Object.values(json)
  // gather info and put it into a dict
  data_pie = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_pie[data[i].sex] = data[i].suicides_100k
    }
  }
  return data_pie
};

// function to retrieve data for the donut in case would like to see the ratio of suicides
function datadonutratio(json, country, year, secondgroup){
  data = Object.values(json)
  // gather data and put it into a dict
  data_donut = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].country == country && data[i].age == secondgroup){
      data_donut[data[i].sex] = data[i].population
    }
  }
  return data_donut
};

// function to retrieve data for the linegraph ragarding males in case user would like to see the absulote number of suicides
function obtaincountrydatamaletotal(json, country, secondgroup){
  data = Object.values(json)
  // make a dict so data is usable for the linegraph
  list_linegraph_male_total = []
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == secondgroup){
      // put the data into a dict
      dict1 = {}
      dict1["x"] = data[i].year
      dict1["y"] = data[i].suicides_no
      // place the dict into to list
      list_linegraph_male_total.push(dict1)
}}
  // return the list with dicts
  return list_linegraph_male_total
  };

function obtaincountrydatamale100k(json, country, secondgroup){
  data = Object.values(json)
  // make a dict so data is usable for the linegraph
  list_linegraph_male_100k = []
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "male" && data[i].age == secondgroup){
      // put the data into a dict
      dict1 = {}
      dict1["x"] = data[i].year
      dict1["y"] = data[i].suicides_100k
      // place the dict into to list
      list_linegraph_male_100k.push(dict1)
}}
// return the list with dicts
  return list_linegraph_male_100k
  };

  // function to retrieve data for the linegraph ragarding females in case user would like to see the absulote number of suicides
function obtaincountrydatafemaletotal(json, country, secondgroup){
  data = Object.values(json)
  // make a dict so data is usable for the linegraph
  list_linegraph_female_total = []
  for (i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "female" && data[i].age == secondgroup){
      // put the data into a dict
      dict1 = {}
      dict1["x"] = data[i].year
      dict1["y"] = data[i].suicides_no
      // place the dict into to list
      list_linegraph_female_total.push(dict1)
}}
  // return the list with dicts
  return list_linegraph_female_total
  };

// function to retrieve data for the linegraph ragarding females in case user would like to see the ratio of suicides
function obtaincountrydatafemale100k(json, country, secondgroup){
  data = Object.values(json)
  // make a dict so data is usable for the linegraph
  list_linegraph_female_100k = []
  for (let i = 0; i < data.length; i++){
    if (data[i].country == country && data[i].sex == "female" && data[i].age == secondgroup){
      // put the data into a dict
      dict1 = {}
      dict1["x"] = data[i].year
      dict1["y"] = data[i].suicides_100k
      // place the dict into to list
      list_linegraph_female_100k.push(dict1)
}}
  // return the list with dicts
  return list_linegraph_female_100k
  };
