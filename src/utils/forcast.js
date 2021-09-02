const request = require('request')
const chalk = require('chalk')

const forcast = (locationData, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2a13698a303e8797a55b3ddc6a216d82&query=${locationData?.latitude},${locationData?.longitude}&units=f`
    // console.log(typeof(request))
    request({ "url": url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the server!!")
        } else if (response?.body?.error?.info) {
            callback(response?.body?.error?.info)
        } else {
            // console.log(response.body.current)
            // console.log(response)
            // console.log(error)
            callback(undefined, `${response?.body?.current?.weather_descriptions}. It is currently ${response?.body?.current?.temperature} Fahrenheit out. It feels like ${response?.body?.current?.feelslike} Fahrenheit out. The humidity is ${response?.body?.current?.humidity}.`)
            console.log(response?.body?.current)
        }
    })
}

module.exports = forcast