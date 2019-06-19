// draw worldmap
function updateworldmap(json, year, sex, age){

  d3.select("#container1").selectAll("*").remove();

  var dataset = retrievedata_map(json, year, sex, age)
  console.log(dataset)
  var json = json
  var map = new Datamap({
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
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Suicides no: ' +  data.numberOfThings
      }},
       done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              country = geography.properties.name;
              console.log(country)
              console.log(year)
              console.log(json)
              selectedsecondoption(json, country, year)
              d3.select("#value").on("change",function(d){selectedsecondoption(json, country, year)})
              d3.select("#secondgroup").on("change",function(d){selectedsecondoption(json, country, year)})
          //     // clickedoncountry(json, country)
          //     var data_male_total = obtaincountrydatamaletotal(data, country)
          //     var data_female_total = obtaincountrydatafemaletotal(data, country)
          //     // var data_male_100k = obtaincountrydatamale100k(json, country)
          //     // var data_female_100k = obtaincountrydatafemale100k(json, country)
          //     var gdp_per_capita = gdppercapita(data, country)
          //     // console.log(gdp_per_capita)
          //     var data_pie = datapie(data, country)
          //     var data_donut = datadonut(data, country)
          //     var optionmale = datamaleoption(data, country)
          //     var optionfemale = datafemaleoption(data, country)
          //      if (data_female_total.length > 0){
          //        drawlinegraph(data_male_total, data_female_total, gdp_per_capita, optionmale, optionfemale);
          //        // makepiechart(data_pie);
          //        // console.log(data_donut);
          //        // console.log(data_pie)
          //        // makedonutchart(data_donut);
          //        initializepiechart(data_pie, data_donut);
          //        // initializedonutchart(data_donut);
          //        //
          //        // makelinegraph(data_country_female, data_country_male)
          //        // donutchart(datadonut(json, country))
          //        // piechart(datapie(json, country))
          //      }
          //       else{
          //         geendataland(country);
          //       }
          // });
      })}
})};
