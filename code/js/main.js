window.onload = userselected();

function userselected() {
  fetch("/data/dataproject.json")
    .then(response => response.json())
    .then(json => {
        // var datascatter = scatterdata(json);
        // console.log(datascatter)

        // var datamale = scattermale1(json)
        // console.log(datamale)
        // var datafemale = scatterfemale1(json)
        // var merged = merge1(datamale, datafemale)
        // console.log(merged)

        d3v5.selectAll("svg").remove();

        var sex = document.getElementById("selectData1").value
        var age = document.getElementById("selectData2").value
        console.log(sex)
        console.log(age)
        console.log(json)
        initializeworldmap(json, 1987, sex, age);
        initializescatterplot(json, 1987, sex, age);
        // makescatterplot(json, year, sex, age);
        timeslider(json, sex, age);

        // var datamale = scattermale(json)
        // // console.log(datamale)
        // var datafemale = scatterfemale(json)
        // var merged = merge(datamale, datafemale)
        // console.log(merged)


        // initializelinegraph();
        // // initializepiechart();
        // // initializedonutchart();
        // makescatterplot(merged)
        // makescatterplot(json);
        // initializelinegraph();
        // worldmap(json, 1987);
        // timeslider(json);

    });
}
