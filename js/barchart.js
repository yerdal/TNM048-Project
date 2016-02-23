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
	
	var margin = [30, 10, 10, 10],
	    width = barchartDiv.width() - margin[1] - margin[3],
	    height = barchartDiv.height() - margin[0] - margin[2];


	function draw(data) 
	{
	
	}
	
	/*d3.select("#barchart")
  	.selectAll("div")
    .data(filteredData)
  	.enter().append("div")
    .style("width", function(d) {  return d * 10 + "px"; })
    .text(function(d){ return d.party; });*/
};
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
}

/*function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}*/



//}




