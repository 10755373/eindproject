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
        // callslider(json);
        // d3.select('#slider').call(d3.slider()
        //     .axis(true).min(1987).max(2010).step(1)
        //     .on("slide", function(evt, value) {
        //   worldmap(json, value);
        // makeslider();
        // piechart();

        initializelinegraph();
        worldmap(json, 1987);
        timeslider(json);

        // // add slider, draw map again when it is moved
        // d3.select('#slider').call(d3.slider()
        //   .axis(true).min(1987).max(2010).step(1)
        //   .on("slide", function(evt, value) {
        //       console.log(value);
        //   })
        // );

        // var data_male_total = obtaincountrydatamaletotal(json)
        // var data_female_total = obtaincountrydatafemaletotal(json)
        // var data_male_100k = obtaincountrydatamale100k(json)
        // var data_female_100k = obtaincountrydatafemale100k(json)
        // // console.log(data_female_100k)
        // // console.log(data_male_100k)
        // drawlinegraph(data_male_total, data_female_total, data_male_100k, data_female_100k);
        // var data_pie = datapie(json);
        // makepiechart(data_pie);
        // var data_donut = datadonut(json);
        // donutchart(data_donut);
        // testline();

    });
}
