const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    console.log(req.body.cityname);
    const city = req.body.cityname;
    const myname = req.body.yourname;
    const apiKey = "d2eed6151cf7bc88d2fb54fb7aa01eb3"
    const units = "metric"
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&APPID=" + apiKey

    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].id
            const imageUrl = "https://openweathermap.org/img/wn" + icon + "@2x.png";
            res.write("<h1>Hii " + myname + " welcome to my weather</h1>")
            res.write("<p>the current weather in " + city + " is " + description + " </p>");
            res.write("<h3>the temp in " + city + " is " + temp + "</h3>");
            res.write("<img src = " + imageUrl + ">");
            res.send();
            console.log(response);
        });
    });
    console.log(res.statusCode);
})

app.listen(process.env.PORT || 3000, function () {
    console.log("the server is connected on port 3000!");
});