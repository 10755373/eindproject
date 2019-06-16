/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

function RadarChart(id, data, options) {

  var cfg = {
	 w: 600,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.scale.category10()	//Color function
	};

	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if

	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));

	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format('%'),			 	//Percentage formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

	//Scale for the radius
	var rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);

	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();

	//Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
	//Append a g element
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////

	//Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////

	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");

	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", function(d){return -d*radius/cfg.levels;})
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(function(d,i) { return Format(maxValue * d/cfg.levels); });

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////

	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////

	//The radial line function
	var radarLine = d3.svg.line.radial()
		.interpolate("linear-closed")
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) {	return i*angleSlice; });

	if(cfg.roundStrokes) {
		radarLine.interpolate("cardinal-closed");
	}

	//Create a wrapper for the blobs
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");

	//Append the backgrounds
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function (d,i){
			//Dim all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1);
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);
		})
		.on('mouseout', function(){
			//Bring back all blobs
			d3.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});

	//Create the outlines
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.style("fill", "none")
		.style("filter" , "url(#glow)");

	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i,j) { return cfg.color(j); })
		.style("fill-opacity", 0.8);

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////

	//Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");

	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius*1.5)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;

			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(Format(d.value))
				.transition().duration(200)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});

	//Set up the small tooltip for when you hover over a circle
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);

	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap

};//RadarChart



// //Practically all this code comes from https://github.com/alangrafu/radar-chart-d3
// //I only made some additions and aesthetic adjustments to make the chart look better
// //(of course, that is only my point of view)
// //Such as a better placement of the titles at each line end,
// //adding numbers that reflect what each circular level stands for
// //Not placing the last level and slight differences in color
// //
// //For a bit of extra information check the blog about it:
// //http://nbremer.blogspot.nl/2013/09/making-d3-radar-chart-look-bit-better.html
//
// var RadarChart = {
//   draw: function(id, d, options){
//   var cfg = {
// 	 radius: 5,
// 	 w: 600,
// 	 h: 600,
// 	 factor: 1,
// 	 factorLegend: .85,
// 	 levels: 3,
// 	 maxValue: 0,
// 	 radians: 2 * Math.PI,
// 	 opacityArea: 0.5,
// 	 ToRight: 5,
// 	 TranslateX: 80,
// 	 TranslateY: 30,
// 	 ExtraWidthX: 100,
// 	 ExtraWidthY: 100,
// 	 color: d3.scale.category10()
// 	};
//
// 	if('undefined' !== typeof options){
// 	  for(var i in options){
// 		if('undefined' !== typeof options[i]){
// 		  cfg[i] = options[i];
// 		}
// 	  }
// 	}
// 	cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
// 	var allAxis = (d[0].map(function(i, j){return i.axis}));
// 	var total = allAxis.length;
// 	var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
// 	var Format = d3.format('%');
// 	d3.select(id).select("svg").remove();
//
// 	var g = d3.select(id)
// 			.append("svg")
// 			.attr("width", cfg.w+cfg.ExtraWidthX)
// 			.attr("height", cfg.h+cfg.ExtraWidthY)
// 			.append("g")
// 			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
// 			;
//
// 	var tooltip;
//
// 	//Circular segments
// 	for(var j=0; j<cfg.levels-1; j++){
// 	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
// 	  g.selectAll(".levels")
// 	   .data(allAxis)
// 	   .enter()
// 	   .append("svg:line")
// 	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
// 	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
// 	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
// 	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
// 	   .attr("class", "line")
// 	   .style("stroke", "grey")
// 	   .style("stroke-opacity", "0.75")
// 	   .style("stroke-width", "0.3px")
// 	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
// 	}
//
// 	//Text indicating at what % each level is
// 	for(var j=0; j<cfg.levels; j++){
// 	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
// 	  g.selectAll(".levels")
// 	   .data([1]) //dummy data
// 	   .enter()
// 	   .append("svg:text")
// 	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
// 	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
// 	   .attr("class", "legend")
// 	   .style("font-family", "sans-serif")
// 	   .style("font-size", "10px")
// 	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
// 	   .attr("fill", "#737373")
// 	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
// 	}
//
// 	series = 0;
//
// 	var axis = g.selectAll(".axis")
// 			.data(allAxis)
// 			.enter()
// 			.append("g")
// 			.attr("class", "axis");
//
// 	axis.append("line")
// 		.attr("x1", cfg.w/2)
// 		.attr("y1", cfg.h/2)
// 		.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
// 		.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
// 		.attr("class", "line")
// 		.style("stroke", "grey")
// 		.style("stroke-width", "1px");
//
// 	axis.append("text")
// 		.attr("class", "legend")
// 		.text(function(d){return d})
// 		.style("font-family", "sans-serif")
// 		.style("font-size", "11px")
// 		.attr("text-anchor", "middle")
// 		.attr("dy", "1.5em")
// 		.attr("transform", function(d, i){return "translate(0, -10)"})
// 		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
// 		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
//
//
// 	d.forEach(function(y, x){
// 	  dataValues = [];
// 	  g.selectAll(".nodes")
// 		.data(y, function(j, i){
// 		  dataValues.push([
// 			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
// 			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
// 		  ]);
// 		});
// 	  dataValues.push(dataValues[0]);
// 	  g.selectAll(".area")
// 					 .data([dataValues])
// 					 .enter()
// 					 .append("polygon")
// 					 .attr("class", "radar-chart-serie"+series)
// 					 .style("stroke-width", "2px")
// 					 .style("stroke", cfg.color(series))
// 					 .attr("points",function(d) {
// 						 var str="";
// 						 for(var pti=0;pti<d.length;pti++){
// 							 str=str+d[pti][0]+","+d[pti][1]+" ";
// 						 }
// 						 return str;
// 					  })
// 					 .style("fill", function(j, i){return cfg.color(series)})
// 					 .style("fill-opacity", cfg.opacityArea)
// 					 .on('mouseover', function (d){
// 										z = "polygon."+d3.select(this).attr("class");
// 										g.selectAll("polygon")
// 										 .transition(200)
// 										 .style("fill-opacity", 0.1);
// 										g.selectAll(z)
// 										 .transition(200)
// 										 .style("fill-opacity", .7);
// 									  })
// 					 .on('mouseout', function(){
// 										g.selectAll("polygon")
// 										 .transition(200)
// 										 .style("fill-opacity", cfg.opacityArea);
// 					 });
// 	  series++;
// 	});
// 	series=0;
//
//
// 	d.forEach(function(y, x){
// 	  g.selectAll(".nodes")
// 		.data(y).enter()
// 		.append("svg:circle")
// 		.attr("class", "radar-chart-serie"+series)
// 		.attr('r', cfg.radius)
// 		.attr("alt", function(j){return Math.max(j.value, 0)})
// 		.attr("cx", function(j, i){
// 		  dataValues.push([
// 			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
// 			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
// 		]);
// 		return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
// 		})
// 		.attr("cy", function(j, i){
// 		  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
// 		})
// 		.attr("data-id", function(j){return j.axis})
// 		.style("fill", cfg.color(series)).style("fill-opacity", .9)
// 		.on('mouseover', function (d){
// 					newX =  parseFloat(d3.select(this).attr('cx')) - 10;
// 					newY =  parseFloat(d3.select(this).attr('cy')) - 5;
//
// 					tooltip
// 						.attr('x', newX)
// 						.attr('y', newY)
// 						.text(Format(d.value))
// 						.transition(200)
// 						.style('opacity', 1);
//
// 					z = "polygon."+d3.select(this).attr("class");
// 					g.selectAll("polygon")
// 						.transition(200)
// 						.style("fill-opacity", 0.1);
// 					g.selectAll(z)
// 						.transition(200)
// 						.style("fill-opacity", .7);
// 				  })
// 		.on('mouseout', function(){
// 					tooltip
// 						.transition(200)
// 						.style('opacity', 0);
// 					g.selectAll("polygon")
// 						.transition(200)
// 						.style("fill-opacity", cfg.opacityArea);
// 				  })
// 		.append("svg:title")
// 		.text(function(j){return Math.max(j.value, 0)});
//
// 	  series++;
// 	});
// 	//Tooltip
// 	tooltip = g.append('text')
// 			   .style('opacity', 0)
// 			   .style('font-family', 'sans-serif')
// 			   .style('font-size', '13px');
//   }
// };
