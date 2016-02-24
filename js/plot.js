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
    .range([0, width]);


  var y = d3.scale.linear()
    .range([height, 0]);


  var svg = d3.select("#plotchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var g = svg.append("svg:g")
    .attr("transform", "translate(0, 200)");

  var line = d3.svg.line()
    .x(function(d, i) {
      //console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
      // return the X coordinate where we want to plot this datapoint
      return x(i);
    })
    .y(function(d) {
      // verbose logging to show what's actually being done
      //console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
      // return the Y coordinate where we want to plot this datapoint
      return y(d);
    })


  var xAxis = d3.svg.axis()
    .scale(x)
    .tickValues(xValues)
    .orient("bottom");


  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var color = d3.scale.category20();


  //load data for 2014
  d3.csv("data/Swedish_Election_2014.csv", function(error, data) {
    self.data = data;
    data.forEach(function(d) {
      data2014.push(d);
      //votes2014.push(d.votes);
    })


  });

  //load data for 2010
  d3.csv("data/Swedish_Election_2010.csv", function(error, data) {
    self.data = data;
    data.forEach(function(d) {
      data2010.push(d);
      //console.log("Vote", d.votes);
      //votes2010.push(d.votes);
    })
  });

  //Load data for 2006
  d3.csv("data/Swedish_Election_2006.csv", function(error, data) {
    self.data = data;
    data.forEach(function(d) {
      //console.log( "HEJ", d);
      data2006.push(d);
      //votes2006.push(d.votes);
    })
  });

  //Load data for 2002
  d3.csv("data/Swedish_Election_2002.csv", function(error, data) {
    self.data = data;
    data.forEach(function(d) {
      //console.log( "HEJ", d);
      data2002.push(d);
      //votes2002.push(d.votes);

    })


    //define the domain of the scatter plot axes
    x.domain(d3.extent(xValues, function(d) {
      return d;
    }));
    y.domain([0, d3.max(yValues, function(d) {
      return d;
    })]);
    draw();
  });

  function draw() {
    /*console.log("data2014", data2014[0]);
    console.log("data2010", data2010[0]);
    console.log("data2006", data2006[0]);

    console.log("data2002", data2002[0]);
    console.log("Votes2014", votes2014[0]);
    console.log("Votes2010", votes2010[0]);
    console.log("Votes2006", votes2006[0]);
    console.log("Votes2002", votes2002[0]);*/
    //electionForParty(data2014);
    //console.log(data2006);

    var votes2014 = calcNationalResults(data2014);
    var votes2010 = calcNationalResults(data2010);
    var votes2006 = calcNationalResults(data2006);
    var votes2002 = calcNationalResults(data2002);

    var moderatVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Moderaterna");
    var centerVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Centerpartiet");
    var folkVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Folkpartiet");
    var kristVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Kristdemokraterna");
    var milVotes = forEachParty(votes2014, votes2010, votes2006, votes2002, "Miljöpartiet");

    /*for(var i = 0; i <= votes2014.length; i++){
      console.log("LOG", votes2014[i].party);
      if(votes2014[i].party == "Moderaterna"){
        moderatVotes.push(votes2014[i]);
      }
    }
    console.log("ModeratVotes", moderatVotes);*/

    /*    var graph = d3.select("#graph").append("svg:svg")
    			      .attr("width", w + m[1] + m[3])
    			      .attr("height", h + m[0] + m[2])
    			    .append("svg:g")
    			      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");*/

    // Add x axis and title.
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width - 50)
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

  function forEachParty(data1, data2, data3, data4, chosenParty) {
    var result = [];
    data1.forEach(function(d) {
      if (d.party == chosenParty) {
        result.push(d);
      }
    })

    data2.forEach(function(d) {
      if (d.party == chosenParty) {
        result.push(d);
      }
    })

    data3.forEach(function(d) {
      if (d.party == chosenParty) {
        result.push(d);
      }
    })

    data4.forEach(function(d) {
      if (d.party == chosenParty) {
        result.push(d);
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
        "party": data[i].party,
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
