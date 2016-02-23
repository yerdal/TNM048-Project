function barchart(data)
{

	var barchartDiv = $("#barchart");
	var results;
	var str = "..";

	var keys = d3.keys(data[0]);
	//console.log(keys);
	var filteredData = [];
	for (var i = 0; i < data.length; i++)
	{
		if (data[i]["party"] != "ej röstande" && data[i]["party"] != "ogiltiga valsedlar")
	
    {
			filteredData.push(data[i]);
		}
	}
	
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    
    

    d3.csv("data/Swedish_Election_2014.csv", function(error, data) {
        draw(data);
    });
	function draw(data) {
        console.log(data);
    x.domain(data.map(function(d) { return d.party; }));
    y.domain([0, d3.max(data, function(d) { return d.votes; })]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.party); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.votes); })
      .attr("height", function(d) { return height - y(d.votes); });

    }

 
	    


// because ÅÄÖ is fucked.
function filterParties(data)
{
	/*var parties = {"M":0.0, "C":0.0, "FP":0.0, "KD":0.0,
    				"MP":0.0, "S":0.0, "V":0.0, "SD":0.0,
    				"O":0.0};*/
    var parties = [];

    parties.push({"M":0.0});
    parties.push({"C":0.0});
    parties.push({"FP":0.0});
    parties.push({"KD":0.0});
    parties.push({"MP":0.0});
    parties.push({"S":0.0});
    parties.push({"V":0.0});
    parties.push({"SD":0.0});
    parties.push({"O":0.0});

	var count = 0;
	for (var i = 0; i < data.length; i++)
	{
		if (data[i].votes != "..")
		{
			if (data[i].party.startsWith("V"))
			{
				parties["V"] += parseFloat(data[i].votes);
				count++;
			}
			else if (data[i].party.startsWith("Mi"))
			{
				parties["MP"] += parseFloat(data[i].votes);
			}
			else if (data[i].party.startsWith("ö")) // övriga partier
			{
				parties["O"] += parseFloat(data[i].votes);
			}
			else if (data[i].party.startsWith("Sv"))
			{
				parties["SD"] += parseFloat(data[i].votes);
			}
			else if (data[i].party.startsWith("So"))
			{
				parties["S"] += parseFloat(data[i].votes);
			}
			else if (data[i].party.startsWith("Mo"))
			{
				parties["M"] += parseFloat(data[i].votes);
			}
			else if (data[i].party.startsWith("Kr"))
			{
				parties["KD"] += parseFloat(data[i].votes);
			}
			else if (data[i].party.startsWith("Ce"))
			{
				parties["C"] += parseFloat(data[i].votes);
			}
			else if (data[i].party.startsWith("Fo"))
			{
				parties["FP"] += parseFloat(data[i].votes);
			}
		}
	}
	var keys = d3.keys(parties);
	for (var i = 0; i < keys.length; i++)
	{
		parties[keys[i]]/=count;
	}

	return parties;
}};

/*function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}*/



//}




