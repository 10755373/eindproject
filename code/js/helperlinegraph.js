// preset the linegraph
function presetlinegraph() {

    // determine ranges
    xrange = d3v5.time.scale()
        .rangeRound([0, width]);
    yrange = d3v5.scale.linear()
        .rangeRound([height, 0]);

    // determine x-axis
    xaxis = d3v5.svg.axis()
        .scale(xrange)
        .orient("bottom");

    // determine y-axis
    yaxis = d3v5.svg.axis()
        .scale(yrange)
        .orient("left");

    // make linegraph function
    line = d3v5.svg.line()
        .x(function(d) { return xrange(d.year); })
        .y(function(d) { return yrange(d.no); });
};

// set y axis of timeline country
function setYAxisTimelineCountry() {

    // define max for y axis
    var dataGraphCountryAmount = dataGraphCountry.map(function(d){ return d.amount; });
    maxDataGraphCountryAmount = Math.max.apply(null, dataGraphCountryAmount);

    // set domain for timeline
    xG.domain(d3v5.extent(yearsTime));
    yG.domain([0, maxDataGraphCountryAmount]);
};

// set title y axis of timeline
function setTitleYAxisTimeline(title) {
    svgGraphCountry.select("#axisTitleY")
        .text(title);
};

// make the axis for the timeline
function makeAxisTimelineCountry() {

    // make x axis
    svgGraphCountry.append("g")
        .attr("class", "x axis")
        .attr("id", "axisXTimeline")
        .attr("transform", "translate(0," + heightG + ")")
        .call(xAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", widthG)
            .attr("y", 50)
            .style("text-anchor", "end")
            .text("Time");

    // make y axis
    svgGraphCountry.append("g")
        .attr("class", "y axis")
        .attr("id", "axisYTimeline")
        .call(yAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("id", "axisTitleY")
            .attr("transform", "rotate(-90)")
            .attr("y", - 90)
            .attr("dy", ".71em")
            .style("text-anchor", "end");

    // decide on title y axis
    if (absPerc == "percentage of inhabitants") {
        setTitleYAxisTimeline("Percentage of inhabitants");
    }
    else if (absPerc == "absolute values") {
        setTitleYAxisTimeline("Amount of refugees");
    };
};
