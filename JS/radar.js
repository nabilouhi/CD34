function RADAR(){
//document.getElementById("d3V").src="https://d3js.org/d3.v3.min.js";
var HTML=`<div class="jumbotron text-center">
    <h1>Radar</h1>      
    <p> Evaluez le niveau de contribution de votre action à chaque ODD (1=Faible contribution  4=Contribution significative)</p>
  </div>
<div class="container-fluid">
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
	<th>Description</th>
        <th class="text-center">note</th>
      </tr>
    </thead>
    <tbody>
 <tr>
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-01.png" height=70px></td>
		<td>Pas de pauvreté</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex1',this.value)" >	
		</td>
      </tr>
	        <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-02.png" height=70px></td>
		<td> Faim "zéro"</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex2',this.value)" >
		</td>
      </tr>
	  <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-03.png" height=70px></td>
		<td>Bonne santé </td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex3',this.value)" >
		</td>
      </tr>
	        <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-04.png" height=70px></td>
		<td>Education</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex4',this.value)" >
		</td>
      </tr>
	  <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-05.png" height=70px></td>
		<td>Egalité des sexes</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex5',this.value)" >
		</td>
      </tr>
	        <tr>
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-06.png" height=70px></td>
		<td>Eau propre</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex6',this.value)" >
		</td>
      </tr>
	        <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-07.png" height=70px></td>
		<td>Energie propre</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex7',this.value)" >
		</td>
      </tr>
			<tr>
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-08.png" height=70px></td>
		<td>Travail décent & croissance</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex8',this.value)" >
		</td>
      </tr>
		<tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-09.png" height=70px></td>
		<td>Industrie Innovation</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex9',this.value)" >
		</td>
      </tr>
	        <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-10.png" height=70px></td>
		<td>Inégalités réduites</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex10',this.value)" >
		</td>
      </tr>
	        <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-11.png" height=70px></td>
		<td>Villes durables</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex11',this.value)" >
		</td>
      </tr>
	        <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-12.png" height=70px></td>
		<td>Consommation responsable</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex12',this.value)" >
		</td>
      </tr>
	  <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-13.png" height=70px></td>
		<td>Changement climatique</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex13',this.value)" >
		</td>
      </tr>
	        <tr>
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-14.png" height=70px></td>
		<td>Vie aquatique</td>
        <td> 
			<input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex14',this.value)" >
		</td>
      </tr>
	        <tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-15.png" height=70px></td>
		<td>Vie terrestre</td>
        <td> <input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex15',this.value)" ></td>
</tr>
<tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-16.png" height=70px></td>
		<td>Paix et justice</td>
        <td> <input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex16',this.value)" ></td> 
</tr>
<tr >
        <td ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-17.png" height=70px></td>
		<td>Partenariat</td>
        <td> <input  type="range" min=1 max=4 step=1 value=1 class="slider" id="'ex1'" oninput="Change('ex17',this.value)" ></td> 
</tr>

  
     
    </tbody>
  </table>
</div>
<br>
<div id="CONTENU" >
<div class="row" >
  <div class="col-sm-3" >
  
  <div class="row"style="padding-left:30px;"><input type="text" class="form-control" value="Titre" style="padding-left:20px"><br><br></div>
		<div class="row">
<div class="col-sm-4"><img src="RADAR/img/F_SDG goals_icons-individual-rgb-01.png" height=65px></div>
<div class="col-sm-4" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-02.png" height=65px></div>
<div class="col-sm-4"><img src="RADAR/img/F_SDG goals_icons-individual-rgb-03.png" height=65px></div>
		</div>
		<div class="row">
<div class="col-sm-4" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-04.png" height=65px></div>
<div class="col-sm-4"><img src="RADAR/img/F_SDG goals_icons-individual-rgb-05.png" height=65px></div>
<div class="col-sm-4" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-06.png" height=65px></div>
		</div>
		<div class="row">
  <div class="col-sm-4"><img src="RADAR/img/F_SDG goals_icons-individual-rgb-07.png" height=65px></div>
  <div class="col-sm-4" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-08.png" height=65px></div>			
  <div class="col-sm-4"><img src="RADAR/img/F_SDG goals_icons-individual-rgb-09.png" height=65px></div>
  		</div>
		<div class="row">
  <div class="col-sm-4" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-10.png" height=65px></div>
  <div class="col-sm-4"><img src="RADAR/img/F_SDG goals_icons-individual-rgb-11.png" height=65px></div>
  <div class="col-sm-4" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-12.png" height=65px></div>
		</div>
		<div class="row">
  <div class="col-sm-4"><img src="RADAR/img/F_SDG goals_icons-individual-rgb-13.png" height=65px></div>
  <div class="col-sm-4" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-14.png" height=65px></div>
  <div class="col-sm-4"><img src="RADAR/img/F_SDG goals_icons-individual-rgb-15.png" height=65px></div>
  		</div>
		<div class="row">
  <div class="col-sm-6" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-16.png" height=65px></div>
  <div class="col-sm-6" ><img src="RADAR/img/F_SDG goals_icons-individual-rgb-17.png" height=65px></div>
		</div>
<br><br>
 <div class="row"style="padding-left:30px;"><textarea class="form-control" rows="5" id="comment"> Commentaire:</textarea></div>
	  
  </div>

  <div class="col-sm-9" ><zz></zz></div>
  
</div>
</div>

<div class="text-center" ><button type="button" class="btn" onclick="PDF()">Export PDF</button></div>
<div class="text-center" ><button type="button" class="btn" onclick="PDF2()">Export JPEG</button></div>	
<br><br>

<p class="text-center"><a href="https://www.un.org/sustainabledevelopment/fr/">OBJECTIFS de Developpement Durable</a></p> `;

document.getElementById("menu3").innerHTML=HTML;

}
var data=[{name:"ex1",value:1,color:"#e5243b"},
{name:"ex2",value:1,color:"#DDA63A"},
{name:"ex3",value:1,color:"#4C9F38"},
{name:"ex4",value:1,color:"#C5192D"},
{name:"ex5",value:1,color:"#FF3A21"},
{name:"ex6",value:1,color:"#26BDE2"},
{name:"ex7",value:1,color:"#FCC30B"},
{name:"ex8",value:1,color:"#A21942"},
{name:"ex9",value:1,color:"#FD6925"},
{name:"ex10",value:1,color:"#DD1367"},
{name:"ex11",value:1,color:"#FD9D24"},
{name:"ex12",value:1,color:"#BF8B2E"},
{name:"ex13",value:1,color:"#3F7E44"},
{name:"ex14",value:1,color:"#0A97D9"},
{name:"ex15",value:1,color:"#56C02B"},
{name:"ex16",value:1,color:"#00689D"},
{name:"ex17",value:1,color:"#19486A"}];


function Change(ID,valeur){	
	 document.getElementsByTagName("zz")[0].innerHTML="";
	for (i=0;i<17;i++){
		if(data[i].name==ID){data[i].value=Number(valeur)};	
	}
	console.log(data);

var width = 960,
    height = 500,
    barHeight = height / 2 - 40;

var formatNumber = d3.format("s");


var svg = d3.select('zz').append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width/3 + "," + height/2+ ")");


 // data.sort(function(a,b) { return b.value - a.value; });

  var extent = d3.extent([0,4]);
  var barScale = d3.scaleLinear()
      .domain(extent)
      .range([0, barHeight]);

  var keys = data.map(function(d,i) { return d.name; });
  var numBars = keys.length;

  var x = d3.scaleLinear()
      .domain(extent)
      .range([0, -barHeight]);

  var xAxis = d3.axisLeft(x)
      .ticks(0)
      .tickFormat(formatNumber);
      
  var circles = svg.selectAll("circle")
          .data(x.ticks(3))
        .enter().append("circle")
          .attr("r", function(d) {return barScale(d);})
          .style("fill", "none")
          .style("stroke", "black")
          .style("stroke-dasharray", "2,2")
          .style("stroke-width",".5px");

  var arc = d3.arc()
      .startAngle(function(d,i) { return (i * 2 * Math.PI) / numBars; })
      .endAngle(function(d,i) { return ((i + 1) * 2 * Math.PI) / numBars; })
      .innerRadius(0);
  
  var segments = svg.selectAll("path")
          .data(data)
        .enter().append("path")
          .each(function(d) { d.outerRadius = 0; })
          .style("fill", function (d) { return d.color; })
          .attr("d", arc);

  segments.transition().ease(d3.easeElastic).duration(800).delay(function(d,i) {return (25-i)*10;})
          .attrTween("d", function(d,index) {
            var i = d3.interpolate(d.outerRadius, barScale(+d.value));
            return function(t) { d.outerRadius = i(t); return arc(d,index); };
          });

  svg.append("circle")
      .attr("r", barHeight)
      .classed("outer", true)
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width","1.5px");

  var lines = svg.selectAll("line")
      .data(keys)
    .enter().append("line")
      .attr("y2", -barHeight - 20)
      .style("stroke", "white")
      .style("stroke-width",".5px")
      .attr("transform", function(d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

  svg.append("g")
    .attr("class", "x axis");
    //.call(xAxis);

  // Labels
  var labelRadius = barHeight * 1.025;

  var labels = svg.append("g")
      .classed("labels", true);

  labels.append("def")
        .append("path")
        .attr("id", "label-path")
        .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");

  labels.selectAll("text")
        .data(keys)
      .enter().append("text")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .style("fill", function(d, i) {return "#3e3e3e";})
        .append("textPath")
        .attr("xlink:href", "#label-path")
        .attr("startOffset", function(d, i) {return i * 100 / numBars + 50 / numBars + '%';})
        .text(function(d,i) {return i+1 });
		
		}
		
function PDF(){
	var Titre=document.getElementById("titre").value;
	var Comment=document.getElementById("comment").value;
	if (Titre=="Titre"){console.log("yes");document.getElementById("titre").value="";};
	if (Comment=="Commentaire:"){console.log("yes");document.getElementById("comment").value="";};
	
	html2canvas(document.getElementById("CONTENU")).then(function (canvas){
			var img= canvas.toDataURL("image/jpeg",1.0);
			
			var doc = new jsPDF("l", "mm", "a4");
			var width = doc.internal.pageSize.getWidth();
			var height = doc.internal.pageSize.getHeight()-40;
			doc.addImage(img, 'JPEG', 0, 20, width, height,'FAST');
			//console.log("here");
			doc.save('Radar.pdf');
		
	document.getElementById("titre").value="Titre";
	document.getElementById("comment").value="Commentaire:";	
	});
}	
function PDF2(){
	alert("[En construction...]");
//var ProjectName="Projet";
//doc.text(ProjectName, 10, 10)
}		

