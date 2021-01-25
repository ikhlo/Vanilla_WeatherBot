"use strict";

const axios = require("axios");
const apikey = "YOUR_APIKEY";

const getWeather = location => {
    return new Promise(async(resolve, reject) => {
        try{
            const weatherConditions = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);
            resolve(weatherConditions.data);
        }
        catch(error){
            console.log("Sorry we have an issue with your city");
            reject(error);
        }
    });
}

module.exports = getWeather;