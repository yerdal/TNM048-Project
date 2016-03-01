function plot() {
  var data2014 = [];
  var votes2014 = [];
  var moderat2014 = 0;

  var data2010 = [];
  var votes2010 = [];

  var data2006 = [];
  var votes2006 = [];

  var data2002 = [];
  var votes2002 = [];

  var xValues = [2002, 2006, 2010, 2014];
  var yValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  var self = this;


  var plotDiv = $("#plotchart");

  var margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 40
    },
    width = plotDiv.width() - margin.right - margin.left,
    height = plotDiv.height() - margin.top - margin.bottom;
  //console.log("plotheight", plotDiv.height());
  var x = d3.scale.linear()
    .range([0, width]).domain([2002,2014]);


  var y = d3.scale.linear()
    .range([height, 0])
    .domain([0, 60]);

  var svg = d3.select("#plotchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.svg.axis()
    .scale(x)
    .tickValues(xValues)
    .orient("bottom");


  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var color = d3.scale.category20();

  var line = d3.svg.line()
      .x(function(d) { console.log("year", d.year);
        return x(d.year); })
      .y(function(d) { //console.log("vote", d);
        return y(d.votes); })
      .interpolate("linear");

  //load data for 2014
  d3.csv("data/Swedish_Election_2014.csv", function(error, data) {
    self.data = data;
    data.forEach(function(d) {
      data2014.push(d);
    })
  });

  //load data for 2010
  d3.csv("data/Swedish_Election_2010.csv", function(error, data) {
    self.data = data;
    data.forEach(function(d) {
      data2010.push(d);
    })
  });

  //Load data for 2006
  d3.csv("data/Swedish_Election_2006.csv", function(error, data) {
    self.data = data;
    data.forEach(function(d) {
      data2006.push(d);
    })
  });

  //Load data for 2002
  d3.csv("data/Swedish_Election_2002.csv", function(error, data) {
    self.data = data;
    data.forEach(function(d) {
      data2002.push(d);
    })
    //define the domain of the scatter plot axes
    draw();
  });


  function draw() {

    //Filter data for every year
    var votes2014 = calcNationalResults(data2014);
    var votes2010 = calcNationalResults(data2010);
    var votes2006 = calcNationalResults(data2006);
    var votes2002 = calcNationalResults(data2002);

    //Create array for every party with the result in every election from 2002-2014
    // {2014, 2010, 2006, 2002}
    var moderatVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Moderaterna");
    var centerVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Centerpartiet");
    var folkVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Folkpartiet");
    var kristVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Kristdemokraterna");
    var milVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Miljöpartiet");
    var socVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Socialdemokraterna");
    var vansterVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Vänsterpartiet");
    var sdVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Sverigedemokraterna");
    var ovrigVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "övriga partier");

    var totData = [moderatVotes, centerVotes];

    /*var dataGroup = d3.nest()
      .key(function(d){
        console.log("test", d.party);
        return d.party;
      })
      .entries(votes2014);

      console.log("grupp", dataGroup);*/

    /*totData.push(moderatVotes);
    totData.push(centerVotes);
    totData.push(folkVotes);
    totData.push(kristVotes);
    totData.push(milVotes);
    totData.push(socVotes);
    totData.push(vansterVotes);
    totData.push(sdVotes);
    totData.push(ovrigVotes);*/
    //console.log(moderatVotes);
    //console.log("tot", totData);

    // Add x axis and title.
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width - 50)
      .attr("y", -6)
      .text("Election Year");


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 8)
      .attr("x", -100)
      .attr("dy", ".71em")
      .text("Election result (%)");


      svg.append("svg:path")
      .attr("d", line(moderatVotes))
      //.data(moderatVotes)
      .attr("class", "line")
      /*.attr("stroke", function(d){
          console.log("tet", d.votes);
            return d.votes;
      })*/
      .attr("stroke-width", 3);

  }

  function forEachParty(data1, data2, data3, data4, chosenParty) {
    var result = [];

    data1.forEach(function(d) {
      if (d.party == chosenParty) {
        result.push({"year": 2014, 
                      "party": d.party,
                      "votes": d.votes});
      }
    })
    data2.forEach(function(d) {
      if (d.party == chosenParty) {
        result.push({"year": 2010, 
                      "party": d.party,
                      "votes": d.votes});
      }
    })

    data3.forEach(function(d) {
      if (d.party == chosenParty) {
        result.push({"year": 2006, 
                      "party": d.party,
                      "votes": d.votes});
      }
    })
    data4.forEach(function(d) {
      if (d.party == chosenParty) {
        result.push({"year": 2002, 
                      "party": d.party,
                      "votes": d.votes});
      }
    })
    //console.log(result);
    return result;
  }

  function calcNationalResults(data) {
    var filteredData = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]["party"] != "ej röstande" && data[i]["party"] != "ogiltiga valsedlar" && (data[i].region != "1229 Bara")) {
        filteredData.push(data[i]);
      }
    }

    var NUM_PARTIES = 9;
    var nationalResults = [];
    var parties = [];
    var count = 0;
    var vote = 0;
    for (var i = 0; i < NUM_PARTIES; i++) {
      nationalResults.push({
        "party": filteredData[i].party,
        "region": "Sweden",
        "votes": 0
      })
    }

    for (var i = 0; i < filteredData.length; i++) {
      for (var k = 0; k < NUM_PARTIES; k++) {
        if (nationalResults[k].party == filteredData[i].party) {
          nationalResults[k].votes += parseFloat(filteredData[i].votes);
          break;
        }

      }
      count += 1 / 9;
    }
    for (var i = 0; i < nationalResults.length; i++) {
      nationalResults[i].votes /= count;
      nationalResults[i].votes = (nationalResults[i].votes).toFixed(1);
    }
    //filteredData.push(nationalResults);
    //console.log("natres", nationalResults);
    return nationalResults;
  }

}
