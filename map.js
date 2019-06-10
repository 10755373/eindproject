function makemap(json, data_map, colors){

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

      // create datamap
      var map = new Datamap({element: document.getElementById('container'),
      fills: {
          defaultFill: '#FF0000',
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
        legendTitle : "Suicides per country",
        defaultFillName: "No data: ",
        // labels: {
        //   q0: "one",
        //   q1: "two",
        //   q2: "three",
        //   q3: "four",
        //   q4: "five",
        // },
      });

};

function getdataobjects_female(data){
  list_values = {}
  for (let i = 0; i < data.length; i++){
    if (data[i].year == "2000" && data[i].sex == "female" && data[i].age == "15-24 years"){
      list_values[data[i].alpha_code] = data[i].suicides_100k
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
