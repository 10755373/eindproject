// function geendataland(country){
//
//   var divsize = d3v5.select("#container2").node().getBoundingClientRect();
//
//   var margin = {top: 20, right: 80, bottom: 20, left: 120};
//   var width = divsize.width
//   var height = divsize.height
//   var barPadding = 0.5;
//
//   var svg = d3v5.select("#svg_linegraph_container")
//               .append("svg")
//               .attr("id","graph")
//               .attr("width", width + margin.left + margin.right)
//               .attr("height", height + margin.top + margin.bottom)
//               .append("g")
//               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   svg.append("text")
//       .attr("x", (width / 3))
//       .attr("y", (margin.bottom * 10))
//       .attr("text-anchor", "middle")
//       .style("font-size", "16px")
//       .text("Sorry! Unfortunately, there's no data available for " + country);
//
// };



      function newpiechart(data_pie, data_donut, country, value, age){

        var divsize = d3v5.select("#containerpiechart").node().getBoundingClientRect();

        var margin = {top: 20, right: 30, bottom: 20, left: 20};
        var width = divsize.width - margin.left - margin.right;
        var height = divsize.height - margin.top - margin.bottom;

        var radius = Math.min(width, height) / 2 - margin

        var svgpiechart = d3v5.select("#containerpiechart").append("svg")
                .attr("class", "classpiechart")
                .attr("id", "piechart")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("id", "gpiechart")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var colors = d3v5.scaleOrdinal()
                .domain(["male", "female"])
                .range(["steelblue", "pink"]);

        // Set up the pie chart
         var pie = d3v5.pie()
            	.value(function(d) {
                    return d.value; })(data_pie);

        // Set the arcs for the chart and the labels with inner & outer radii
        var arc = d3v5.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3v5.arc()
            .outerRadius(radius - 100)
              .innerRadius(radius - 40);

      //create tip
      var tip = d3v5.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<span style='color:orange'>" + d.data.value + "</span> <strong>%</strong>";
            })

     // Select the svg and append the pie
      var svg = d3v5.select("#containerpiechart")
        .append("svg")
        .attr("id","pies")
        .attr("width", width + 250)
        .attr("height", height + 150)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height /1.2 +")");

        svg.call(tip);

        var g = svg.selectAll("arc")
            .data(pie)
            .enter().append("g")
            .attr("transform", "translate(" + width / 3 + "," + height / 10 +")")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return colors(d.data.key);})
            .on("mouseover", tip.show)
            .on('mouseout', tip.hide);

        // // Add labels
        // g.append("text")
        //     .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        //     .text(function(d) { return d.data.type;})
        //     .style("fill", "#fff");

        // // Add title
        // svg.append("text")
        //     .attr("class","title")
        //     .attr("x", (w / 3))
        //     .attr("y", - .55 * h)
        //     .attr("text-anchor", "middle")
        //     .style("font-size", "30px")
        //     .style("fill", "#00491b")
        //     .style("font-family", "Palatino")
        //     .text(" " + [name] + " in " + [actualyear]);

    }

    function updatepiechart(countrydata, piedata, id, name, year) {

        var svg = d3v5.select("#piechart")

        var pie = d3v5.pie()
               .value(function(d) {
                   return d.amount; })(piedata);
        // new angles
        path = svg.selectAll("path").data(pie);

        var actualyear = year.replace('Y', '');

        svg.select("text.title").text("Food v Feed for " + [name] + " in " + [actualyear]);

        // redraw arcs
        path.transition().duration(750).attrTween("d", arcTween);

        svg.selectAll(".arc")
          .on("click", function(d) {
              counter = 1
              bardata = {data: countrydata, id: id, name: name, type: d.data.type, year: year}
              drawbarchart(countrydata, id, name, d.data.type, year);

    })
}

    function arcTween(a) {
    var w = 350,
        h = 350,
        r = Math.min(w, h) / 2;

    var arc = d3v5.arc()
        .outerRadius(r - 10)
        .innerRadius(0);

  var i = d3v5.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}
