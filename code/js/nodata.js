function geendataland(country){

  var divsize = d3v5.select("#container2").node().getBoundingClientRect();

  var margin = {top: 20, right: 80, bottom: 20, left: 120};
  var width = divsize.width
  var height = divsize.height
  var barPadding = 0.5;

  var svg = d3v5.select("#svg_linegraph_container")
              .append("svg")
              .attr("id","graph")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("text")
      .attr("x", (width / 3))
      .attr("y", (margin.bottom * 10))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Sorry! Unfortunately, there's no data available for " + country);

};

function makeverticallegend(){
      var w = 140, h = 400;

			var key = d3v5.select("#container9").append("svg").attr("width", w).attr("height", h);

			var legend = key.append("defs")
              .append("svg:linearGradient")
              .attr("id", "gradient")
              .attr("x1", "100%")
              .attr("y1", "0%")
              .attr("x2", "100%")
              .attr("y2", "100%")
              .attr("spreadMethod", "pad");

			legend.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#B30000")
            .attr("stop-opacity", 1);

			legend.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#FEE8c8")
            .attr("stop-opacity", 1);

			key.append("rect")
          .attr("width", w - 100)
          .attr("height", h - 100)
          .style("fill", "url(#gradient)")
          .attr("transform", "translate(0,10)");

			var y = d3v5.scaleLinear().range([300, 0]).domain([1, 100]);

			var yAxis = d3v5.axisRight().scale(y);

			key.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(41,10)")
          .call(yAxis).append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 30)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("axis title");
};

function drawpiechart(id, name, year){

    var countryfilename = 'data/' + [id] + '.json'
    //console.log(countryfilename)

    fetch(countryfilename)
      .then(response => response.json())
      .then(countrydata => {
          //console.log(countrydata.length)
          var piedata1 = {
              "type" : "Food",
              "amount" : 0
          }
          var piedata2 = {
              "type" : "Feed",
              "amount": 0
          };
          for (i = 0; i < countrydata.length; i ++) {
               if (countrydata[i].Element == "Food") {
                   piedata1["amount"] +=1
               }
               else {
                   piedata2["amount"] +=1
               }
          }
      //console.log(piedata)
      piedata1["amount"] = Math.round(piedata1["amount"] / countrydata.length * 100)
      piedata2["amount"] = Math.round(piedata2["amount"] / countrydata.length * 100);

      var piedata = [piedata1, piedata2];

      // shorten display name for long names
      if (name == "Democratic Republic of the Congo") {
          name = "DR Congo"
      }
      else if (name == "United States of America") {
          name = "the USA"
      }
      else if (name == "United Republic of Tanzania") {
          name = "Tazania"
      }

      //if no piechart yet
      if( $('#piechart.figure').is(':empty')) {
        newpiechart(countrydata, piedata, id, name, year)
        //drawbarchart(countrydata, id, name, 'Food', year);
    }
        else{
        $('#barchart').empty()
        updatepiechart(countrydata, piedata, id, name, year)
    }
})
}

function newpiechart(countrydata, piedata, id, name, year){

    // Set the width, height and radius
    var w = 350,
        h = 350,
        r = Math.min(w, h) / 2;

    // Set the color scheme
    var color = d3v5.scaleOrdinal()
                    .domain(piedata)
                    .range(d3v5.schemeBuGn[7]);

    // Set up the pie chart
     var pie = d3v5.pie()
          .value(function(d) {
                //console.log(d.amount)
                return d.amount; }) (piedata);

    // Set the arcs for the chart and the labels with inner & outer radii
    var arc = d3v5.arc()
        .outerRadius(r - 10)
        .innerRadius(0);

    var labelArc = d3v5.arc()
        .outerRadius(r - 100)
          .innerRadius(r - 40);

  //create tip
  var tip = d3v5.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<span style='color:lavender'>" + d.value + "</span> <strong>%</strong>";
        })

 // Select the svg and append the pie
  var svg = d3v5.select("#piechart")
    .append("svg")
    .attr("id","pies")
    .attr("width", w + 250)
    .attr("height", h + 150)
    .append("g")
    .attr("transform", "translate(" + w / 2 + "," + h /1.2 +")");

    svg.call(tip);

    var g = svg.selectAll("arc")
        .data(pie)
        .enter().append("g")
        .attr("transform", "translate(" + w / 3 + "," + h / 10 +")")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.type);})
        .on("mouseover", tip.show)
        .on('mouseout', tip.hide);

    // Add labels
    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .text(function(d) { return d.data.type;})
        .style("fill", "#fff");

    var actualyear = year.replace('Y', '');

    // Add title
    svg.append("text")
        .attr("class","title")
        .attr("x", (w / 3))
        .attr("y", - .55 * h)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .style("fill", "#00491b")
        .style("font-family", "Palatino")
        .text("Food v Feed for " + [name] + " in " + [actualyear]);

        // Draw barchart when clicking on an slice
        svg.selectAll(".arc")
          .on("click", function(d) {
              drawbarchart(countrydata, id, name, d.data.type, year);
          });
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
