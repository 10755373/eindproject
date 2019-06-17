function makescatterplot(json){

  data = Object.values(json)

  var divsize = d3v5.select("#container7").node().getBoundingClientRect();

 var margin = {top: 40, right: 80, bottom: 20, left: 30};
 var width = divsize.width - margin.left - margin.right;
 var height = divsize.height - margin.top - margin.bottom;

 var svgscatterplot = d3v5.select("container7")
             .append("svg")
             .attr("class", "scatterplot")
             .attr("id", "scatterplot")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
               .attr("id", "svgscatterplot")
               .attr("transform",
                     "translate(" + margin.left + "," + margin.top + ")");

 var no_woman = [];
 for (let i = 0; i < data.length; i++){
   if (data[i].year == "2000" && data[i].sex == "female" && data[i].age == "15-24 years")
   no_woman.push(data[i].suicides_no);
 };

 var no_men = []
 for (let i = 0; i < data.length; i++){
   if (data[i].year == "2000" && data[i].sex == "female" && data[i].age == "15-24 years"){
   no_men.push(data[i].suicides_no)
    }
   };

 const scalex = d3v5.scaleLinear()
           .domain([0, Math.max(... no_woman)])
           .range([0, width]);
 const scaley = d3v5.scaleLinear()
           .domain([0, Math.max(... no_men)])
           .range([height, 0]);

svgscatterplot.append("text")
    .attr("id", "title")
    .attr("x", (width / 2))
    .attr("y", margin.bottom)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style('fill', 'darkOrange')
    .text("Scatterplot: no. of suicides of men and woman per country");

 var axisx = d3v5.axisBottom()
               .scale(scalex)
               .ticks(10);

 var axisy = d3v5.axisLeft()
               .scale(scaley)
               .ticks(10);

 svgscatterplot.append("g")
         .attr("class", "xaxis")
         .attr("id", "xaxis")
         .attr("transform", "translate(" + margin.left + "," + height + ")")
         .call(axisx)

 svgscatterplot.append("g")
         .attr("class", "yaxis")
         .attr("id", "yaxis")
         .attr("transform", "translate(" + margin.left * 1.65 + ", 0)")
         .call(axisy)

 svgscatterplot.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top) + ")")
        .style("text-anchor", "middle")
        .text("no of men");

  svgscatterplot.append("text")
         .attr("transform", "rotate(-90)")
         .attr("x", - height/2)
         .attr("y", 15)
         .style("text-anchor", "middle")
         .text("no of woman");
         
};

// function transformResponse(response){
//  // set array to add response to
//  var dataCollection = []
//  response.forEach(function(data){
//    // access data property of the response
//    let dataHere = data.dataSets[0].series;
//    // access variables in the response and save length for later
//    let series = data.structure.dimensions.series;
//    let seriesLength = series.length;
//
//    // set up array of variables and array of lengths
//    let varArray = [];
//    let lenArray = [];
//
//    series.forEach(function(serie){
//        varArray.push(serie);
//        lenArray.push(serie.values.length);
//    });
//
//    // get the time periods in the dataset
//    let observation = data.structure.dimensions.observation[0];
//    // add time periods to the variables, but since it's not included in the
//    // 0:0:0 format it's not included in the array of lengths
//    varArray.push(observation);
//
//    // create array with all possible combinations of the 0:0:0 format
//    let strings = Object.keys(dataHere);
//
//    // set up output array, an array of objects, each containing a single datapoint
//    // and the descriptors for that datapoint
//    let dataArray = [];
//
//    // for each string that we created
//    strings.forEach(function(string){
//        // for each observation and its index
//        observation.values.forEach(function(obs, index){
//            let data = dataHere[string].observations[index];
//            if (data != undefined){
//
//                // set up temporary object
//                let tempObj = {};
//
//                let tempString = string.split(":").slice(0, -1);
//                tempString.forEach(function(s, indexi){
//                    tempObj[varArray[indexi].name] = varArray[indexi].values[s].name;
//                });
//
//                // every datapoint has a time and ofcourse a datapoint
//                tempObj["time"] = obs.name;
//                tempObj["datapoint"] = data[0];
//                // tempObj["Country"] = data.structure.dimensions.series[1].values[0].name
//                dataArray.push(tempObj);
//            }
//        });
//    });
//    dataCollection.push(dataArray)
//    console.log(dataCollection)
//    })
//      // combine data based on their years
//      // create new array to which to add combined data
//      var combined_data = []
//      var y = 0
//      for (let i = 0; i < dataCollection[0].length; i++){
//        if (dataCollection[0][i].time != dataCollection[1][i + y].time){
//          y += 1
//        }
//        let tempObj = [dataCollection[1][i + y].time, dataCollection[1][i + y].datapoint, dataCollection[0][i].datapoint, dataCollection[1][i + y].Country]
//        combined_data.push(tempObj)
//      };
//  return combined_data;
// };
