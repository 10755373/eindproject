function drawworldmap(json, year, sex, age){

  if( $('#containerworldmap').is(':empty')){
    newworldmap(json, year, sex, age)
  }
  else{
    updateworldmap(json, year, sex, age)
  }};


// draw worldmap
function newworldmap(json, year, sex, age){
  // retrieve sizes container
  var container1 = d3v5.select("#containerworldmap").node().getBoundingClientRect();
  // call function to get data for worldmap
  var dataset = retrievedata_map(json, year, sex, age)
  // make map
  console.log(dataset)
  var sdf = Object.values(dataset)
  console.log(sdf)
  var map = new Datamap({
      element: document.getElementById('containerworldmap'),
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
          if (!data) {
        return ['<div class="hoverinfo">',
            '<br>Sorry! Unfortunately, there is no data available for ',
            geo.properties.name,,
            '</div>'].join('');
          }
      else{
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Suicides no: ' +  data.numberOfThings
     }}},
      done: function(datamap) {
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
             country = geography.properties.name;
             selectedsecondoption(json, country, year)
             console.log(country)
             console.log(year)
             d3.select("#interested").on("change",function(d){selectedsecondoption(json, country, year)})
             d3.select("#secondgroup").on("change",function(d){selectedsecondoption(json, country, year)})
              })
              }

  });
  // draw legend for datamap
   map.legend({
     legendTitle : "No. of suicides",
     defaultFillName: "No data: ",

   });
   // call function to draw a color gradient legend
   drawlegend(dataset)

 };


// draw worldmap
function updateworldmap(json, year, sex, age){

  // var container1 = d3v5.select("#container1").node().getBoundingClientRect();

  d3.select("#containerworldmap").selectAll("*").remove();
  var container1 = d3v5.select("#containerworldmap").node().getBoundingClientRect();
  var width = container1.width
  var height = container1.height
  var dataset = retrievedata_map(json, year, sex, age)
  var year = year
  console.log(dataset)
  // var map = new Datamap({dataset})
  var map = new Datamap({
      element: document.getElementById('containerworldmap'),
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
          if (!data) {
        return ['<div class="hoverinfo">',
            '<br>Sorry! Unfortunately, there is no data available for ',
            geo.properties.name,,
            '</div>'].join('');
          }
      else{
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Suicides no: ' +  data.numberOfThings
     }}},
       done: function(datamap) {
          datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
              country = geography.properties.name;
              console.log(country)
              console.log(year)
              selectedsecondoption(json, country, year)
              d3.select("#interested").on("change",function(d){selectedsecondoption(json, country, year)})
              d3.select("#secondgroup").on("change",function(d){selectedsecondoption(json, country, year)})
      })}
})
// draw legend for datamap
 map.legend({
   legendTitle : "No. of suicides",
   defaultFillName: "No data: ",

 });
  // call function tp draw a color gradient legend
   drawlegend(dataset)
};
