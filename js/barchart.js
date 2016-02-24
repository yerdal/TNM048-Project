function barchart(data)
{

	var barchartDiv = $("#barchart");
	var results;
	var str = "..";

	var keys = d3.keys(data[0]);

	var filteredData = [];
	for (var i = 0; i < data.length; i++)
	{
		if (data[i]["party"] != "ej röstande" && data[i]["party"] != "ogiltiga valsedlar"
			&& (data[i].region != "1229 Bara"))
    	{
			filteredData.push(data[i]);
		}
	}
	var nationalResults = [];
	nationalResults = calcNationalResults(filteredData);
	
  	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 900 - margin.left - margin.right,

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
    .tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "%");

    var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    


    draw(nationalResults);

	function draw(data) 
	{
	    x.domain(data.map(function(d) { return getPartyAbbreviation(d.party); }));
	    //y.domain([0, 1]);
	    y.domain([0, 100 ] );	
	    svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	    svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	      .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 5)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")

	    svg.selectAll(".bar")
	      .data(data)
	      .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) {  return x(d.party); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) {  return y(d.votes); })
	      .attr("height", function(d) { return height - y(d.votes); });

    }

    function calcNationalResults(filteredData)
    {
    	var NUM_PARTIES = 9;
    	var nationalResults = [];
    	
    	var parties = [];
    	var count = 0;
    	var vote = 0;
    	for (var i = 0; i < NUM_PARTIES; i++)
    	{
    		nationalResults.push({"party":filteredData[i].party, "region":"Sweden", "votes": 0})
    	}

    	for (var i = 0; i < filteredData.length; i++)
    	{
    		for (var k = 0; k < NUM_PARTIES; k++)
    		{
    			if (nationalResults[k].party == filteredData[i].party)
    			{
    				nationalResults[k].votes+=parseFloat(filteredData[i].votes);
    				break;
    			}

    		}
    		count+=1/9;
    	}
    	for (var i = 0; i < nationalResults.length; i++)
    	{
    		nationalResults[i].votes/=count;
    		nationalResults[i].votes = (nationalResults[i].votes).toFixed(1);
    	}

    	/*filteredData.push(nationalResults);*/
    	return nationalResults;
    }

    function getPartyAbbreviation(party)
    {
    	if (party == "Moderaterna")
    		return "M";
    	else if (party == "Socialdemokraterna")
    		return "S";
    	else if (party == "Miljöpartiet")
    		return "MP";
    	else if (party == "Sverigedemokraterna")
    		return "SD";
    	else if (party == "Kristdemokraterna")
    		return "KD";
    	else if (party == "Vänsterpartiet")
    		return "V";
    	else if (party == "Centerpartiet")
    		return "C";
    	else if (party == "Folkpartiet")
    		return "FP";
    	else if (party == "övriga partier")
    		return "Ö";
    }	
    	
}

 
	    






