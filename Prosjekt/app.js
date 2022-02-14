const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

app.post("/weather", function (req, res) {
  const weatherQuery = req.body.cityName;
  const weatherKey = "3a709e1761387a6a1e9fc503e5ec7188";
  const weatherUnit = "metric";

  const weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    weatherQuery +
    "&appid=" +
    weatherKey +
    "&units=" +
    weatherUnit;

  https.get(weatherURL, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherTemp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const weatherImageURL =
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      res.write(
        '<p class="weatherP">The weather is currently ' + weatherDescription + '<p>' +
        '<h1 class="weatherH1">The temperature in ' + weatherQuery + ' is ' + weatherTemp + ' degrees celsius</h1>' +
        '<div class="scene">' +
          '<div class="cube rotate-90-vertical-fwd">' +
            '<div class="cube__face cube__face--front"><h1 class="weatherH1">' + weatherTemp + '°</h1></div>' +
            '<div class="cube__face cube__face--back"><h1 class="weatherH1">' + weatherTemp + '°</h1></div>' +
            '<div class="cube__face cube__face--right"><img src=' + weatherImageURL + '></div>' +
            '<div class="cube__face cube__face--left"><img src=' + weatherImageURL + '></div>' +
            '<div class="cube__face cube__face--top"></div>' +
            '<div class="cube__face cube__face--bottom"></div>' +
          '</div>' +
        '</div>' +
        '<style>' +
          '@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");' +
          '.weatherP {margin-top: 6%; font-family: "Poppins", sans-serif; font-size: 1.5rem; color: white; text-align: center; text-shadow: 6px 6px 6px #ed5442;}' +
          '.weatherH1 {font-family: "Poppins", sans-serif; font-size: 2.2rem; color: white; text-align: center; text-shadow: 6px 6px 6px #ed5442;}' +
          'body {font-family: sans-serif; background-image: url("https://www.10wallpaper.com/wallpaper/2560x1600/1710/Sunset_Mountains_Calm_High_Quality_Wallpaper_2560x1600.jpg"); background-size: cover; height: 100%; overflow: hidden;}' +
          '.scene {width: 100px; height: 100px; margin-top: 50px; margin-left: auto; margin-right: auto; perspective: 300px; text-align: center;}' +
          '.cube {width: 100px; height: 100px; position: relative; transform-style: preserve-3d; transform: translateZ(-100px); transition: transform 4s;}' +
          '.cube.show-front  { transform: translateZ(-50px) rotateY(   0deg); }' +
          '.cube.show-right  { transform: translateZ(-50px) rotateY( -90deg); }' +
          '.cube.show-back   { transform: translateZ(-50px) rotateY(-180deg); }' +
          '.cube.show-left   { transform: translateZ(-50px) rotateY(  90deg); }' +
          '.cube.show-top    { transform: translateZ(-50px) rotateX( -90deg); }' +
          '.cube.show-bottom { transform: translateZ(-50px) rotateX(  90deg); }' +
          '.cube__face {position: absolute; width: 100px; height: 100px; border: 2px solid black; line-height: 3.4rem; font-size: 2.6rem; font-weight: bold; color: white; text-align: center;}' +
          '.cube__face--front  { background: #FFC5BF; }' +
          '.cube__face--right  { background: #FFC5BF; }' +
          '.cube__face--back   { background: #FFC5BF; }' +
          '.cube__face--left   { background: #FFC5BF; }' +
          '.cube__face--top    { background: #FFC5BF; }' +
          '.cube__face--bottom { background: #FFC5BF; }' +
          '.cube__face--front  { transform: rotateY(  0deg) translateZ(50px); }' +
          '.cube__face--right  { transform: rotateY( 90deg) translateZ(50px); }' +
          '.cube__face--back   { transform: rotateY(180deg) translateZ(50px); }' +
          '.cube__face--left   { transform: rotateY(-90deg) translateZ(50px); }' +
          '.cube__face--top    { transform: rotateX( 90deg) translateZ(50px); }' +
          '.cube__face--bottom { transform: rotateX(-90deg) translateZ(50px); }' +
          'label { margin-right: 10px; }' +
          '.rotate-90-vertical-fwd { -webkit-animation: rotate-90-vertical-fwd 4s linear infinite both; animation: rotate-90-vertical-fwd 4s linear infinite both;}' +
          '@-webkit-keyframes rotate-90-vertical-fwd { 0% { -webkit-transform: rotateY(0); transform: rotateY(0); } 100% { -webkit-transform: rotateY(360deg); transform: rotateY(360deg); } }' +
          '@keyframes rotate-90-vertical-fwd { 0% { -webkit-transform: rotateY(0); transform: rotateY(0); } 100% { -webkit-transform: rotateY(360deg); transform: rotateY(360deg); } }' +
        '</style>'
/*
        '<p class="weatherP">The weather is currently ' +
          weatherDescription +
          "</p>" +
          '<h1 class="weatherH1">The temperature in ' +
          weatherQuery +
          " is " +
          weatherTemp +
          " degrees celsius</h1>" +
          '<img class="weatherImg" src=' +
          weatherImageURL +
          ">" +
          '<div class="scene">' +
          '<div class="cube rotate-90-vertical-fwd">' +
          '<div class="cube__face cube__face--front"></div>' +
          '<div class="cube__face cube__face--back"></div>' +
          '<div class="cube__face cube__face--right"></div>' +
          '<div class="cube__face cube__face--left"></div>' +
          '<div class="cube__face cube__face--top"></div>' +
          '<div class="cube__face cube__face--bottom"></div>' +
          "</div>" +
          "</div>" +
          "<style>" +
          '@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");' +
          '.weatherP {font-family: "Poppins", sans-serif; font-size: 22px; color: white; text-align: center; text-shadow: 6px 6px 6px #ed5442;}' +
          '.weatherH1 {font-family: "Poppins", sans-serif; font-size: 32px; color: white; text-align: center; text-shadow: 6px 6px 6px #ed5442;}' +
          ".weatherImg {display: block; margin: auto; background-color: #FFC5BF; border-radius: 20px; box-shadow: 6px 6px 6px #ed5442;}" +
          "body {background-color: #FF968A;}" +
          ".scene {width: 200px; height: 200px; margin-top: 100px; margin-left: auto; margin-right: auto; perspective: 400px; text-align: center;}" +
          ".cube {width: 200px; height: 200px; position: relative; transform-style: preserve-3d; transform: translateZ(-100px); transition: transform 2s;}" +
          ".cube.show-front  { transform: translateZ(-100px) rotateY(   0deg); }" +
          ".cube.show-right  { transform: translateZ(-100px) rotateY( -90deg); }" +
          ".cube.show-back   { transform: translateZ(-100px) rotateY(-180deg); }" +
          ".cube.show-left   { transform: translateZ(-100px) rotateY(  90deg); }" +
          ".cube.show-top    { transform: translateZ(-100px) rotateX( -90deg); }" +
          ".cube.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }" +
          ".cube__face {position: absolute; width: 200px; height: 200px; border: 2px solid black; line-height: 200px; font-size: 40px; font-weight: bold; color: white; text-align: center;}" +
          ".cube__face--front  { background: hsla(  0, 100%, 50%, 0.7); }" +
          ".cube__face--right  { background: hsla( 60, 100%, 50%, 0.7); }" +
          ".cube__face--back   { background: hsla(120, 100%, 50%, 0.7); }" +
          ".cube__face--left   { background: hsla(180, 100%, 50%, 0.7); }" +
          ".cube__face--top    { background: hsla(240, 100%, 50%, 0.7); }" +
          ".cube__face--bottom { background: hsla(300, 100%, 50%, 0.7); }" +
          ".cube__face--front  { transform: rotateY(  0deg) translateZ(100px); }" +
          ".cube__face--right  { transform: rotateY( 90deg) translateZ(100px); }" +
          ".cube__face--back   { transform: rotateY(180deg) translateZ(100px); }" +
          ".cube__face--left   { transform: rotateY(-90deg) translateZ(100px); }" +
          ".cube__face--top    { transform: rotateX( 90deg) translateZ(100px); }" +
          ".cube__face--bottom { transform: rotateX(-90deg) translateZ(100px); }" +
          "label { margin-right: 10px; }" +
          ".rotate-90-vertical-fwd {-webkit-animation: rotate-90-vertical-fwd 2s linear infinite both; animation: rotate-90-vertical-fwd 2s linear infinite both;}" +
          "@-webkit-keyframes rotate-90-vertical-fwd {0% {-webkit-transform: rotateY(0); transform: rotateY(0);}100% {-webkit-transform: rotateY(360deg);transform: rotateY(360deg);}}" +
          "@keyframes rotate-90-vertical-fwd {0% {-webkit-transform: rotateY(0); transform: rotateY(0);}100% {-webkit-transform: rotateY(360deg); transform: rotateY(360deg);}}" +
          "</style>"
*/

      );

      res.send();
    });
  });
});

app.post("/fact", function (req, res) {
  const factLanguage = "en";
  const factURL =
    "https://uselessfacts.jsph.pl/random.json?language=" + factLanguage;

  https.get(factURL, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const factData = JSON.parse(data);
      const factText = factData.text;

      res.write(
        "<h1 class='title'>Here is the random fact!:</h1>" + "<br>" + factText
      );

      res.write("<br><br><br><button onclick='window.location.reload();'class='butn'>FactHub</button>");

      res.write(
        '<style> @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap"); \
           body {background-color: #FF968A; color: #fff; text-align: center; font-size: 32px; font-family: "Poppins", sans-serif;} \
           h1 {text-shadow: 2px 2px #ed5442;} \
          .title {background: #000;} \
          .butn{background: black; border-radius: 7px; padding: 10px 20px 10px 20px; color: #fff; text-shadow: 1px 1px #ed5442; } \
          </style>'
      );

      

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});



