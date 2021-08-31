const request = require('request')
const chalk = require('chalk')
/**Method to determine the coordinates of a location */

const geocode = (location, callback) => {
    const gecodeLocationurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibGl2aW5zdW5ueSIsImEiOiJja3NjZjgxdG4wZ2JvMm9wZjdyMHY5d2VwIn0.Rs6HWDhLfgMQOT0y_Lz2rA&limit=1`

    request({ url: gecodeLocationurl, json: true }, (error, response) => {
        if (error) {
           callback("Unable to connect to the server!!")
        } else if (!response?.body?.features?.length) {
            callback("Unable to find the location!!")
        } else {
            // console.log(`Coordinates of location: ${response?.body?.features[0]?.geometry?.coordinates}`)
            const latitude = response?.body?.features[0]?.center[1]
            const longitude = response?.body?.features[0]?.center[0]
            // console.log(`Latitude: ${latitude} \nLongitude: ${longitude}`)
            const location = response?.body?.features[0]?.place_name
            callback(undefined, {latitude, longitude, location})
        }
    })

}

module.exports = geocode