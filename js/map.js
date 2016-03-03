function map() {
    data = {};

    var municipalityToBarchart;

    var availableTags = [];
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", move); 
    var currentMunicipality;
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

    var mapDiv = $("#map");
    var municipality;

    var margin = {top: 20, right: 20, bottom: 20, left: 5},
        width = mapDiv.width() - margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;
   
    var projection = d3.geo.albers()
	    .center([4, 70])
	    .rotate([-10, 0])
	    .parallels([30, 60])
	    .scale(700 * 3.5)
	    .translate([width / 2, 0]);
          
    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    var path = d3.geo.path()
        .projection(projection);
    
    g = svg.append("g");
    
    d3.json("data/swe_mun.topojson", function(error, municipalities) {
        var munis = topojson.feature(municipalities, municipalities.objects.swe_mun).features; 
        d3.csv("data/Swedish_Election_2014.csv", function(error, data) {
            munis.filter(function(d) {
                availableTags.push((d.properties.name));
            });

            draw(munis, data);
		});
        
    });
    
    function draw(munis, data) {
        municipality = g.selectAll(".municipality").data(munis);
        
        municipality.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .style("fill", function(d){return "lightblue";})

        .on("mouseover", function(d){
                return tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(d) {
                return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").style("color", "purple").text(d.properties.name);
        })
        .on("mouseout",  function(d) {
                return tooltip.style("visibility", "hidden");
        })
        .on("click", function(d) {

          selectMunicipality(d.properties.name);
        });


    }
    
    function selectMunicipality(value) {
        
            if (!municipality)
            {
                console.log("hej");
            }
            else
            {
                municipality.style("fill", function(d){

                    if (value == d.properties.name){
                        
                        bc.setCurrentMunicipality(value);
                        plot1.setCurrentMunicipality(value);
                        var biggestCoalition = bc.getBiggestCoalition();
                        
                        return biggestCoalition;

                    }
                    else {
                        return "lightblue";
                    };
            })
        }
    };
    

     //zoom and panning method, this is code from the labs.
    function move() {
        var t = d3.event.translate;
        var s = d3.event.scale;
        
        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }

     
  function autoComplete() {
       $( "#searchRegion" ).autocomplete({
      source: availableTags
    });
  }; 

    $( "input" ).keyup(function() {
        var value = $( this ).val();
        selectMunicipality(value)
         autoComplete();
    }).keyup();




}



