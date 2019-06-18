window.onload = visualizations();

function visualizations() {
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


        var datamale = scattermale(json)
        console.log(datamale)
        var datafemale = scatterfemale(json)
        var merged = merge(datamale, datafemale)
        console.log(merged)
        initializeworldmap(json, 1987);
        initializelinegraph();
        // initializepiechart();
        // initializedonutchart();
        timeslider(json);
        makescatterplot(merged)
        // makescatterplot(json);
        // initializelinegraph();
        // worldmap(json, 1987);
        // timeslider(json);

    });
}
