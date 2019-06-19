window.onload = function() {
    fetch("/data/dataproject.json")
      .then(response => response.json())
      .then(json => {
        optionselected(json);
        console.log(json)
        d3.select("#gender").on("change",function(d){optionselected(json)})
        d3.select("#group").on("change",function(d){optionselected(json)})
})};


function optionselected(json){
  d3v5.selectAll("svg").remove();
  var sex = document.getElementById("gender").value
  var age = document.getElementById("group").value
  console.log(sex)
  console.log(age)
  console.log(json)
  var dataslider = Object.values(json)
  console.log(dataslider)
  initializelinegraph()
  initializeworldmap(json, 1987, sex, age);
  initializescatterplot(json, 1987, sex, age);
  timeslider(dataslider, sex, age);


}

function selectedsecondoption(json, country, year){
  var value = document.getElementById("value").value
  var secondgroup = document.getElementById("secondgroup").value
  console.log(value)
  console.log(secondgroup)
  if (value == "no"){
    var data_pie = datapie1(json, country, year, secondgroup)
    var data_donut = datadonut1(json, country, year, secondgroup)
    initializepiechart(data_pie, data_donut)
    var line_no_male = obtaincountrydatamaletotal(json, country, secondgroup)
    var line_no_female = obtaincountrydatafemaletotal(json, country, secondgroup)
    drawlinegraph(line_no_male, line_no_female)
  }
  else{
    var data_pie = datapie2(json, country, year, secondgroup)
    var data_donut = datadonut2(json, country, year, secondgroup)
    initializepiechart(data_pie, data_donut)
    var line_male_ratio = obtaincountrydatamale100k(json, country, secondgroup)
    var line_female_ratio = obtaincountrydatafemale100k(json, country, secondgroup)
    drawlinegraph(line_male_ratio, line_female_ratio)
  }
}

// window.onload = selectedoption();
//
// function selectedoption(json) {
//   fetch("/data/dataproject.json")
//     .then(response => response.json())
//     .then(json => {
//         d3v5.selectAll("svg").remove();
//         var sex = document.getElementById("gender").value
//         var age = document.getElementById("group").value
//         console.log(sex)
//         console.log(age)
//         console.log(json)
//         initializeworldmap(json, 1987, sex, age);
//         initializescatterplot(json, 1987, sex, age);
//         timeslider(json, sex, age);
//     })
//   };
//
// var requests = [d3v5.json("/data/dataproject.json")];

// window.onload = function() {
//   Promise.all(requests).then(function(response) {
//     selectedoption(response);
//     // selectedsecondoption(response)
// })};



// window.onload = function() {
//   Promise.all(requests).then(function(response) {
//     selectedoption(response);
//     // selectedsecondoption(response)
// })};


  // var requests = [d3v5.json("/data/dataproject.json")];
  //
  // window.onload = function() {
  //   fetch("/data/dataproject.json")
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log(json)
  //       testselectedoption(json)
  //       // selectedsecondoption()
  // })};



// function testselectedoption(json) {
//   console.log(json)
//         d3v5.selectAll("svg").remove();
//
//         var sex = document.getElementById("gender").value
//         var age = document.getElementById("group").value
//         console.log(sex)
//         console.log(age)
//         console.log(json)
//         initializeworldmap(json, 1987, sex, age);
//         initializescatterplot(json, 1987, sex, age);
//         timeslider(json, sex, age);
//     };
