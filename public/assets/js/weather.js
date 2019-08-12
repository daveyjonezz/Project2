// var weather = require('weather-js');
// Options:
// search:     location name or zipcode
// degreeType: F or C

var zipCode = '60046'

$.get("/api/weather/" + zipCode).then(function(results) {

    console.log(results)

    console.log(results[0].current.skytext)

    $("#forcast").text(JSON.stringify(results))
})


// weather.find({ search: zipCode, degreeType: 'F' }, function(err, result) {
//     if (err) console.log(err);

//     console.log(JSON.stringify(result, null, 2));
// });