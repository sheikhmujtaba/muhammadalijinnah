var penguinPromise = d3.csv("jinnah.csv")
    penguinPromise.then(
        function(data)
        {
         console.log(data)
     setup(data)
           
},
        
        function(err)
        {
        console.log("fail", err)
        })   
var screen = {width:1200, height:500}
var margins = {top:30, bottom:50, left:30, right:50}
var setup = function(myarray)
{
    var svg = d3.select("#graph1")
    .attr("width", screen.width)
    .attr("height", screen.height);
    
    svg.append("g")
    .attr("class", "graph")
    .attr("transform", "translate("+margins.left+ "," +margins.top+")");
    
    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
        .domain([1870, 1950])
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([0, 5])
        .range([height, 0]);

    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    d3.select("#graph1")
        .append("g")
        .classed("axis", true);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
        .call(xAxis);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform","translate(30,"+margins.top+")");
    
    drawGMSL(myarray, xScale, yScale, cScale)
}

var drawGMSL = function(myarray, xScale, yScale, cScale, index){
   d3.select('#graph1')
    .attr("height",screen.height)
    .attr("width",screen.width)
    d3.select('g')
    .selectAll("circle")
    .data(myarray)
    .enter()
    .append("circle")
    .on("mouseover", function(d)
        {
        console.log(d.work)
            var label = "Year:" + d.Year + ", Event: " + d.work + ".";
            d3.select("#tooltip")
                .text(label)
                .style("left", (d3.event.pageX - 50) + "px")
                .style("top", (d3.event.pageY - 50) + "px")
                .classed("hidden", false);
            
        })
        .on("mouseout", function()
        {
            d3.select("#tooltip")
                .classed("hidden", true);
        })
    .attr("cx",function(d)
    {
        var years = parseFloat(d.Year)
        {return xScale(years)}
    })
    .attr("cy",function(d)
    {

        var num = parseFloat(d.ypoints)
        {return yScale(num)}
    })
    .attr("r",7)


}