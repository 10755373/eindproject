function geendataland(){
  var margin = {top: 100, right: 80, bottom: 90, left: 120};
  var w = 350;
  var h = 200;
  var barPadding = 0.5;

  var svg = d3v5.select("#container")
              .append("svg")
              .attr("id","graph")
              .attr("width", w + margin.left + margin.right)
              .attr("height", h + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
      .attr("x", (w / 2))
      .attr("y", 40 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("no suicide data avaibale  " + country);

};
