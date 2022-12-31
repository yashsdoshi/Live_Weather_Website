//jshint esversion:6
const express = require('express');
const app = express();
const port = 3000;
const bodyparser = require('body-parser');
const https = require('https');

app.use(bodyparser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){
    const location = req.body.city;
    const key = "c3b4b9e910be8b506ee8d93b76f09ad6"
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+key+"&units=metric", function(response){
    console.log(response.statusCode);
    response.on('data', (d) => {
    const weatherdata = JSON.parse(d)
    const temp = weatherdata.main.temp
    const weatherdescription = weatherdata.weather[0].description 
    const icon = weatherdata.weather[0].icon 
    const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<p>The weather is currently " + weatherdescription + "<p>");
    res.write("<h1>The temperature at "+location+" is " + temp + " degree celcious</h1>");
    res.write("<img src=" + imgurl + ">");
    res.send()
    });
    })
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})