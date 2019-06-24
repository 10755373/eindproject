function titlelinegraph(country, value, age){

  var divsize = d3v5.select("#titlelinegraph").node().getBoundingClientRect();
  var width = divsize.width
  var height = divsize.height
  var svgtitle = d3v5.select("#titlelinegraph")

  svgtitle.append("text")
      .attr("class", "titlelinegraph")
      .attr("id", "title")
      .attr("x", width + 40)
      .attr("y", 5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style('fill', 'black')
      .text("Linegraph for " + [country] + " which shows " + [value] + " of suicides between " + [age]);
}

function updatetitlelinegraph(country, value, age){
  var svgtitle = d3v5.select("#titlelinegraph")
  svgtitle.select("text.titlelinegraph")
    .text("Linegraph for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

}


function titlepiechart(country, value, age){

  var divsize = d3v5.select("#titlepiechart").node().getBoundingClientRect();
  var width = divsize.width
  var height = divsize.height
  var svgtitle = d3v5.select("#titlepiechart")

  svgtitle.append("text")
      .attr("class", "titlepiechart")
      .attr("id", "titles")
      .attr("x", width + 40)
      .attr("y", 5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style('fill', 'black')
      .text("Piechart for " + [country] + " which shows " + [value] + " of suicides between " + [age]);
}

function updatetitlepiechart(country, value, age){
  var svgtitle = d3v5.select("#titlepiechart")
  svgtitle.select("text.titlepiechart")
    .text("Piechart for " + [country] + " which shows " + [value] + " of suicides between " + [age]);

}

function titlescatterplot(year, sex, age){

  var divsize = d3v5.select("#titlescatterplot").node().getBoundingClientRect();
  var width = divsize.width
  var height = divsize.height
  var svgtitle = d3v5.select("#titlescatterplot")

  svgtitle.append("text")
      .attr("class", "titlescatterplot")
      .attr("id", "title")
      .attr("x", width + 40)
      .attr("y", 5)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style('fill', 'black')
      .text("Scatterplot regarding suicides amongst " + [sex] + " between " + [age]);
}

function updatetitlescatterplot(year, sex, age){
  var svgtitle = d3v5.select("#titlescatterplot")
  svgtitle.select("text.titlescatterplot")
    .text("Scatterplot regarding suicides amongst " + [sex] + " between " + [age]);

}
