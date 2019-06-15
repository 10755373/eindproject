// draw worldmap
function worldmap(json, year){

  d3.select("#container1").selectAll("*").remove();
  console.log(year)
  data = Object.values(json)
  // console.log(data[0])
  series = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == year && data[i].sex == "male" && data[i].age == "15-24 years"){
      list = []
      // console.log(data[i].suicides_no)
      list.push(data[i].alpha_code, data[i].suicides_no)
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
          .range(["#EFEFFF","#02386F"]); // blue color
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
      fills: { defaultFill: '#BB8FCE' },
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
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'No. of suicides: ' +  data.numberOfThings
      }},
       done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              country = geography.properties.name;
              console.log(country)
              // clickedoncountry(json, country)
              var data_male_total = obtaincountrydatamaletotal(json, country)
              var data_female_total = obtaincountrydatafemaletotal(json, country)
              var data_male_100k = obtaincountrydatamale100k(json, country)
              var data_female_100k = obtaincountrydatafemale100k(json, country)
              var data_pie = datapie(json, country)
              var data_donut = datadonut(json, country)
               if (data_female_total.length > 0){
                 drawlinegraph(data_male_total, data_female_total, data_male_100k, data_female_100k);
                 makepiechart(data_pie);
                 console.log(data_donut);
                 console.log(data_pie)
                 donutchart(data_donut);
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




// draw datamap with fillkeys from json, if existing
function makemap(data_map){
      // create datamap
      console.log(data_map)
      var map = new Datamap({element: document.getElementById('container1'),
      fills: {
      defaultFill: '#FF0000'
      },
      data: data_map,
      geographyConfig: {
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        // when hovering over countries, don't change country's color
        highlightFillColor: function(geography) {
            return geography['fillColor'] || '#F5F5F5';
        },
        // change borderline only
        highlightBorderColor: '#000000',
        popupTemplate: function(geography, data) {
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'No. of suicides: ' +  data.numberOfThings
     }},
     //  done: function(datamap) {
     //     datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
     //         country = geography.properties.name;
     //         console.log(country)
     //         data_country_male = obtaincountrydatamale(data, country)
     //         data_country_female = obtaincountrydatafemale(data, country)
     //          if (data_country_female.length > 0){
     //            makelinegraph(data_country_female, data_country_male)
     //            donutchart(datadonut(json, country))
     //            piechart(datapie(json, country))
     //          }
     //           else{
     //             geendataland(country);
     //           }
     //     });
     // }
      });
      // // draw legend for datamap
      // map.legend({
      //   legendTitle : "No. of suicides per capita",
      //   defaultFillName: "No data: ",
      // });


    };

    //       // Time
    //     var dataTime = d3v5.range(0, 20).map(function(d) {
    //       return new Date(1987 + d, 10, 3);
    //     });
    //
    //     var sliderTime = d3v5
    //       .sliderBottom()
    //       .min(d3v5.min(dataTime))
    //       .max(d3v5.max(dataTime))
    //       .step(1000 * 60 * 60 * 24 * 365)
    //       .width(1000)
    //       .tickFormat(d3v5.timeFormat('%Y'))
    //       .tickValues(dataTime)
    //       .default(new Date(1998, 10, 3))
    //       .on('onchange', val => {
    //         d3v5.select('p#value-time').text(d3v5.timeFormat('%Y')(val));
    //       });
    //
    //     var gTime = d3v5
    //       .select('div#slider-time')
    //       .append('svg')
    //       .attr('width', 1200)
    //       .attr('height', 100)
    //       .append('g')
    //       .attr('transform', 'translate(30,30)');
    //
    //     gTime.call(sliderTime);
    //
    //     d3v5.select('p#value-time').text(d3v5.timeFormat('%Y')(sliderTime.value()));
    // };
