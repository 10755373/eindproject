// draw worldmap
function initializeworldmap(json, year){

  var container1 = d3v5.select("#container1").node().getBoundingClientRect();

  console.log(year)
  data = Object.values(json)
  // console.log(data[0])
  series = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].sex == "male" && data[i].age == "15-24 years"){
      list = []
      // console.log(data[i].suicides_no)
      list.push(data[i].alpha_code, data[i].gdp_per_capita)
      // list_values[data[i].alpha_code] = data[i].suicides_no
      series.push(list)
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
  // render map
  new Datamap({
      element: document.getElementById('container1'),
      projection: 'mercator', // big world map
      // countries don't listed in dataset will be painted with this color
      fills: { defaultFill: '#ffff99' },
      data: dataset,
      geographyConfig: {
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        // when hovering over countries, don't change country's color
        highlightFillColor: function(geography) {
            return geography['fillColor'] || '#F5F5F5';
        },
        // change borderline only
        highlightBorderColor: '#2ECC71',
        popupTemplate: function(geography, data) {
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'GDP per capita: ' +  data.numberOfThings
      }},
      done: function(datamap) {
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
             country = geography.properties.name;
             console.log(country)
             // clickedoncountry(json, country)
             var data_male_total = obtaincountrydatamaletotal(data, country)
             var data_female_total = obtaincountrydatafemaletotal(data, country)
             // var data_male_100k = obtaincountrydatamale100k(json, country)
             // var data_female_100k = obtaincountrydatafemale100k(json, country)
             var gdp_per_capita = gdppercapita(data, country)
             // console.log(gdp_per_capita)
             var data_pie = datapie(data, country)
             var data_donut = datadonut(data, country)
              if (data_female_total.length > 0){
                drawlinegraph(data_male_total, data_female_total, gdp_per_capita);
                makepiechart(data_pie);
                // console.log(data_donut);
                // console.log(data_pie)
                makedonutchart(data_donut);
                //
                // makelinegraph(data_country_female, data_country_male)
                // donutchart(datadonut(json, country))
                // piechart(datapie(json, country))
              }
               else{
                 geendataland(country);
               }
         });
     }
  });


};
