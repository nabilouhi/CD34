function migration(){

var info = '<div class="container"><h3>Territoire</h3> '+

		'<ul class="nav nav-pills">'+
			'<li class="active"><a data-toggle="pill" href="#menu1">Migration Pendulaire</a></li>'+
			'<li><a data-toggle="pill" href="#menu2">Menu2</a></li>'+
		'</ul>' +
		
		 '<div class="tab-content">'+
		 
			'<div id="menu1" class="tab-pane fade in active">'+
				'<p>Station meteologique</p>'+
				'</div>'+
				
			'<div id="menu2" class="tab-pane fade ">'+
				'<p>Station meteologique2222</p>'+
				'</div>'+
		' </div>';
document.getElementById("INFO").innerHTML=info;
}