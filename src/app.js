const express = require('express');
const path = require('path');
const hbs = require('hbs');
const requests = require('requests');
const port = 8000;

const app = express();

// ---- paths ---------
let static_path = path.join(__dirname, "../public");
let partials_path = path.join(__dirname, "../public/templates/partials")
let website_path = path.join(__dirname, "../public/templates/website")

// --- seting app --------
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", website_path);
hbs.registerPartials(partials_path);

// ---- Routing ----
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/data", (req, res) => {
    // there is a need of promise bcz 
    // the program send the response befor it receinves api 
    getParams(req.query.cityName)
        .then(params => {
            res.render("temp", params)
        })
        .catch(()=>{
            res.send("<h1>City not found</h1>")
        })
})
// --- listening on server --- 
app.listen(port, () => {
    console.log(`listening to port no ${port}...`);
})

function getParams(queryCity) {
    return new Promise((resolve,reject)=>{
        const apiKey = "e954ee0f933037a0bc30dbbf76a634a1";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}`;
        requests(apiUrl)
            .on('data', function (chunk) {
                let objData = JSON.parse(chunk);
                if (objData.cod==200) {
                    let params = getParamsFromObject(objData);
                    resolve(params);
                } else {
                    reject();
                }
            })
            .on('end', function (err) {
                if (err) { 
                    console.log('connection closed due to errors', err)};
            });
    })
}

function getParamsFromObject(obj) {
    let city = obj.name;
    let nation = obj.sys.country;
    let sky = obj.weather[0].main;
    let temperature = (obj.main.temp - 273.15).toFixed(2);
    let temperature_min = (obj.main["temp_min"] - 273.15).toFixed(2);
    let temperature_max = (obj.main["temp_max"] - 273.15).toFixed(2);
    let paramObj = {
        cityVal: city,
        nationVal: nation,
        tempVal: temperature,
        minVal: temperature_min,
        maxVal: temperature_max,
        skyConditions:sky
    }
    return paramObj;
}