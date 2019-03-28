function pop(){
var info = '<div class="container"><h3>Démographie</h3> '+

		'<ul class="nav nav-pills">'+
			'<li class="active"><a data-toggle="pill" href="#menu1">Population</a></li>'+
			'<li><a data-toggle="pill" href="#menu2">Croissance</a></li>'+
		'</ul><br><br>' +
		
		 '<div class="tab-content">'+
		 
			'<div id="menu1" class="tab-pane fade in active">'+
			'<zz></zz>'+
				
				'</div>'+
				
			'<div id="menu2" class="tab-pane fade ">'+
			'<p>[En construction ...]</p>'+
				
				'</div>'+
		' </div>';
		
document.getElementById("INFO").innerHTML=info;
EGALITAIRE();
}

function EGALITAIRE(){
	var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
	
	var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

	var x = d3.scaleLinear()
          .range([0, width]);
		 
	var svg = d3.select("zz").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
	
	d3.csv("data/data_pop/pop-2015.csv").then(function(data) {
		//if (error) throw error;
		
		data.forEach(function(d) {
			d.homme = +d.homme,
			d.femme = +d.femme,
			Repartition = d.Repartition;
			});
		  console.log(data);
		x.domain([0, d3.max(data, function(d){ return d.homme/5; })])
		y.domain(data.map(function(d) { return d.Repartition; }));
		
		svg.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return width/2; })
			.attr("width", function(d) {return x(d.homme/10); } )
			.attr("y", function(d) { return y(d.Repartition); })
			.attr("height", y.bandwidth())
			.append("text")
      .attr("x", function(d) { return width/2; })
     .attr("y", function(d) { return y(d.Repartition); })
      .attr("dy", "0.5em")
      .attr("dx", "0.5em")
      .style("font" ,"10px sans-serif ")
	  .text(function(d){return d.homme});

			
	   svg.selectAll(".bar2")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar2")
			.attr("x", function(d) { return (width/2)-x(d.femme/10) })
			.attr("width", function(d) {return x(d.femme/10); } )
			.attr("y", function(d) { return y(d.Repartition); })
			.attr("height", y.bandwidth());
	   // svg.append("g")
			//.call(d3.axisBottom(x));

		svg.append("g")
			.call(d3.axisRight(y));
});

}