window.onload = function() {
    fetch("/data/dataproject.json")
      .then(response => response.json())
      .then(json => {
        // makeverticallegend();
        optionselected(json);
        d3.select("#gender").on("change",function(d){optionselected(json)})
        d3.select("#group").on("change",function(d){optionselected(json)})
})};


function optionselected(json){
  var sex = document.getElementById("gender").value
  var age = document.getElementById("group").value
  var dataslider = Object.values(json)
  drawworldmap(json, 1987, sex, age);
  drawscatterplot(json, 1987, sex, age);
  maketimeslider(dataslider, sex, age);
  // titlescatterplot(1987, sex, age)
  var data_pie = datapienumber(json, "Netherlands", 1987, age)
  var data_donut = datadonutnumber(json, "Netherlands", 1987, age)
  drawpiechart(data_pie, data_donut, "Netherlands", "no", "5-14 years")
  // titlepiechart("Netherlands", "no", "5-14 years")
  var line_no_male = obtaincountrydatamaletotal(json, "Netherlands", age)
  var line_no_female = obtaincountrydatafemaletotal(json, "Netherlands", age)
  drawlinegraph(line_no_male, line_no_female, "Netherlands", "no", "5-14 years")
  titlelinegraph("Netherlands", "no", "5-14 years")
}

function selectedsecondoption(json, country, year){
  var value = document.getElementById("interested").value
  var secondgroup = document.getElementById("secondgroup").value
  if (value == "no"){
    var data_pie = datapienumber(json, country, year, secondgroup)
    var data_donut = datadonutnumber(json, country, year, secondgroup)
    drawpiechart(data_pie, data_donut, country, value, secondgroup)
    // updatetitlepiechart(country, value, secondgroup)
    var line_no_male = obtaincountrydatamaletotal(json, country, secondgroup)
    var line_no_female = obtaincountrydatafemaletotal(json, country, secondgroup)
    drawlinegraph(line_no_male, line_no_female, country, value, secondgroup)
    updatetitlelinegraph(country, value, secondgroup)
  }
  else{
    var data_pie = datapieratio(json, country, year, secondgroup)
    var data_donut = datadonutratio(json, country, year, secondgroup)
    drawpiechart(data_pie, data_donut, country, value, secondgroup)
    // updatetitlepiechart(country, value, secondgroup)
    var line_male_ratio = obtaincountrydatamale100k(json, country, secondgroup)
    var line_female_ratio = obtaincountrydatafemale100k(json, country, secondgroup)
    drawlinegraph(line_male_ratio, line_female_ratio, country, value, secondgroup)
    updatetitlelinegraph(country, value, secondgroup)
  }
}
