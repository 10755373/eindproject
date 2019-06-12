window.onload = visualizations();

function visualizations() {
  fetch("outputted.json")
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        // console.log(Object.values(json)[0])
        // console.log(Object.values(json)[0].country)
        // console.log(Object.keys(json))
        var data_map = retrievedata_map(json)
        console.log(data_map)
        var colors = colorscale(data_map)
        console.log(colors)
        makemap(json, colors);
        // var datapie = datapie(json)
        // console.log(datapie)
        // makepiechart();
        // var data_pie = data_pie(dummyvariable);
        // var data = datapiechart2();
        // var data_linegraph_male = obtaincountrydatamale(json, country)
        // var data_linegraph_female = verkrijgdataland_female(json, country)
        // console.log(data_linegraph_male)
        // console.log(data_linegraph_female)
        var data_pie = datapie(json)
        makepiechart2(data_pie);

        // makelinegraph(data_male);
        // var dataset = transformdata(json)[0]
        // var palette_scale = transformdata(json)[1]
        // console.log(json['NLD'])

        // makemap(json, dataset, palette_scale);
        // drawpiechart();
        //drawbarchart();

    });
}
