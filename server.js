let express = require('express')
let PNG = require('save-svg-as-png')
let app =express()
const fs = require('fs');
var router = express.Router();

const port=process.env.PORT || 8080


app.set('view engine','ejs')
app.use(express.static('public'))
//app.use(PNG)
infodata=[];
fs.readdir("radartxt", function(err, items) {
	for (var i=0; i<items.length; i++) {
		infodata[i]=fs.readFileSync('radartxt/'+items[i],'utf8');
		console.log(items[i]);
    }	
});


app.get('/Environnement',(request,response)=>{
	response.render('Environnement', {
		data:[
			{name:"ex1",titre:"Pas de pauvreté",TEXT:infodata[0]},
			{name:"ex2",titre:"Faim zéro",TEXT:infodata[1]},
			{name:"ex3",titre:"Bonne santé",TEXT:infodata[2]},
			{name:"ex4",titre:"Education de qualité",TEXT:infodata[3]},
			{name:"ex5",titre:"Egalité entre les sexes",TEXT:infodata[4]},
			{name:"ex6",titre:"Eau propre et assainissement",TEXT:infodata[5]},
			{name:"ex7",titre:"Energie propre et abordable",TEXT:infodata[6]},
			{name:"ex8",titre:"Travail décent et croissance",TEXT:infodata[7]},
			{name:"ex9",titre:"Industrie et innovation",TEXT:infodata[8]},
			{name:"ex10",titre:"Inégalités réduites",TEXT:infodata[9]},
			{name:"ex11",titre:"Communautés durables",TEXT:infodata[10]},
			{name:"ex12",titre:"Consommation responsable",TEXT:infodata[11]},
			{name:"ex13",titre:"Lutte contre le chgt climatique",TEXT:infodata[12]},
			{name:"ex14",titre:"Vie aquatique",TEXT:infodata[13]},
			{name:"ex15",titre:"Vie terrestre",TEXT:infodata[14]},
			{name:"ex16",titre:"Paix et justice efficace",TEXT:infodata[15]},
			{name:"ex17",titre:"Partenariats pour les objectifs",TEXT:infodata[16]}
		]}
	)
})
app.get('/Demographie',(request,response)=>{
	response.render('Demographie')
})
app.get('/Territoire',(request,response)=>{
	response.render('Territoire')
})
app.get('/Insertion',(request,response)=>{
	response.render('Insertion')
})

app.get('/',(request,response)=>{
	response.render('index')
})

app.listen(port)
console.log('And the magic happens on port ' + port)