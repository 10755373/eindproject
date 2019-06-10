window.onload = jscode();

function jscode() {

  fetch("outputted.json")
    .then(response => response.json())
    .then(json => {
        console.log(json)
        console.log(Object.values(json)[0])
        console.log(Object.values(json)[0].country)
        console.log(Object.keys(json))
        var data_map = retrievedata_map(json)
        console.log(data_map)
        var colors = colorscale(data_map)
        console.log(colors)
        makemap(json, data_map, colors)
        var data = datapie(data)
        console.log(data)
        drawpie(data)

        // var dataset = transformdata(json)[0]
        // var palette_scale = transformdata(json)[1]
        // console.log(json['NLD'])

        // makemap(json, dataset, palette_scale);
        // drawpiechart();
        //drawbarchart();

    });
}
