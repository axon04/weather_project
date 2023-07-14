const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));





app.get("/", function(req, res){
	
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
	const zip = req.body.zipCode;
	const country = req.body.countryCode;
	const url = "https://api.openweathermap.org/data/2.5/weather?zip=" +zip+ "," +country+ "&appid=eb6657795aa70079bd7ccf7501c99b7a&units=metric";
	https.get(url, function(response){
		response.on("data", function(data){
			const weatherData = JSON.parse(data);
			const icon = weatherData.weather[0].icon;
			const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
			res.write("<body style='background-color:#c6c6c6'>");
			res.write("<div align ='center'><img src ="+imageUrl+"></div>");
			res.write("<div align ='center'><h1>Temperature: " + weatherData.main.temp + "C</h1></div>");
			res.write("<div align ='center'><p>Current weather condition:<strong> " + weatherData.weather[0].description + "</strong><p></div>");
			res.write("</body>");
			res.send();
		});
	});		
});
		


app.listen(3000, function(req, res){
	console.log("server running on port 3000");
});