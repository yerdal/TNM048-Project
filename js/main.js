var plot1;
var map1;
var bc;

d3.csv("data/Swedish_Election_2014.csv", function (data)
{


    bc = new barchart(data);
    map1 = new map(data);

     plot1 = new plot();

     //bc = new barchart(data);
     //map1 = new map(data);

     //plot1 = new plot();

});


document.getElementById("chooseYear").addEventListener("change", loadYear, false);

function loadYear() {
    var e = document.getElementById("chooseYear");
    var strUser = e.options[e.selectedIndex].text;

    d3.csv("data/Swedish_Election_" + strUser +".csv", function (data)
    {
        d3.selectAll("svg").remove();
        
         bc = new barchart(data);
         map1 = new map(data);
         plot1 = new plot();
    });
}

