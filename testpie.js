function testpie(){
    var dataset = {
      hddrives: [20301672448, 9408258048, 2147483648, 21474836480, 35622912,32212254720],
    };
    console.log(dataset)
    var width = 460,
        height = 300,
        radius = Math.min(width, height) / 2;

    var color = d3v5.scaleOrdinal()
        .range(["#2DA7E2"]);
    //
    // var pie = d3v5.layout.pie()
    //     .sort(null);



    var svg = d3v5.select("#container5").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var arc = d3v5.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 70);

    //Draw the Circle
     svg.append("circle")
                              .attr("cx", 0)
                              .attr("cy", 0)
                              .attr("r", 65)
                              .attr("fill", "#F1F1F1");

    var path = svg.selectAll("path")
        .data(pie(dataset.hddrives))
          .enter().append("path")
         .attr("class", "arc")
        .style("opacity", function(d, i) { return i == dataset.hddrives.length - 1 ? 0 : 1; })
        .attr("fill", function(d, i) { return color(i); })
        .attr("d", arc);
    svg.append("text")
          .attr("dy", "0em")
          .style("text-anchor", "middle")
          .attr("class", "inside")
          .text(function(d) { return '56%'; });
    svg.append("text")
           .attr("dy", "1.5em")
          .style("text-anchor", "middle")
          .attr("class", "data")
          .text(function(d) { return '53GB / 123GB'; });
};
