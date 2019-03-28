// Pour Convertir un directory : vim "+set nomore" "+bufdo set fileencoding=utf8 | w" "+q" $(find . -type f)
function graph(StationID,DateDebut) {
	//DateDebut=convertDigitIn(DateDebut)
	//DateDebut=DateDebut.replace(/\//g, "");
	var path="data/data_climat/data_brute/"
	var CSVname=path+"Station_"+StationID+".csv";
	graphA(CSVname);
	graphB(CSVname);
}
function convertDigitIn(str){
   return str.split('/').reverse().join('/');
}

function graphA (CSVNAME) {
	d3.selectAll("svg > *").remove();
var svg = d3.select("#graphTimeline");
var record = d3.select("#info6");
record.selectAll("*").remove();

var margin= {top: 30, right: 20, bottom: 180, left: 40};
var margin2 = {top: 470, right: 30, bottom: 40, left: 40};
var width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
   height2 = +svg.attr("height") - margin2.top - margin2.bottom;
	height3=height-70;

var parseDate = d3.timeParse("%d/%m/%Y");

var x = d3.scaleTime().range([0, width]),
	x3 = d3.scaleBand().rangeRound([0, width]),
    x2 = d3.scaleTime().range([0, width]),
	
    y = d3.scaleLinear().range([height,0]),
	
    y2 = d3.scaleLinear().range([height2, 0]);
	y3 = d3.scaleLinear().range([height3, 170]);

var xAxis = d3.axisBottom(x),
	xAxis3 = d3.axisBottom(x3).tickFormat(d3.timeFormat("%Y")),
    xAxis2 = d3.axisBottom(x2).tickFormat(d3.timeFormat("%m/%Y")),
	
    yAxis = d3.axisLeft(y);
	yAxis3 = d3.axisLeft(y3);

var brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brushed);

var zoom = d3.zoom()
    .scaleExtent([1, 18])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

    var linemax = d3.line()
        .x(function (d) { return x(d.Date); })
        .y(function (d) { return y(d.Air_Temp); });
        
    var linemin = d3.line()
        .x(function (d) { return x(d.Date); })
        .y(function (d) { return y(d.Air_Temp2); });

    var lineZoom = d3.line()
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
        .attr("class", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("clip-path", "url(#clip)");	
	
    var main= svg.append("g")
        .attr("class", "main")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	var clip2 = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip2")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height3)
        .attr("x", 0)
        .attr("y", 0); 
		
    var Line_chart2 = svg.append("g")
        .attr("class", "graph2")
        .attr("transform", "translate(" + margin.left + ",220)")
        .attr("clip-path", "url(#clip2)");
		
	var main2= svg.append("g")
        .attr("class", "main2")
        .attr("transform", "translate(" + margin.left +" ,220)")

	var context = svg.append("g")
   		 .attr("class", "context")
    	.attr("transform", "translate(" + margin2.left + ",490)");

		
d3.text(CSVNAME).then(function(raw) {

	var dsv = d3.dsvFormat(';');
	var data = dsv.parse(raw);
	data.forEach(type);
	
	var maxPRECI= d3.entries(data).sort(function(a, b) { return d3.descending(a.value.Preci, b.value.Preci); })[0];
	var maxTEMP=d3.entries(data).sort(function(a, b) { return d3.descending(a.value.Air_Temp, b.value.Air_Temp); })[0];
	var minTEMP=d3.entries(data).sort(function(a, b) { return d3.ascending(a.value.Air_Temp2, b.value.Air_Temp2); })[0];
	
	
	var maxTEMP2=d3.entries(data).sort(function(a, b) { return d3.descending(a.value.Air_Temp, b.value.Air_Temp); })[0];
	
	
	record.append("p").text("Record pluie:").append("p")
			.text(maxPRECI.value.Preci+" mm (le "+maxPRECI.value["DATE_RELEVE"]+")")
			.style("font-size","16px")
			.style("color","steelblue")
			
	record.append("p").text("Temperature Max :").append("p")
			.text(maxTEMP.value.Air_Temp+"\u00B0c (le "+maxTEMP.value["DATE_RELEVE"]+")")
			.style("font-size","16px")
			.style("color","#FD856A")
			
	record.append("p").text("Temperature Min :").append("p")
			.html(minTEMP.value.Air_Temp2+"\u00B0c (le "+minTEMP.value["DATE_RELEVE"]+")")
			.style("font-size","16px")
			.style("color","#FDC75D")
	
  x.domain(d3.extent(data, function(d) { return d.Date; }));
  y.domain([-10,45 ]);  //d3.max(data, function (d) { return d.Air_Temp; })
  x2.domain(x.domain());
  x3.domain(d3.extent(data, function(d) { return d.Date; }));
  y2.domain([0,60]); 
  y3.domain([0,200]);


    main.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    main.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);
        
	main2.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height3 + ")")
        .call(xAxis3);
		
    Line_chart2.selectAll("bar")
    	.data(data).enter()
			.append("rect")
			.style("fill", function(d){return colorpluie(d.Preci);})
			.style("opacity",1)
			.attr("class","bar")
			.attr("height", function(d){return height3- y3(d.Preci);})//height3- y(2*Math.log(d.Preci));
			.attr("width",x3.bandwidth()-519)
			.attr("x", function(d){return x3(d.Date);})
			.attr("y", function(d) { return y3(d.Preci) })
			
	Line_chart .append("linearGradient")
      .attr("id", "temperature-gradientMAX")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", y(-10))
      .attr("x2", 0).attr("y2", y(45))
    .selectAll("stop")
		.data([
			{offset: "0%", color: "#fee5d9"},
			{offset: "18.2%", color: "#fee5d9"},
			{offset: "18.2%", color: "#fcae91"},
			{offset: "63.6%", color: "#fcae91"},
			{offset: "63.6%", color: "#fb6a4a"},
			{offset: "72.7%", color: "#fb6a4a"},
			{offset: "72.7%", color: "#de2d26"},
			{offset: "81.8%", color: "#de2d26"},
			{offset: "81.8%", color: "#8856a7"},
			{offset: "100%", color: "#8856a7"}

		 ])
		.enter().append("stop")
			.attr("offset", function(d) { return d.offset; })
			.attr("stop-color", function(d) { return d.color; });
			
	Line_chart .append("linearGradient")
      .attr("id", "temperature-gradientMIN")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", y(-10))
      .attr("x2", 0).attr("y2", y(45))
    .selectAll("stop")
		.data([
			{offset: "0%", color: "#eff3ff"},
			{offset: "18.2%", color: "#eff3ff"},
			{offset: "18.2%", color: "#bdd7e7"},
			{offset: "54.5%", color: "#bdd7e7"},
			{offset: "54.5%", color: "#6baed6"},
			{offset: "58.2%", color: "#6baed6"},
			{offset: "58.2%", color: "#de2d26"},
			{offset: "63.5%", color: "#de2d26"},
			{offset: "63.6%", color: "#8856a7"},
			{offset: "100%", color: "#8856a7"}

		 ])
		.enter().append("stop")
			.attr("offset", function(d) { return d.offset; })
			.attr("stop-color", function(d) { return d.color; });
	
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
			
			
	main2.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis3);
		
		
/////////CONTEXT BOITE DE ZOOM
    context.append("path")
        .datum(data)
			.attr("class", "linemax")
			.attr("d", lineZoom);
        
     context.selectAll("bar")
    	.data(data).enter()
		.append("rect")
			.style("fill","#c6dbef")
			.attr("height", function(d){return height2-y2(10*Math.log(d.Preci+1));})
			.attr("width","1")
			.attr("x", function(d){return x2(d.Date);})
			.attr("y", function(d) { return y2(10*Math.log(d.Preci+1)); })

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

	function colorpluie(value){
		var COLORE= "#eff3ff";
		if (value>5){ COLORE="#c6dbef";}
		if (value>10){ COLORE="#9ecae1";}
		if (value>30){ COLORE="#6baed6";}
		if (value>50){ COLORE="#3182bd";}
		if (value>100){ COLORE="#de2d26";}
		return COLORE;
	}
	function type(d) {
	  d.Date = parseDate(d["DATE_RELEVE"]);
	  d.Air_Temp2 = +d["TN"];
	   d.Air_Temp =+d["TX"];
	   d.Preci =+d["RR"];
	  return d;
	}

	function brushed() {
	  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
	  var s = d3.event.selection || x2.range();
	  x.domain(s.map(x2.invert, x2));
	  Line_chart.select(".linemax").attr("d", linemax);
	  Line_chart.select(".linemin").attr("d", linemin);
	  Line_chart2.selectAll(".bar").attr("x", d => x(d.Date)).attr("width", x3.bandwidth()-519);
	  main.select(".axis--x").call(xAxis);
	  main2.select(".axis--x").call(xAxis3);
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
	Line_chart2.selectAll(".bar").attr("x", d => x(d.Date)).attr("width", x3.bandwidth()-519);
	  main.select(".axis--x").call(xAxis);
	  main2.select(".axis--x").call(xAxis3);
	  context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
	}

}

function graphB (CSVNAME) {
	var margin = {top: 20, right: 20, bottom: 100, left: 50},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

		
	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	var lineMonth = d3.line()
        .x(function (d) { return x(parseMonth(d.key)); })
        .y(function (d) { return y(d.value); });
	
	var lineYear = d3.line()
        .x(function (d) { return x(parseYear(d.key)); })
        .y(function (d) { return y(d.value.Moy); });

	var svg =d3.select("#graphMoyenne").append("g");
		svg.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	d3.text(CSVNAME).then(function(raw) {
		var dsv = d3.dsvFormat(';');
		var data = dsv.parse(raw);
		data.forEach(type);
				
		var dataYear = d3.nest()
		.key(function(d) { var datee=d["DATE_RELEVE"].split("/"); return datee[2]; })
		.rollup(function(v) { return {Moy: d3.mean(v, function(d) { return d.Air_TempM; }) }  })
		.entries(data);

		
		var dataMonth = d3.nest()
		.key(function(d) { var datee=d["DATE_RELEVE"].split("/") ;return datee[2]+"-"+datee[1] ; })
		.rollup(function(v) { return d3.mean(v, function(d) {return d.Air_TempM;}); })
		.entries(data);

	 x.domain(d3.extent(dataMonth, function(d) { return parseMonth(d.key); }));
	y.domain([0, 25]);

  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
              .tickFormat(d3.timeFormat("%Y-%m")))
      .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

	svg.append("path")
        .datum(dataYear)
			.attr("class", "lineYear")
			.attr("d", lineYear)
			.style("opacity",1);
	
	svg.append("path")
        .datum(dataMonth)
			.attr("class", "lineMonth")
			.attr("d", lineMonth)
			.style("opacity",1);
	});
	
	var parseMonth = d3.timeParse("%Y-%m");
	var parseYear = d3.timeParse("%Y");
	var parseDate = d3.timeParse("%d/%m/%Y");
	
	function type(d) {
	  d.Date = parseDate(d["DATE_RELEVE"]);
	  d.Air_Temp2 = +d["TN"];
	   d.Air_Temp =+d["TX"];
	   d.Air_TempM =+d["TM"];
	   d.Preci =+d["RR"];
	  return d;
	}
}

function opacityMoy(value){
	if (value=="Annee"){
		if ( document.getElementById("Bannee").className=="btn  btn-md active"){
			document.getElementById("Bannee").className="btn btn-primary btn-md";
			document.getElementsByClassName("lineYear")[0].style.opacity=1;
			}
		else{
			document.getElementById("Bannee").className="btn  btn-md active";
			document.getElementsByClassName("lineYear")[0].style.opacity=0;
		}	
	}
	if (value=="Mois"){
		if ( document.getElementById("Bmois").className=="btn  btn-md active"){
			document.getElementById("Bmois").className="btn btn-success btn-md";
			document.getElementsByClassName("lineMonth")[0].style.opacity=1;
			}
		else{
		document.getElementById("Bmois").className="btn  btn-md active";
		document.getElementsByClassName("lineMonth")[0].style.opacity=0;
		}
	}

	
}