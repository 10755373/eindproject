window.onload = function() {
    fetch("/data/dataproject.json")
      .then(response => response.json())
      .then(json => {
        // drawworldmap(json, 1987, "female", "5-14 years");
        // drawscatterplot(json, 1987, "female", "5-14 years");
        optionselected(json);
        console.log(json)
        d3.select("#gender").on("change",function(d){optionselected(json)})
        d3.select("#group").on("change",function(d){optionselected(json)})
})};


function optionselected(json){
  // d3v5.selectAll("svg").remove();
  var sex = document.getElementById("gender").value
  var age = document.getElementById("group").value
  // console.log(sex)
  // console.log(age)
  // console.log(json)
  var dataslider = Object.values(json)
  // console.log(dataslider)
  drawworldmap(json, 1987, sex, age);
  drawscatterplot(json, 1987, sex, age);
  // drawworldmap(json, 1987, "female", "5-14 years");
  // drawscatterplot(json, 1987, "female", "5-14 years");
  timeslider(dataslider, sex, age);
  var data_pie = datapienumber(json, "Netherlands", 1987, age)
  var data_donut = datadonutnumber(json, "Netherlands", 1987, age)
  drawpiechart(data_pie, data_donut)
  var line_no_male = obtaincountrydatamaletotal(json, "Netherlands", age)
  var line_no_female = obtaincountrydatafemaletotal(json, "Netherlands", age)

  drawlinegraph(line_no_male, line_no_female)


}

function selectedsecondoption(json, country, year){
  var value = document.getElementById("interested").value
  var secondgroup = document.getElementById("secondgroup").value
  // console.log(value)
  // console.log(secondgroup)
  // console.log(json)
  // console.log(country)
  // console.log(year)

  if (value == "no"){
    var data_pie = datapienumber(json, country, year, secondgroup)
    var data_donut = datadonutnumber(json, country, year, secondgroup)
    drawpiechart(data_pie, data_donut)
    var line_no_male = obtaincountrydatamaletotal(json, country, secondgroup)
    var line_no_female = obtaincountrydatafemaletotal(json, country, secondgroup)
    drawlinegraph(line_no_male, line_no_female, country)
  }
  else{
    var data_pie = datapieratio(json, country, year, secondgroup)
    var data_donut = datadonutratio(json, country, year, secondgroup)
    drawpiechart(data_pie, data_donut)
    var line_male_ratio = obtaincountrydatamale100k(json, country, secondgroup)
    var line_female_ratio = obtaincountrydatafemale100k(json, country, secondgroup)
    drawlinegraph(line_male_ratio, line_female_ratio, country)
  }
}
