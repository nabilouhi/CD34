// Pour Convertir un directory : vim "+set nomore" "+bufdo set fileencoding=utf8 | w" "+q" $(find . -type f)

//var margin = {top: 20, right: 20, bottom: 110, left: 40}
//var margin2 = {top: 430, right: 20, bottom: 30, left: 40}
//var h = 500 - margin.top - margin.bottom;
//var h2 = 500 - margin2.top - margin2.bottom;


    
function graph(StationID,DateDebut) {
	DateDebut=convertDigitIn(DateDebut)
	DateDebut=DateDebut.replace(/\//g, "");
	var path="data/data_climat/data_brute/"
	var CSVname=path+"Station_"+StationID+"_"+DateDebut+"_J.csv";
	
	graphA(CSVname);
	//graphB(CSVname);
}

function convertDigitIn(str){
   return str.split('/').reverse().join('/');
}

function graphA (CSVNAME) {
	d3.selectAll("svg > *").remove();
	//d3.select("#graphA").insert("svg").attr("width",1200).attr("height",500);

var svg = d3.select("#graphTimeline")
var margin= {top: 50, right: 20, bottom: 100, left: 40};
var margin2 = {top: 430, right: 30, bottom: 40, left: 30};
var width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
   height2 = +svg.attr("height") - margin2.top - margin2.bottom;


var parseDate = d3.timeParse("%d/%m/%Y");

var x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]);

var xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2).tickFormat(d3.timeFormat("%m/%Y")),
    yAxis = d3.axisLeft(y);

var brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brushed);

var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

    var linemax = d3.line()
        .x(function (d) { return x(d.Date); })
        .y(function (d) { return y(d.Air_Temp); });
        
    var linemin = d3.line()
        .x(function (d) { return x(d.Date); })
        .y(function (d) { return y(d.Air_Temp2); });

    var line2 = d3.line()
        .x(function (d) { return x2(d.Date); })
        .y(function (d) { return y2(d.Air_Temp); });

    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0); 


    var Line_chart = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("clip-path", "url(#clip)");


    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var context = svg.append("g")
   		 .attr("class", "context")
    	.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
    	
d3.text(CSVNAME).then(function(raw) {
	var dsv = d3.dsvFormat(';');
	var data = dsv.parse(raw);
	data.forEach(type);
	
	
	
  x.domain(d3.extent(data, function(d) { return d.Date; }));
  y.domain([0, d3.max(data, function (d) { return d.Air_Temp; })]);
  x2.domain(x.domain());
  y2.domain(y.domain());


    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);
        
        focus.selectAll("bar")
    	.data(data).enter()
  	   .append("rect")
  	   .style("fill", "steelblue")
	    .style("opacity",1)
		.attr("class","bar")
      .attr("height", function(d){return height- y(d.Preci) ;})
      .attr("width","1")
      .attr("x", function(d){return x(d.Date);})
      .attr("y", function(d) { return y(d.Preci); })

    Line_chart.append("path")
        .datum(data)
        .attr("class", "linemax")
        .attr("d", linemax)
		.style("opacity",1);
        
    Line_chart.append("path")
        .datum(data)
        .attr("class", "linemin")
        .attr("d", linemin)
		.style("opacity",1);
		
		
/////////CONTEXT BOITE DE ZOOM
    context.append("path")
        .datum(data)
        .attr("class", "linemax")
        .attr("d", line2);
        
     context.selectAll("bar")
    	.data(data).enter()
  	   .append("rect")
  	   .style("fill", "steelblue")
      .attr("height", function(d){return height2-y2(d.Preci);})
      .attr("width","1")
      .attr("x", function(d){return x2(d.Date);})
      .attr("y", function(d) { return y2(d.Preci)/10; })

  context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x.range());
  
  svg.append("rect")
      .attr("class", "zoom")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);

});

function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  var s = d3.event.selection || x2.range();
  x.domain(s.map(x2.invert, x2));
  Line_chart.select(".linemax").attr("d", linemax);
  Line_chart.select(".linemin").attr("d", linemin);
  focus.select(".axis--x").call(xAxis);
  svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
      .scale(width / (s[1] - s[0]))
      .translate(-s[0], 0));
}

function zoomed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
  var t = d3.event.transform;
  x.domain(t.rescaleX(x2).domain());
  Line_chart.select(".linemax").attr("d", linemax);
  Line_chart.select(".linemin").attr("d", linemin);
  focus.select(".axis--x").call(xAxis);
  context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
}

function type(d) {
  d.Date = parseDate(d["Date de la mesure"]);
  d.Air_Temp2 = +d["Température Minimale en °C"].replace(/,/,'.');
   d.Air_Temp =+d["Température Maximale en °C"].replace(/,/,'.');
   d.Preci =+d["Précipitations en mm"].replace(/,/,'.');
  return d;
}

}