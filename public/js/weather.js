var weather = require('weather-js');

// Options:
// search:     location name or zipcode
// degreeType: F or C

var zipCode = '60046'

weather.find({ search: zipCode, degreeType: 'F' }, function(err, result) {
    if (err) console.log(err);

    console.log(JSON.stringify(result, null, 2));
});