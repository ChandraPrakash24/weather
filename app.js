const express = require("express");
const https = require("https");
const parser = require("body-parser")

const app = express();

app.use(parser.urlencoded({extended: true}));




app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
    });

app.post("/", function(req,res){

  const cityName = req.body.cityname;
  const unit = "metric";
  const appID = "ce62b36e16c6432152d025390430ab46";
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + unit + "&appid=" + appID;
      https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
          const weatherData = JSON.parse(data);
          console.log(weatherData);
          const temp = weatherData.main.temp;
          console.log(temp);
          const description = weatherData.weather[0].description;
          console.log(description);
          const icon = weatherData.weather[0].icon;
          const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

          res.write("<h1>the weather in " + cityName + " temprature is : " + temp +  " Celsious.</h1>");
          res.write("<img src=" +imgURL+ ">");
          res.write("<h4>the weather in " + cityName + " is currently " + description + "</h4>");
          res.send();
      console.log(req.body.cityname);
    });

    // const object = {
    //   doors: 2,
    //   drawers: 2,
    //   colour: "red"
    // }
    // console.log(JSON.stringify(object));

  });




  // res.send("hellow");
});


app.listen(3000, function(){
  console.log("server started at port 3000");
});
