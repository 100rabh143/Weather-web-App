const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2d2a3b810f608a431bcc06a6570acfc1&query=' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(' Unable to connect to weather service ', undefined)
        }
        else if (response.body.error) {
            callback(' Unable to find location. ', undefined)
        }
        else {
            const realTemp = response.body.current.temperature
            const feelslike = response.body.current.feelslike
            callback(undefined, {
                temp: response.body.current.weather_descriptions[0] + '. It is currently ' + realTemp + ' degrees and it feels like ' + feelslike + ' degrees.',
                lastUpdated: 'Last Updated at : ' + response.body.current.observation_time
            })
        }
    })
}

module.exports = forecast