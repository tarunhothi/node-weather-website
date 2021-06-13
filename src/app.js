const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));
const viewspath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewspath);
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Hothi Tarun",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Hothi Tarun",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        titleHelp: "This is some Helpful Text",
        name: "Hothi Tarun",
    });
});
app.get("", (req, res) => {
    res.send("Hello Express!");
});

app.get("/help", (req, res) => {
    res.send("Help Page");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Section</h1>");
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!",
        });
    }

    geoCode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            forecast(latitude, longitude, (error, forecastData) => {
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address,
                });
            });
        }
    );

    // res.send({
    //     forecast: "It is raining",
    //     location: "Philadelphia",
    //     address: req.query.address,
    // });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Hothi Tarun",
        errorMessage: "Help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Hothi Tarun",
        errorMessage: "Page not found",
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000!");
});