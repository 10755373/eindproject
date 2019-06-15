window.onload = visualizations();

function visualizations() {
  fetch("/data/dataproject.json")
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        // console.log(Object.values(json)[0])
        // console.log(Object.values(json)[0].country)
        // console.log(Object.keys(json))
        // var currentyear = makeSlider();
        // console.log(typeof currentyear)
        // console.log(currentyear)
        // var data_map = makeSlider();
        // var data_map = retrievedata_map(json, makeSlider())
        // var data_map = makeSlider(json);
        // var colors = colorscale(data_map);
        // console.log(colors)
        // console.log(data_map)
        // console.log(typeof(data_map))
        // makemap(data_map);
        // var data_map = retrievedata_map(json)
        // var colors = colorscale(data_map)
        // makemap(json, colors);
        // line(json);
        // var datapie = datapie(json)
        // console.log(datapie)
        // makepiechart();
        // var data_pie = data_pie(dummyvariable);
        // var data = datapiechart2();
        // var data_linegraph_male = obtaincountrydatamale(json, country)
        // var data_linegraph_female = verkrijgdataland_female(json, country)
        // console.log(data_linegraph_male)
        // console.log(data_linegraph_female)
        // var data_pie = datapie(json)
        // makepiechart2(data_pie);
        // console.log(data_pie)

        // makelinegraph(data_male);
        // var dataset = transformdata(json)[0]
        // var palette_scale = transformdata(json)[1]
        // console.log(json['NLD'])

        // makemap(json, dataset, palette_scale);
        // drawpiechart();
        //drawbarchart();
        // testpie();
        worldmap(json, 1987);
        // callslider(json);
        // d3.select('#slider').call(d3.slider()
        //     .axis(true).min(1987).max(2010).step(1)
        //     .on("slide", function(evt, value) {
        //   worldmap(json, value);
        // makeslider();
        timeslider(json);
        // piechart();
        donutchart();
        makepiechart();
        var data_male = obtaincountrydatamale(json)
        var data_female = obtaincountrydatafemale(json)
        drawlinegraph(data_male, data_female);
    });
}
