const weatherModel = require("../model/weather_stations");

/**
 * This function is use for create nbc
*/
async function create(weatherInfo) {
    const weather = new weatherModel(weatherInfo);
    const weatherData = await weather.save();
    return weatherData;
  }

module.exports = {
    create: create
}