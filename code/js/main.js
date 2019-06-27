// unload data
window.onload = function() {
    fetch("/eindproject/data/dataproject.json")
      .then(response => response.json())
      .then(json => {
        // call function
        optionselected(json);
        // make adjustments if value in dropdown changes
        d3.select("#gender").on("change",function(d){optionselected(json)})
        d3.select("#group").on("change",function(d){optionselected(json)})
})};

// function regarding first two visualizations
function optionselected(json){
  // retrieve values from dropdowns
  var sex = document.getElementById("gender").value
  var age = document.getElementById("group").value
  // gather data from json
  var dataslider = Object.values(json);
  // call function to draw the worldmap
  drawworldmap(json, 1987, sex, age);
  // call function to draw the scatterplot
  drawscatterplot(json, 1987, sex, age);
  // call function to draw slider
  maketimeslider(dataslider, sex, age);
  // initialize a piechart and donut with The Netherlands in 1987 as default
  drawpiechart(datapienumber(json, "Netherlands", 1987, age), datadonutnumber(json, "Netherlands", 1987, age), "Netherlands", "no", "5-14 years");
  // initialize a linegraph with The Netherlands in 1987 as default
  drawlinegraph(obtaincountrydatamaletotal(json, "Netherlands", age), obtaincountrydatafemaletotal(json, "Netherlands", age), "Netherlands", "no", "5-14 years");
}

// function regarding the last two visualizations
function selectedsecondoption(json, country, year){
  // retrieve values form dropdowns
  var value = document.getElementById("interested").value
  var secondgroup = document.getElementById("secondgroup").value
  // in case value is number
  if (value == "no"){
    // draw piechart and donut
    drawpiechart(datapienumber(json, country, year, secondgroup), datadonutnumber(json, country, year, secondgroup), country, value, secondgroup);
    // draw a linegraph
    drawlinegraph(obtaincountrydatamaletotal(json, country, secondgroup), obtaincountrydatafemaletotal(json, country, secondgroup), country, value, secondgroup);
  }
  // in case value is ratio
  else{
    // draw a piechart and donut
    drawpiechart(datapieratio(json, country, year, secondgroup), datadonutratio(json, country, year, secondgroup), country, value, secondgroup);
    // draw a linegraph
    drawlinegraph(obtaincountrydatamale100k(json, country, secondgroup), obtaincountrydatafemale100k(json, country, secondgroup), country, value, secondgroup);
  }
}
