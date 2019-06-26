// function to make the worldmap
function drawworldmap(json, year, sex, age){

  // check if svg-container for the worldmap is empty
  if( $('#containerworldmap').is(':empty')){

    // incase it's empty, draw new worldmap
    newworldmap(json, year, sex, age)
  }
  else{

    // update existing worldmap in case there has already a worldmap has been drawn
    updateworldmap(json, year, sex, age)
  }};


// draw new worldmap
function newworldmap(json, year, sex, age){

  // retrieve sizes container worldmap
  var container1 = d3v5.select("#containerworldmap").node().getBoundingClientRect();
  var width = container1.width
  var height = container1.height

  // call function to retrieve data for worldmap
  var dataset = retrievedata_map(json, year, sex, age)

  // append svg and wihtin it a title
  var title = d3v5.select("#containerworldmap")
        .append("text")
        .attr("class", "titlescatterplot")
        .attr("id", "title")
        .attr("x", (width / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style('fill', 'black')
        .style("text-decoration", "underline")
        .text("Worldmap regarding suicides amongst " + [sex] + " between " + [age] + " in " + [year]);

  // make map
  var map = new Datamap({
      element: document.getElementById('containerworldmap'),
      projection: 'mercator',
      // countries which don't have a data will be colored in a default color (which is yellow)
      fills: { defaultFill: '#ffff99' },
      data: dataset,
      geographyConfig: {
        // give countries a bordercolor when hovering over them
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        // when hovering over countries, don't change country's color
        highlightFillColor: function(geography) {
            return geography['fillColor'] || '#F5F5F5';
        },
        // change borderline only
        highlightBorderColor: '#2ECC71',
        // when hovering over a country
        popupTemplate: function(geography, data) {
          // in case there's no data available for the country
          if (!data) {
        return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Sorry! Unfortunately, there is no data vailable'
          }
          // in case there's data available
      else{
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Suicides no: ' +  data.numberOfThings
     }}},
     // after worldmap is drawn
      done: function(datamap) {
        // when clicking on a country
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
             country = geography.properties.name;
             // call for function secondoption
             selectedsecondoption(json, country, year)
             // retrieve values from dropdowns
             d3.select("#interested").on("change",function(d){selectedsecondoption(json, country, year)})
             d3.select("#secondgroup").on("change",function(d){selectedsecondoption(json, country, year)})
              })
              }

  });

  // draw legend for datamap with only a recht for countries which have no data
   map.legend({
     defaultFillName: "No data: ",

   });

   // call function to draw a color gradient legend based on the nomber of suicides
   drawlegend(dataset, sex)

 };


// update worldmap
function updateworldmap(json, year, sex, age){

  // delete everything that's in the svg
  d3.select("#containerworldmap").selectAll("*").remove();

  // retrieve sizes container worldmap
  var container1 = d3v5.select("#containerworldmap").node().getBoundingClientRect();
  var width = container1.width
  var height = container1.height

  // call function to retrieve data for worldmap
  var dataset = retrievedata_map(json, year, sex, age)

  // append svg and wihtin it a title
  var title = d3v5.select("#containerworldmap")
        .append("text")
        .attr("class", "titlescatterplot")
        .attr("id", "title")
        .attr("x", (width / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style('fill', 'black')
        .style("text-decoration", "underline")
        .text("Worldmap regarding suicides amongst " + [sex] + " between " + [age] + " in " + [year]);

  // make map
  var map = new Datamap({
      element: document.getElementById('containerworldmap'),
      projection: 'mercator',
      // countries which don't have a data will be colored in a default color (which is yellow)
      fills: { defaultFill: '#ffff99' },
      data: dataset,
      geographyConfig: {
        // give countries a bordercolor when hovering over them
        borderColor: '#DEDEDE',
        highlightBorderWidth: 2,
        // when hovering over countries, don't change country's color
        highlightFillColor: function(geography) {
            return geography['fillColor'] || '#F5F5F5';
        },
        // change borderline only
        highlightBorderColor: '#2ECC71',
        // when hovering over a country
        popupTemplate: function(geography, data) {
          // in case there's no data available for the country
          if (!data) {
        return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Sorry! Unfortunately, there is no data vailable'
          }
          // in case there's data available
      else{
       return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'Suicides no: ' +  data.numberOfThings
     }}},
     // after worldmap is drawn
      done: function(datamap) {
        // when clicking on a country
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
             country = geography.properties.name;
             // call for function secondoption
             selectedsecondoption(json, country, year)
             // retrieve values from dropdowns
             d3.select("#interested").on("change",function(d){selectedsecondoption(json, country, year)})
             d3.select("#secondgroup").on("change",function(d){selectedsecondoption(json, country, year)})
              })
              }

  });

  // draw legend for datamap with only a recht for countries which have no data
   map.legend({
     defaultFillName: "No data: ",

   });

   // call function to draw a color gradient legend based on the nomber of suicides
   drawlegend(dataset, sex)

 };
