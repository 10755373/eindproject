// // creates div for graph and div for tooltip
// var div2 = d3v5.select('body').append('div')
//   .attr('id', 'container')
//
// const div3 = d3v5
//   .select('body')
//   .append('div')
//   .attr('class', 'tooltip')
//   .style('opacity', 0);


window.onload = function() {
  makemap();
};


// draw datamap with fillkeys from json, if existing
function makemap(){

  // create promise for json of gdp-data
  d3v5.json("correctdata.json").then(function(data) {

    console.log(data)
    var req = data
    console.log(req)


    data_dict1 = getdataobjects_male(data)
    data_dict2 = getdataobjects_female(data)
    // colors1 = getcolors1(data)
    // colors2 = getcolors2(data)

    //
    // // Determine colorscale
    // var colorScale = d3v5.scaleOrdinal()
    //             .domain([Math.min(... values_2016), Math.max(... values_2016)])
    //             .range(['Laag','Medium','Hoog','Uitzonderlijk']);
    //
    // // Adjust previously made dict
    // for (var key in dict_2016) {
    //   let country_color = {}
    //   country_color["Value"] = parseInt(dict_2016[key])
    //   country_color["fillKey"] = colorScale(dict_2016[key])
    //   dict_2016[key] = country_color;
    // }

    // Set margins
      var margin = {top: 70, right: 100, bottom: 20, left: 50},
            height = 400 - margin.bottom - margin.top,
            width = 700 - margin.left - margin.right;

      // Append title
      var svg = d3v5.select("div")
        .append("text")
        .attr("x", (width / 2))
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
      	.style('fill', 'darkOrange')
        .text("Worldmap: GDP per capita");



    // // Get values from 2016
    // var values_2016 = []
    // for (let i = 0; i < data_cleaned.length; i++){
    //   if (data_cleaned[i][1] == "2016") {
    //     values_2016.push(data_cleaned[i][2]);
    //   }
    // };
    //
    // // Make dictionary with country as key and gdp (2016) as value
    // var saved_dict = {}
    // for (let i = 0; i < data_cleaned.length; i++){
    //   if (data_cleaned[i][1] == "2016") {
    //     saved_dict[data_cleaned[i][0]] = data_cleaned[i][2]
    //   }
    // };
    //
    // // Determine colorscale for every country
    // var dict_2016 = {}
    // for (let i = 0; i < data_cleaned.length; i++){
    //   if (data_cleaned[i][1] == "2016") {
    //     dict_2016[data_cleaned[i][0]] = data_cleaned[i][2]
    //   }
    // };
    //
    // // Determine colorscale
    // var colorScale = d3v5.scaleOrdinal()
    //             .domain([Math.min(... values_2016), Math.max(... values_2016)])
    //             .range(['Laag','Medium','Hoog','Uitzonderlijk']);
    //
    // // Adjust previously made dict
    // for (var key in dict_2016) {
    //   let country_color = {}
    //   country_color["Value"] = parseInt(dict_2016[key])
    //   country_color["fillKey"] = colorScale(dict_2016[key])
    //   dict_2016[key] = country_color;
    // }

      // create datamap
      var map = new Datamap({element: document.getElementById('container'),
      fills: {
          defaultFill: '#f0a0fa',
          Ontbrekend: '#f0a0fa',
          Laag: '#ccffcc',
          Semi: '#96c985',
          Hoog: '#61943d',
          Uitzonderlijk: '#336600'
      },
      data: data_dict1,
     //  geographyConfig: {
     //    popupTemplate: function(geography, data) {
     //   return '<div class="hoverinfo">' + geography.properties.name + '<br />' + 'No. of suicides: ' +  data.GDP
     // }},
      done: function(datamap) {
         datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
             land = geography.properties.name;
             d3v5.json("data.json").then(function(data) {
               data_land = verkrijgdataland(data, land)
               if (data_land != 1){
                 d3v5.select("#graph").remove()
                 drawbar(objects_interest_order);
               }
               else{
                 d3v5.select('#graph').remove()
                 geendataland();
               }
             });
         });
     }
      });
      // draw legend for datamap
      map.legend({
        legendTitle : "GDP per capita",
        defaultFillName: "No data: ",
        labels: {
          q0: "one",
          q1: "two",
          q2: "three",
          q3: "four",
          q4: "five",
        },
      });
  });
}

function getdataobjects_male(data){
  console.log(data)
  list_values = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].sex == "male" && data[i].age == "15-24 years"){
      list_values[data[i].country] = data[i].suicides_100k
    }
  }
  console.log(list_values)
};

function getdataobjects_female(data){
  console.log(data)
  list_values = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].sex == "female" && data[i].age == "15-24 years"){
      list_values[data[i].country] = data[i].suicides_100k
    }
  }
  console.log(list_values)
};

function getcolors1(data){
  list = []
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].sex == "male" && data[i].age == "15-24 years"){
      list.append(data[i].suicides_100k)
}}};


function verkrijgdataland(data, land){
  list = []
  for (let i = 0; i < data.length; i++){
    if (data[i].country == land && data[i].sex == "male" && data[i].age == "15-24 years"){
      list.append(data[i].suicides_100k)
}}
console.log(list)};

function geendataland(){
  var margin = {top: 100, right: 80, bottom: 90, left: 120};
  var w = 350;
  var h = 200;
  var barPadding = 0.5;

  var svg = d3v5.select("#container")
              .append("svg")
              .attr("id","graph")
              .attr("width", w + margin.left + margin.right)
              .attr("height", h + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
      .attr("x", (w / 2))
      .attr("y", 40 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("no suicide data avaibale  " + country);
};
