const request = require("postman-request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token={your_access_token_here}&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message === 'Not Found' || !body.features.length) {
            callback('Unable to find location.', undefined)
        } else {
            const data = body
            const placeCoordinate = data.features[0]["center"]
            callback(undefined, {
                latitude: placeCoordinate[0],
                longitude: placeCoordinate[1],
                location: data.features[0]["place_name"]
            })
        }
    })
}

module.exports = geocode
