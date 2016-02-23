function map() {
    
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", move);

    var colorscale = d3.scale.category20();    
    
    var mapDiv = $("#map");

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = mapDiv.width() - margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;
   var projection = d3.geo.mercator()
        .center([50, 60 ])
        .scale(250);
        
   var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    var path = d3.geo.path()
        .projection(projection);
    
    g = svg.append("g");
    
    d3.json("data/swe_mun.topojson", function(error, municipalities) {
        console.log(municipalities);
        var munis = topojson.feature(municipalities, municipalities.objects.swe_mun).features; 

        draw(munis);
        
    });
    
    function draw(munis) {
        var municipality = g.selectAll(".municipality").data(munis);
   
        municipality.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d) { return d.id; })
            .attr("title", function(d) { return d.properties.name; })
            .style("fill", function(d){return colorscale(d.properties.name);})

    }
    
     //zoom and panning method, this is code from the labs.
    function move() {
        var t = d3.event.translate;
        var s = d3.event.scale;
        
        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }
}

