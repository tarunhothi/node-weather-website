const axios = require("axios");
const geoCode = (address, callback) => {
    axios
        .get(
            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            address +
            ".json?access_token=pk.eyJ1IjoidGFydW42ODMiLCJhIjoiY2twbzIzZG03MDg1czJvbndjODljb2FlciJ9.OY8DJgNa3SyjOvFNSnhxnw&limit=1"
        )
        .then((response) => {
            if (response.data.features.length === 0) {
                callback("Unable to find Location", undefined);
            } else {
                callback(undefined, {
                    latitude: response.data.features[0].center[0],
                    longitude: response.data.features[0].center[1],
                    location: response.data.features[0].place_name,
                });
            }
        })
        .catch((error) => callback("Network is not Available", undefined));
};

module.exports = geoCode;