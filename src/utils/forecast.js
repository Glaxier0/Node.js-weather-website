const request = require("postman-request")

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key={your_access_token}=' + longitude + ',' + latitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const currentData = body["current"]
            callback(undefined, currentData["weather_descriptions"][0] + ', Degree: ' + currentData["temperature"]
                + '°C Feels like: ' + currentData["feelslike"] + '°C Humidity: ' + currentData["humidity"] + '%')
        }
    })
}

module.exports = forecast
