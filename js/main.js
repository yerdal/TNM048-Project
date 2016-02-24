d3.csv("data/Swedish_Election_2014.csv", function (data)
{

     map1 = new map(data);

     //plot1 = new plot();

     bc = new barchart(data);

});

