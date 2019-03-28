let express = require('express')
let PNG = require('save-svg-as-png')
let app =express()
var router = express.Router();


app.set('view engine','ejs')
app.use(express.static('public'))
//app.use(PNG)



app.get('/Environnement',(request,response)=>{
	response.render('Environnement', {
		data:[
			{name:"ex1",titre:"Pas de Pauvereté"},
			{name:"ex2",titre:"Faim ZERO"},
			{name:"ex3",titre:"Bonne santé"},
			{name:"ex4",titre:"Education de qualité"},
			{name:"ex5",titre:"Egalité entre les sexes"},
			{name:"ex6",titre:"Eau propre et assainissemnts"},
			{name:"ex7",titre:"Energie propre et abordable"},
			{name:"ex8",titre:"Travail descent et croissance"},
			{name:"ex9",titre:"Industrie et inovation"},
			{name:"ex10",titre:"Ineaglités reduites"},
			{name:"ex11",titre:"Communautés durables"},
			{name:"ex12",titre:"Consommation responsable"},
			{name:"ex13",titre:"Lutte contre le chgmt climatique"},
			{name:"ex14",titre:"Vie aquatique"},
			{name:"ex15",titre:"Vie terrestre"},
			{name:"ex16",titre:"Paix et justice efficase"},
			{name:"ex17",titre:"Partenariats pour la real. des ODD"},
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

app.listen(8080)
