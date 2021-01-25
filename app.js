'use strict';

const { info } = require('console');
const Readline = require('readline');
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const matcher = require('./matcher');
const weather = require('./weather');
const forecast_weather = require('./forecast')
var colors = require('colors');

rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
    matcher(reply, cb => {
        if (cb.intent == "Hello") {
            console.log(`${cb.entities.greeting} ! I am`,`VanillaBot`.yellow + `, nice to meet you :)`);
            console.log("What can I do for you ?");
            rl.prompt();
        }

        if (cb.intent == "Exit") {
            console.log("See you soon,","buddy".grey,"! ;) ");
            process.exit();
        }

        if (cb.intent == "Current Weather") {
            const infos = weather(cb.entities.city);
            console.log(`\nHere are some informations about`,`${cb.entities.city}`.cyan,`: \n`)
            infos.then(result => {
                var mainState = result.weather[0].main;
                var description = result.weather[0].description;
                var temperature = Math.round((result.main.temp) - 273.15);
                var humidity = result.main.humidity;
                var windSpeed = result.wind.speed;
                console.log(`The weather is`,`${mainState}`.green,`with`,`${description}`.green + `.`);
                console.log(`The temperature is about`,`${temperature}°`.red,`Celsius.`);
                console.log(`The humidity is about`,`${humidity}%`.blue + `.`);
                console.log(`The speed of the wind is about`,`${windSpeed}m/s.`.magenta);
                console.log();
                console.log("What else can I do for you ?");
                rl.prompt();
            });
        }

        if (cb.intent == "Human Weather") {
            const infos = weather(cb.entities.city);
            infos.then(result => {
                var temperature = Math.round((result.main.temp) - 273.15);
                var country = result.sys.country;

                if(temperature <= 0) {
                    console.log(`Wow, it's actually freezing in`,`${cb.entities.city}`.cyan + `,`,`${country}`.blue + ` ! With only `,`${temperature}°`.red,`Celsius...`);
                    console.log();
                    console.log("What else can I do for you ?");
                }
                if(temperature > 0 && temperature <= 10) {
                    console.log(`Well, it's very cold in`,`${cb.entities.city}`.cyan + `,`,`${country}`.blue + `. The temperature is about`,`${temperature}°`.red,`Celsius.`);
                    console.log();
                    console.log("What else can I do for you ?");
                }
                if(temperature > 10 && temperature <= 15) {
                    console.log(`Now, it's a bit cold in`,`${cb.entities.city}`.cyan + `,`,`${country}`.blue + `. It's about`,`${temperature}°`.red,`Celsius.`);
                    console.log();
                    console.log("What else can I do for you ?");
                }
                if(temperature > 15 && temperature <= 20) {
                    console.log(`Well, it's quite good in`,`${cb.entities.city}`.cyan + `,`,`${country}`.blue + `. The temperature is about`,`${temperature}°`.red,`Celsius.`);
                    console.log();
                    console.log("What else can I do for you ?");
                }
                if(temperature > 20 && temperature <= 30) {
                    console.log(`Good news, the weather is warm in`,`${cb.entities.city}`.cyan + `,`,`${country}`.blue + ` ! The temperature is about`,`${temperature}°`.red,`Celsius.`);
                    console.log();
                    console.log("What else can I do for you ?");
                }
                if(temperature > 30) {
                    console.log(`OMG, it's actually so hot in`,`${cb.entities.city}`.cyan + `,`,`${country}`.blue + ` ! The temperature is above`,`${temperature}°`.red,`Celsius !!`);
                    console.log();
                    console.log("What else can I do for you ?");
                }
                rl.prompt();
            });
        }

        if (cb.intent == "Yes or no Weather") {
            const infos = forecast_weather(cb.entities.city);
            infos.then(result => {
                if (cb.entities.time == "today") {
                    var mainState = result.list[0].weather[0].main;
                    var temperature = Math.round((result.list[0].main.temp) - 273.15);
                    if (cb.entities.condition == 'cloudy' && mainState == 'Clouds') {
                        console.log(`Yes, it's a bit`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else if (cb.entities.condition == 'sunny' && mainState == 'Clear') {
                        console.log(`Oh yes! it's actually`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else if (cb.entities.condition == 'rainy' && mainState == 'Rain') {
                        console.log(`I'm sorry but yes... it's`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else {
                        if (cb.entities.condition == 'hot' && temperature >= 20) {
                            console.log(`Yes it's actually`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow,`with a temperature of`,`${temperature}°`.red,`Celsius.`);
                        }
                        else if (cb.entities.condition == 'cold' && temperature < 20) {
                            console.log(`Yes... it's`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow,`with a temperature of`,`${temperature}°`.red,`Celsius.`);
                        }
                        else if ((cb.entities.condition == 'cold' && temperature >= 20) || (cb.entities.condition == 'hot' && temperature < 20)) {
                            console.log(`No, the temperature`,`${cb.entities.time}`.yellow + ` in`,`${cb.entities.city}`.cyan,`is about`,`${temperature}°`.red,`Celsius so it's not very`,`${cb.entities.condition}`.green,`!`)
                        }
                        else {
                            console.log(`No, the weather of`,`${cb.entities.time}`.yellow,`is`,`${mainState}`.magenta,`and not`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan)
                        }
                    } 
                    console.log();
                    console.log("What else can I do for you ?");
                }

                else if (cb.entities.time == "tomorrow") {
                    var mainState = result.list[7].weather[0].main;
                    var temperature = Math.round((result.list[7].main.temp) - 273.15);
                    if (cb.entities.condition == 'cloudy' && mainState == 'Clouds') {
                        console.log(`Yes, it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else if (cb.entities.condition == 'sunny' && mainState == 'Clear') {
                        console.log(`Oh yes! it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else if (cb.entities.condition == 'rainy' && mainState == 'Rain') {
                        console.log(`I'm sorry but yes... it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else {
                        if (cb.entities.condition == 'hot' && temperature >= 20) {
                            console.log(`Yes it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow,`with a temperature of`,`${temperature}°`.red,`Celsius.`);
                        }
                        else if (cb.entities.condition == 'cold' && temperature < 20) {
                            console.log(`Yes... it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow,`with a temperature of`,`${temperature}°`.red,`Celsius.`);
                        }
                        else if ((cb.entities.condition == 'cold' && temperature >= 20) || (cb.entities.condition == 'hot' && temperature < 20)) {
                            console.log(`No, the temperature`,`${cb.entities.time}`.yellow + ` in`,`${cb.entities.city}`.cyan,`will be about`,`${temperature}°`.red,`Celsius so it will not be very`,`${cb.entities.condition}`.green,`!`)
                        }
                        else {
                            console.log(`No, the weather of`,`${cb.entities.time}`.yellow,`will be`,`${mainState}`.magenta,`and not`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan)
                        }
                    } 
                    console.log();
                    console.log("What else can I do for you ?");
                }
                else if (cb.entities.time == "the day after tomorrow") {
                    var mainState = result.list[15].weather[0].main;
                    var temperature = Math.round((result.list[15].main.temp) - 273.15);
                    if (cb.entities.condition == 'cloudy' && mainState == 'Clouds') {
                        console.log(`Yes, it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else if (cb.entities.condition == 'sunny' && mainState == 'Clear') {
                        console.log(`Oh yes! it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else if (cb.entities.condition == 'rainy' && mainState == 'Rain') {
                        console.log(`I'm sorry but yes... it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else {
                        if (cb.entities.condition == 'hot' && temperature >= 20) {
                            console.log(`Yes it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow,`with a temperature of`,`${temperature}°`.red,`Celsius.`);
                        }
                        else if (cb.entities.condition == 'cold' && temperature < 20) {
                            console.log(`Yes... it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow,`with a temperature of`,`${temperature}°`.red,`Celsius.`);
                        }
                        else if ((cb.entities.condition == 'cold' && temperature >= 20) || (cb.entities.condition == 'hot' && temperature < 20)) {
                            console.log(`No, the temperature`,`${cb.entities.time}`.yellow + ` in`,`${cb.entities.city}`.cyan,`will be about`,`${temperature}°`.red,`Celsius so it will not be very`,`${cb.entities.condition}`.green,`!`)
                        }
                        else {
                            console.log(`No, the weather of`,`${cb.entities.time}`.yellow,`will be`,`${mainState}`.magenta,`and not`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan)
                        }
                    } 
                    console.log();
                    console.log("What else can I do for you ?");
                }
                else if (cb.entities.time == "in two days") {
                    var mainState = result.list[15].weather[0].main;
                    var temperature = Math.round((result.list[15].main.temp) - 273.15);
                    if (cb.entities.condition == 'cloudy' && mainState == 'Clouds') {
                        console.log(`Yes, it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else if (cb.entities.condition == 'sunny' && mainState == 'Clear') {
                        console.log(`Oh yes! it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else if (cb.entities.condition == 'rainy' && mainState == 'Rain') {
                        console.log(`I'm sorry but yes... it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow);
                    }
                    else {
                        if (cb.entities.condition == 'hot' && temperature >= 20) {
                            console.log(`Yes it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow,`with a temperature of`,`${temperature}°`.red,`Celsius.`);
                        }
                        else if (cb.entities.condition == 'cold' && temperature < 20) {
                            console.log(`Yes... it will be`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan,`${cb.entities.time}`.yellow,`with a temperature of`,`${temperature}°`.red,`Celsius.`);
                        }
                        else if ((cb.entities.condition == 'cold' && temperature >= 20) || (cb.entities.condition == 'hot' && temperature < 20)) {
                            console.log(`No, the temperature`,`${cb.entities.time}`.yellow + ` in`,`${cb.entities.city}`.cyan,`will be about`,`${temperature}°`.red,`Celsius so it will not be very`,`${cb.entities.condition}`.green,`!`)
                        }
                        else {
                            console.log(`No, the weather of`,`${cb.entities.time}`.yellow,`will be`,`${mainState}`.magenta,`and not`,`${cb.entities.condition}`.green + ` in`,`${cb.entities.city}`.cyan)
                        }
                    } 
                    console.log();
                    console.log("What else can I do for you ?");
                }

                else {
                    console.log("Sorry we don't have enough informations for the date's weather you asked.");
                    console.log();
                    console.log("What else can I do for you ?");
                }
                rl.prompt();
            });
        }

        if (cb.intent == undefined) {
            console.log("Hmm...","I'm not sure I understood".red + " what you meant :/ ");
            console.log("What can I do for you ?");
            rl.prompt();
        }
    });
});