function barchart(data)
{

	var barchartDiv = $("#barchart");
	var results;
	for (var i = 0; i < data.length; i++)
	{
		if(data[i]["party"] == "ogiltiga valsedlar" || data[i]["party"] == "ej röstande")
		{
			console.log("HEJ");
			delete data[i];
		}
	}
	console.log(data);

	var parties = {"Moderaterna":0, "Centerpartiet":0, "Folkpartiet":0, "Kristdemokraterna":0,
    				"Miljöpartiet":0, "Socialdemokraterna":0, "Vänsterpartiet":0, "Sverigdemokraterna":0,
    				"övriga partier":0};
   
    var keys = d3.keys(parties);
	for (var i = 0; i < data.length; i++)
	{
		console.log(data[i]["Year=2014"]);
		parties[data[i]["party"]]+= parseFloat(data[i]["Year=2014"]/(data.length/9));
		/*for (var k = 0; k < keys.length; k++)
		{
			if (data[i]["party"] == keys[k])
			{
				console.log(data[i]["Year=2014"]);
				parties[keys[k]]+=data[i]["Year=2014"];
			}
		}*/
	}
	console.log(parties);
	//console.log(parties);
	//console.log(data);
	/*var margin = {top: 100, right: 40, bottom: 100, left: 40},
    margin2 = {top: barchartDiv.height() - 50, right: 40, bottom: 20, left: 40},
    width = barchartDiv.width() - margin.left - margin.right,
            height = barchartDiv.height() - margin.top - margin.bottom,
            height2 = barchartDiv.height() - margin2.top - margin2.bottom;

    

        //Sets the scales 
    var x = d3.time.scale().range([0, width]),
            x2 = d3.time.scale().range([0, width]),
            y = d3.scale.linear().range([height, 0]),
            y2 = d3.scale.linear().range([height2, 0]);
    
    //Sets the axis 
    var xAxis = d3.svg.axis().scale(x).orient("bottom"),
            xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
            yAxis = d3.svg.axis().scale(y).orient("left");

    var area = d3.svg.area()
            .interpolate("step")
            .x(function (d) {
                return d["party"];
            })
            .y0(height)
            .y1(function (d) {
                return d["Year=2014"];
            });

    var svg = d3.select("#barchart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

    x.domain(d3.extent(data.map(function(d) { return d["party"]; })));
    y.domain(d3.extent(data.map(function(d) { return d["Year=2014"]; })));
    x2.domain(x.domain());
    y2.domain(y.domain());*/



    var width = 960,
    height = 500;

	var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
    .range([height, 0]);

	var chart = d3.select("#barchart")
    .attr("width", width)
    .attr("height", height);

	var svg = d3.select("#barchart").append("svg")
            .attr("width", width)
            .attr("height", height);

  	var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x(d["party"]) + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d["Year=2014"]); })
      .attr("height", function(d) { return height - y(d["Year=2014"]); })
      .attr("width", x.rangeBand());

  bar.append("text")
      .attr("x", x.rangeBand() / 2)
      .attr("y", function(d) { return y(d["Year=2014"]) + 3; })
      .attr("dy", ".75em")
      .text(function(d) {  return d["party"]; });
};

/*function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}*/



//}




