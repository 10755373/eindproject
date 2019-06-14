


function line(json){

  data_male = Object.values(json);

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // parse the date / time
  var parseTime = d3v5.timeFormat("%Y");

  // set the ranges
  var x = d3v5.scaleTime().range([0, width]);
  var y = d3v5.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3v5.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.no); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3v5.select("#container2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  list = []
  for (let i = 0; i < data_male.length; i++){
    if (data_male[i].country == "Germany" && data_male[i].sex == "male" && data_male[i].age == "15-24 years"){
      dict = {}
      dict["date"] = parseTime(data_male[i].year)
      dict["no"] = +data_male[i].suicides_no
      list.push(dict)
    }}
    console.log(list)
  // // Get the data
  // d3v5.csv("data.csv", function(error, data) {
  //   // if (error) throw error;
  //   console.log(data)
  //
  // listed = []
  // for (let i = 0; i < list.length; i++){
  //
  // }
  //   // format the data
  //   data.forEach(function(d) {
  //       d.date = parseTime(d.date);
  //       d.no = +d.no;
  //   });
  //
  //   data = []
  //   for (let i = 0; i < data_male.length; i++){
  //     if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
  //       dict = {}
  //       dict["x"] = data[i].year
  //       dict["y"] = data[i].suicides_no
  //       list.push(dict)
  //     }}

    // Scale the range of the data
    x.domain(d3v5.extent(data, function(d) { return d.date; }));
    y.domain([0, d3v5.max(data, function(d) { return d.no; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3v5.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3v5.axisLeft(y));



  // // https://www.d3v5-graph-gallery.com/graph/line_basic.html
  //
  // // set the dimensions and margins of the graph
  // var margin = {top: 40, right: 40, bottom: 40, left: 40},
  //     width = 700 - margin.left - margin.right,
  //     height = 800 - margin.top - margin.bottom;
  //
  // // append the svg object to the body of the page
  // var svg = d3v5v5.select("#my_dataviz")
  //   .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //     .attr("transform",
  //           "translate(" + margin.left + "," + margin.top + ")");
  //
  // var country = "Germany"
  //
  // data = Object.values(json);
  // list_values = []
  // for (let i = 0; i < data.length; i++){
  //   if (data[i].country == country && data[i].sex == "male" && data[i].age == "15-24 years"){
  //     // list_val = []
  //     // date = {}
  //     // value = {}
  //     // date["date"] = data[i].year
  //     // value["value"] = data[i].suicides_100k
  //     // // list[data[i].year] = data[i].suicides_no
  //     // // list.push(data[i].alpha_code, data[i].suicides_no)
  //     // // list_values[data[i].alpha_code] = data[i].suicides_no
  //     // list_val.push(date, value)
  //     // list_values.push(list_val)
  //     dict = {}
  //     dict["date"] = d3v5v5.timeParse("%Y")data[i].year
  //     dict["value"] = data[i].suicides_100k
  //     list_values.push(dict)
  //   }
  //   }
  //
  // console.log(list_values)
  // var data = list_values
  //
  //   // // When reading the csv, I must format variables:
  //   // function(d){
  //   //   return { date : d3v5v5.timeParse("%Y")(d.date), value : d.value }
  //   // },
  //
  //   // Now I can use this dataset:
  //   function(data) {
  //
  //     // Add X axis --> it is a date format
  //     var x = d3v5v5.scaleTime()
  //       .domain(d3v5v5.extent(data, function(d) { return d.date; }))
  //       .range([ 0, width ]);
  //     svg.append("g")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(d3v5v5.axisBottom(x));
  //
  //     // Add Y axis
  //     var y = d3v5v5.scaleLinear()
  //       .domain([0, d3v5v5.max(data, function(d) { return +d.value; })])
  //       .range([ height, 0 ]);
  //     svg.append("g")
  //       .call(d3v5v5.axisLeft(y));
  //
  //     // Add the line
  //     svg.append("path")
  //       .datum(data)
  //       .attr("fill", "none")
  //       .attr("stroke", "steelblue")
  //       .attr("stroke-width", 1.5)
  //       .attr("d", d3v5v5.line()
  //         .x(function(d) { return x(d.date) })
  //         .y(function(d) { return y(d.value) })
  //         )
  //
  // })


};
