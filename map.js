
// draw datamap with fillkeys from json, if existing
function makemap(json, colors){
      // create datamap
      var map = new Datamap({element: document.getElementById('container1'),
      fills: {
      defaultFill: '#FF0000'
      },
      data: colors,
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
      done: function(datamap) {
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
             country = geography.properties.name;
             console.log(country)
             data_country_male = obtaincountrydatamale(data, country)
             data_country_female = obtaincountrydatafemale(data, country)
              if (data_country_female.length > 0){
                makelinegraph(data_country_female, data_country_male)
                donutchart(datadonut(json, country))
                piechart(datapie(json, country))
              }
               else{
                 geendataland(country);
               }
         });
     }
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
