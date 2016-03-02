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
