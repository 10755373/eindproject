window.onload = function() {
  makepie();
};


// draw datamap with fillkeys from json, if existing
function makepie(){

  // // create promise for json of gdp-data
  // d3v5.json("data.json").then(function(data) {



  var data = [2, 4, 8, 10];

  var svg = d3v5.select("svg"),
      width = svg.attr("width"),
      height = svg.attr("height"),
      radius = Math.min(width, height) / 2,
      g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3v5.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

  // Generate the pie
  var pie = d3.pie();

  // Generate the arcs
  var arc = d3v5.arc()
              .innerRadius(0)
              .outerRadius(radius);

  //Generate groups
  var arcs = g.selectAll("arc")
              .data(pie(data))
              .enter()
              .append("g")
              .attr("class", "arc")

  //Draw arc paths
  arcs.append("path")
      .attr("fill", function(d, i) {
          return color(i);
      })
      .attr("d", arc)

    };
