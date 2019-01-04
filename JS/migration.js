function migration(){

var info = '<div class="container"><h3>Territoire [En construction ...]</h3> '+

		'<ul class="nav nav-pills">'+
			'<li class="active"><a data-toggle="pill" href="#menu1">Migration Pendulaire</a></li>'+
			'<li><a data-toggle="pill" href="#menu2">Carte 2</a></li>'+
		'</ul>' +
		
		 '<div class="tab-content">'+
		 
			'<div id="menu1" class="tab-pane fade in active">'+
				'<p>[En construction ...]</p>'+
				'</div>'+
				
			'<div id="menu2" class="tab-pane fade ">'+
				'<p>[En construction ...]</p>'+
				'</div>'+
		' </div>';
document.getElementById("INFO").innerHTML=info;
}
