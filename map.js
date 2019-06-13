
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
        // don't change color on mouse hover
        highlightFillColor: function(geography) {
            return geography['fillColor'] || '#F5F5F5';
        },
        // only change border
        highlightBorderColor: '#000000',
        popupTemplate: function(geography, data) {
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'No. of suicides: ' +  data.numberOfThings
     }},
      done: function(datamap) {
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
           console.log(geography.properties.name)
           console.log(geography.properties)
             country = geography.properties.name;
             data_country_male = obtaincountrydatamale(data, country)
             data_country_female = obtaincountrydatafemale(data, country)
             console.log(data_country_female)
              if (data_country_female.length > 0){
                makelinegraph(data_country_female, data_country_male)
                makepiechart2(datapie(json, country))
                // makepiechart2(datapie1(json, country), datapie2(json, country))
              }
               // if (data_country_male != 1 || data_country_female != 1){
               //   makepiechart2(datapie(json, country))
               //   makelinegraph(data_country_male)
               // }
               // no suicide data avaibale
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
