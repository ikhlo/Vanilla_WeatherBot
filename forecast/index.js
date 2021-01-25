"use strict";

const axios = require("axios");
const apikey = "YOUR_APIKEY";

const getWeather3days = location => {
    return new Promise(async(resolve, reject) => {
        try{
            const weatherConditions3days = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apikey}`);
            resolve(weatherConditions3days.data);
        }
        catch(error){
            console.log("Sorry we have an issue with your request");
            reject(error);
        }
    });
}

module.exports = getWeather3days;