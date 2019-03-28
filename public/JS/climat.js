function climat(){

var info = '<div class="row" style="margin-left:10px;"><h3> Environnement</h3> '+

		'<ul class="nav nav-pills">'+
			'<li class="active"><a data-toggle="pill" href="#menu1">Climatologie</a></li>'+
			'<li><a data-toggle="pill" href="#menu2">Risques</a></li>'+
			'<li><a data-toggle="pill" href="#menu3">Objectifs de Dév. Durable</a></li>'+
		'</ul><br><br>' +
		
		 '<div class="tab-content">'+
		 
			'<div id="menu1" class="tab-pane fade in active">'+
				'<div class="row">'+
					'<div class="col-sm-3" style="height:420px;border:1px black solid;" >'+
						'<div id="myBTN" ><i class="glyphicon glyphicon-info-sign"></i></div>'+
						'<p id="info1" style="text-align:left;font-size:120%;" ></p>'+
						' <h4 id="info4" style="margin-left:5%;"></h4>'+
						' <h3 id="info5" style="margin-left:5%;"></h3>'+
						'<h3 id="info3" style="margin-left:5%;"></h3>'+
						'<p id="info2" style=" font-size:5vw;color:gray;"> Cliquez sur une station<br><i class="glyphicon glyphicon-arrow-right "></i></p>'+
						'<h3 id="info6" style="margin-left:5%;"></h3>'+
					'</div>'+
					'<div class="col-sm-9" >'+
						'<div id="divmap" style="height:420px;border:2px solid white;width:100%;"></div>'+
					'</div>'+
				'</div>'+
				'<br>'+
				
				'<div class="row">'+
					'<div class="col-sm-2" >'+
						'<button class="button" id="Bmax" onclick="opacity(1)">Max C°</button> '+
						'<button class="button" id="Bmin" onclick="opacity(2)">Min C°</button> '+
						'<button class="button" id="Bpluie" onclick="opacity(3)">Precipitation</button> '+
						'<br>'+
						'<div class="slidecontainer">'+
							'<p>Seuil  de séchresse:</p>'+
								'<input id="RSMax" type="range" min="0" max="101" value="50" step="10">'+
								'<br>'+
							'<p>Seuil  de précipitation:</p>'+
								'<input id="RSPluie" type="range" min="0" max="101" value="50" step="10">'+
						 '</div>'+
					'</div>'+
					'<div class="col-sm-10" >'+
						'<div  style="height:700px;text-align:center;color:lightgray;"><svg id="graphTimeline" height="500" width="1100"></svg></div>'+
					'</div>'+
				'</div>'+
				
			'</div>'+
			
				
			'<div id="menu2" class="tab-pane fade ">'+
				'<p>Carte innondation</p>'+
			'</div>'+
				
				'<div id="menu3" class="tab-pane fade ">'+
				
				'</div>'+
		' </div>';
	
document.getElementById("INFO").innerHTML=info;
RADAR();
meteo();
//d3.select("#graphTimeline").attr("width")

}

function meteo(){


var map = L.map('divmap'); 
		map.setView([43.58,3.358], 9);//localisation centré , zoom 
		
		L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
		{ attribution: ' © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors ',
			maxZoom: 10,
			minZoom: 8 }
		) .addTo(map);
				  
		var STS = L.layerGroup();
		var BSS = L.layerGroup();
		
		//CONTOUR Herault
	$.ajax({
		url: "data/data_climat/dataMAP.geojson", //Nom du fichier à charger.
		dataType: "json", //Type du fichier à charger. 
		success: function(zone){
			L.geoJson( zone,{
				style:function(feature){					return { color: "grey", 
							weight: 1.5,
							dashArray: '3',
							fillOpacity: 0
							};
				}
			}	
			).addTo(map);
		 }		});
		
		//Station
	$.ajax({
   		type: "GET",
    	url: "data/data_climat/station.csv",
    	dataType: "text",
    	success: function(csv){
    	
			
			var ICONA = L.icon({
			iconUrl: 'img/statioA.png', 
		 	iconSize: [20,25]	 	
		 	});
		 	var ICONM = L.icon({
			iconUrl: 'img/statioM.png', 
		 	iconSize: [20,25]	 	
		 	});
		 	var ICONAM = L.icon({
			iconUrl: 'img/statioAM.png', 
		 	iconSize: [20,25]	 	
		 	});
		 	
		 	L.geoCsv(csv,{
		 		fieldSeparator:',',
		 		firstLineTitles: true,
		 		latitudeTitle:"Lat",
		 		longitudeTitle:"Long",
		 		lineSeparator: '\n',
		 		deleteDobleQuotes:false,
		 		onEachFeature: function (feature, layer) {
		 		//console.log(feature);
		 			layer.bindPopup(
		 				 "Station # "+feature.properties["id_station"]+
		 				 "<br><strong>"+feature.properties["nom_station"] +"</strong>"+
		 				"<br>"+ feature.properties["zone_hydrographique"]
		 			);
		 			
		 			layer.on('click', function(e){
		 			var stationID=feature.properties["id_station"];
		 			var stationStart=feature.properties["debut_peri"];
		 			graph(stationID,stationStart);
		 			var info1= "<strong><sup>#</sup>"+
		 								feature.properties["id_station"]+"-"+
		 								feature.properties["nom_station"] +
		 								"</strong>"+
		 								" <p style='color:grey;'><i class='glyphicon glyphicon-map-marker'></i><small><i>"+
		 								feature.properties["zone_hydrographique"]+
		 								" </i><sub> ["+ feature.properties["insee"]+"]</sub></small>"+
		 								"</p><svg width='100%' height='5'><rect width='100%' height='5' style='fill:grey;' /></svg>";
		 			document.getElementById("info1").innerHTML =info1;
		 			
		 			var info2="<i class='glyphicon glyphicon-upload'></i>"+feature.properties["altitude"]+"m";
		 			document.getElementById("info2").innerHTML =info2;
		 			
		 			var info3="<i class='glyphicon glyphicon-ok'></i> "+feature.properties["validation"];
		 			document.getElementById("info3").innerHTML =info3;
		 			
		 			if (feature.properties["fin_peri"]=="") {var END= "<font color=MediumSeaGreen>Aujourd'hui</font>"	}
		 			else {var END= "<font color=red>"+feature.properties["fin_peri"]+"</font>"	}
		 			var info4="<i class='glyphicon glyphicon-calendar'></i> De: "+feature.properties["debut_peri"]+" au "+END;
		 			document.getElementById("info4").innerHTML =info4;
		 			
		 			if (feature.properties["type"]=="A") {var TYPE= '<img src="img/statioA.png" height="25px"> Automatique'}
		 			if(feature.properties["type"]=="M") {var TYPE= '<img src="img/statioM.png" height="25px"> Manuelle'}
		 			if (feature.properties["type"]=="B") {var TYPE= '<img src="img/statioAM.png" height="25px"> Automatique+Manuelle'}
		 			document.getElementById("info5").innerHTML =TYPE;
		 			
		 			
		 			} );
		 		},
		 		pointToLayer: function (feature, latlng) {
		 			if (feature.properties["type"]=="A") {
		 				return L.marker(latlng, {
		 					icon:ICONA
		 				});
		 			}
		 			if (feature.properties["type"]=="B") {
		 				return L.marker(latlng, {
		 					icon:ICONAM
		 				});
		 			}
		 			else {
		 				return L.marker(latlng, {
		 					icon:ICONM
		 				});
		 			}	
				}
			}).addTo(map).addTo(STS);
			
			
		 		
		 		
		}
	});
	
	var baseMaps = {
				"Stations": STS,
				"Bassins": BSS,
			};
	L.control.layers(null,baseMaps).addTo(map);
		

	var modal = document.getElementById('myModal');
	var btn = document.getElementById("myBTN");
	var span = document.getElementsByClassName("close")[0];
		
	btn.onclick = function() { modal.style.display = "block";}
	span.onclick = function() {modal.style.display = "none";}
	window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none";}}
	
}

function opacity(ID){
	if (ID==1){
		if (document.getElementsByClassName("linemax")[0].style.opacity==0){
			document.getElementsByClassName("linemax")[0].style.opacity=1;
			document.getElementById("Bmax").style.backgroundColor="#FD856A";
			}
		else{
			document.getElementsByClassName("linemax")[0].style.opacity=0;
			document.getElementById("Bmax").style.backgroundColor="white";
		}
	}
	else if (ID==2){
		if (document.getElementsByClassName("linemin")[0].style.opacity==0){
			document.getElementsByClassName("linemin")[0].style.opacity=1;
			document.getElementById("Bmin").style.backgroundColor="#FDC75D";
			}
		else{
			document.getElementsByClassName("linemin")[0].style.opacity=0;
			document.getElementById("Bmin").style.backgroundColor="white";
			}
	}
else if (ID==3){
		if (document.getElementsByClassName("bar")[0].style.opacity==0){
			var cols = document.getElementsByClassName("bar");
			for(i=0; i<cols.length; i++) { cols[i].style.opacity=1;};
			document.getElementById("Bpluie").style.backgroundColor="steelblue";
			}
		else{
			var cols = document.getElementsByClassName("bar");
			for(i=0; i<cols.length; i++) { cols[i].style.opacity=0;}
			document.getElementById("Bpluie").style.backgroundColor="white";
		 }
	}
}
