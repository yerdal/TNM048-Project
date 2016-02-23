
function plot(){
  var data2014 = [];

  var data2010 = [];

  var data2006 = [];

  var data2002 = [];

  var xValues = [2002, 2006, 2010, 2014];

  var self = this;


  var plotDiv = $("#plotchart");

  var margin = {top: 20, right: 20, bottom: 20, left: 40},
      width = plotDiv.width() - margin.right - margin.left,
      height = plotDiv.height() - margin.top - margin.bottom;
      //console.log("plotheight", plotDiv.height());
  var x = d3.scale.linear()
      .range([0, width]);


  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .tickValues(xValues)
      .orient("bottom");


  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");


  var svg = d3.select("#plotchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  //load data for 2014
  d3.csv("data/Swedish_Election_2014.csv", function(error, data) {
      self.data = data;
      data.forEach(function(d){

        data2014.push(d);

      })
  });

  //load data for 2010
  d3.csv("data/Swedish_Election_2010.csv", function(error, data) {
      self.data = data;
      data.forEach(function(d){

        data2010.push(d);

      })
  });

  //Load data for 2006
  d3.csv("data/Swedish_Election_2006.csv", function(error, data) {
      self.data = data;
      data.forEach(function(d){
        //console.log( "HEJ", d);
        data2006.push(d);

      })
  });

  //Load data for 2002
  d3.csv("data/Swedish_Election_2002.csv", function(error, data) {
      self.data = data;
      data.forEach(function(d){
        //console.log( "HEJ", d);
        data2002.push(d);

      })
      //define the domain of the scatter plot axes
      x.domain(d3.extent(xValues, function(d){return d}));
      y.domain([0, d3.max(data2002,function(d){
       //console.log("TEST", d["Year=2002"]);
       return d["Year=2002"];})]);
      draw();

  });


  function draw(){
/*    console.log("data2014", data2014.length);
    console.log("data2010", data2010.length);
    console.log("data2006", data2006.length);
    console.log("data2002", data2002.length);*/


    // Add x axis and title.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width-50)
        .attr("y", -6)
      .data(self.data)
      .text("Election Year");

    // Add y axis and title.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 8)
        .attr("x", -100)
        .attr("dy", ".71em")
      .data(self.data)
      .text("Election result (%)");


  }

}
