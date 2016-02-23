function map() {
    
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", move);

    var colorscale = d3.scale.category20();  
    
    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("a simple tooltip");
    
    var mapDiv = $("#map");

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = mapDiv.width() - margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;
   
   var projection = d3.geo.mercator()
        .center([20, 66 ])
        .scale(1500);
        
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
			draw(munis, data);
		});
       // draw(munis);
        
    });
    
    function draw(munis, data) {

        var municipality = g.selectAll(".municipality").data(munis);

        console.log(munis);

        var cc = {};
        munis.forEach(function(d) {
			cc[d.properties.name] = colorscale(d.properties.name);
		});

        municipality.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .attr("title", function(d) { return d.properties.name; })
            .style("fill", function(d){return cc[d.properties.name];})

        .on("mouseover", function(d){
                return tooltip.style("visibility", "visible");
                console.log(d);
        })
        .on("mousemove", function(d) {
                return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(d.properties.name);
                console.log(d);
        })
        .on("mouseout",  function(d) {
                return tooltip.style("visibility", "hidden");
                console.log(d);
        })

    }
    
     //zoom and panning method, this is code from the labs.
    function move() {
        var t = d3.event.translate;
        var s = d3.event.scale;
        
        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }
}

