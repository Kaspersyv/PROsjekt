const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function (req, res) {

    const weatherQuery = req.body.cityName
    const weatherKey = "3a709e1761387a6a1e9fc503e5ec7188"
    const weatherUnit = "metric"

    const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherQuery + "&appid=" + weatherKey + "&units=" + weatherUnit;

    https.get(weatherURL, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const weatherTemp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon
            const weatherImageURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"


            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The temperature in " + weatherQuery + " is " + weatherTemp + " degrees celsius</h1>");
            res.write("<img src=" + weatherImageURL + ">");

            res.send()


        })
    })
})





app.listen(3000, function () {
    console.log("Server started on port 3000");
})