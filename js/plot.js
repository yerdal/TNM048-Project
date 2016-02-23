function plot(){

  var self = this;

  var data2014 = [];

  var data2010 = [];

  var data2006 = [];

  var data2002 = [];

  var plotDiv = $("#barchart");

  var margin = {top: 20, right: 20, bottom: 20, left: 40},
      width = plotDiv.width() - margin.right - margin.left,
      height = plotDiv.height() - margin.top - margin.bottom;


  //console.log("HEJ", plotDiv);

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")


  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")


  var svg = d3.select("#barchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  //load data
  d3.csv("data/Swedish_Election_2014.csv", function(error, data) {
      self.data = data;

      //define the domain of the scatter plot axes
  x.domain([0, d3.max(data, function(d) { return d["region"]; })]);
  y.domain([0, d3.max(data, function(d) {
      //console.log(d["region"], d["party"], d["Year=2014"]);
    return d["Year=2014"]; })]);

    draw();
  });






}

function draw(){

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
      /*.text( function(d) {
          return d["Year"];
      })*/

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
    /*text( function(d) {
          return d["Year"];
      })*/


}
