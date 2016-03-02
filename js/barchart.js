function barchart(data)
{
	var municipalityData = [];
	var blockMunicipalityData = [];
	var barchartDiv = $("#barchart");
	var results;
	var str = "..";
	var colormap = d3.scale.category20();
	var currentMunicipality = "Sweden"; // national data by default
	var keys = d3.keys(data[0]);
    var filteredData = [];
	filterData(data);
	var nationalResults = [];
	calcNationalResults(filteredData);
    var checkBox = document.getElementById("blocks");
  	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 900 - margin.left - margin.right,

    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
    .range([height, 0]);
    // 
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
    var currentData = [];
    var biggestPartyCoalition;

	function draw(data)
	{
		svg.selectAll(".bar").remove();
		svg.selectAll(".axis").remove();	
		svg.selectAll("g").remove();
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
	      .style("fill", function(d){ return getPartyColor(d.party)})
	      .attr("height", function(d) { return height - y(d.votes); });


    }

    function calcNationalResults()
    {
    	var NUM_PARTIES = 9;
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
        else if (party == "Blue")
            return "Blått block";
        else if (party == "Red")
            return "Rött block";
    }
    function filterData()
    {
    	for (var i = 0; i < data.length; i++)
    	{
    		if (data[i]["party"] != "ej röstande" && data[i]["party"] != "ogiltiga valsedlar"
    			&& (data[i].region != "1229 Bara"))
    		{
    			filteredData.push(data[i]);
    		}
    	}
    }
    this.setCurrentMunicipality = function(value)
    {
    	if (value!= "")
    	{
	    	currentMunicipality = value;
             $(".barChartText").html(currentMunicipality);	

	    	filterByMunicipality();
	    }
    }

    function filterByMunicipality()
    {
    	municipalityData = [];
    	for (var i = 0; i < filteredData.length; i++)
    	{
    		if (filteredData[i].region.indexOf(currentMunicipality) != -1)
    		{
    			municipalityData.push(filteredData[i]);
    		}	
    	}
        blockMunicipalityData = filterByBlock(municipalityData);
        if($('#blocks').is(":checked")) 
        {
    	   draw(blockMunicipalityData);
        }
        else
        {
            draw(municipalityData);
        }
    		    	
    }
    function getPartyColor(party)
    {
    	if (party == "Moderaterna" || party == "Blue")
    		return "#3333ff"
    	else if (party == "Socialdemokraterna" || party == "Red")
    		return "#ff3300";
    	else if (party == "Miljöpartiet")
    		return "#33cc33"
    	else if (party == "Sverigedemokraterna")
    		return "#e6e600";
    	else if (party == "Kristdemokraterna")
    		return "#000099";
    	else if (party == "Vänsterpartiet")
    		return "#cc0000";
    	else if (party == "Centerpartiet")
    		return "#009900";
    	else if (party == "Folkpartiet")
    		return "#00ccff";
    	else if (party == "övriga partier")
    		return "#000000";

    }
    this.getBiggestCoalition = function()
    {
    	return getPartyColor(biggestPartyCoalition);
    }
    function findBiggestParty(municipalityData)
    {
    	var largestVal = municipalityData[0].votes;
    	biggestParty = municipalityData[0].party;
    	for (var i = 1; i < municipalityData.length; i++)
    	{
    		if(parseFloat(municipalityData[i].votes) > largestVal)
    		{
    			largestVal = municipalityData[i].votes;
    			biggestParty = municipalityData[i].party;
    		}
    	}
    }
    function findBiggestCoalition(data)
    {
    	var largestVal = data[0].votes;
    	biggestPartyCoalition = data[0].party;
    	for (var i = 1; i < data.length; i++)
    	{
    		if (data[i].votes > largestVal)
    		{
    			largestVal = data[i].votes;
    			biggestPartyCoalition = data[i].party;
    		}
    	}

    }

    function filterByBlock(data) 
    {
        var blockData = [];
        blue = (parseFloat(data[0]["votes"])+parseFloat(data[1]["votes"])+parseFloat(data[2]["votes"])+parseFloat(data[3]["votes"])).toFixed(1);
        red = (parseFloat(data[4]["votes"])+parseFloat(data[5]["votes"])+parseFloat(data[6]["votes"])).toFixed(1);
        rest = (parseFloat(data[7]["votes"])+parseFloat(data[8]["votes"])).toFixed(1);
        blockData.push({"party":"Blue", "region":data[0]["region"], "votes": blue});
        blockData.push({"party":"Red", "region":data[0]["region"], "votes": red});
        blockData.push({"party":"övriga partier", "region":data[0]["region"], "votes": rest});
        findBiggestCoalition(blockData);
        return blockData;
    }

   checkBox.onchange = function() {
   		console.log(filteredData);
       	if($('#blocks').is(":checked")) 
       	{
      		if (blockMunicipalityData.length == 0)
      		{
      			draw(filterByBlock(nationalResults));
      		}
      		else
      		{
           		draw(blockMunicipalityData);
           	}
       	}
       else 
       	{ 
       		if (municipalityData.length == 0)
       		{
       			console.log("hej");
           		draw(nationalResults);
           	}
           	else
           	{
           		draw (municipalityData);
           	}
    	}
   }
    
}

