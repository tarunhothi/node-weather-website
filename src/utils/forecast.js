const axios = require("axios");

const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=97dae619ad361a7e4e102c06e97e7abb";

    axios
        .get(url)
        .then((response) => {
            if (response.data.weather[0].id === -8) {
                callback("Unable to find Location", undefined);
            } else {
                callback(
                    "error",
                    "it is currently " +
                    response.data.main.temp +
                    " degrees out and Weather is " +
                    response.data.weather[0].main +
                    "." +
                    "Speed of wind is " +
                    response.data.wind.speed +
                    " km/h"
                );
            }
        })
        .catch((err) => callback("Network Error", undefined));
};

module.exports = forecast;