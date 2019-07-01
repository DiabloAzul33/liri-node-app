var dotenv = require("dotenv").config();
var axios = require("axios");

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var fs = require("fs");

console.log(process.argv);

var command = process.argv[2];

var query = process.argv[3];

function concertThis(search) {
    // console.log("Concerting");
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                console.log("=============================")
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                console.log(response.data[i].venue.country);
                console.log(response.data[i].datetime);
                console.log("=============================")
            }
        });
}
function spotifyThisSong(search) {
    // console.log("Spotifying");
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].album.external_urls.spotify);
        console.log(data.tracks.items[0].album.name);

    });
}
function movieThis(search) {
    // console.log("Moving");
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + search).then(function (response) {
        // console.log(response.data);
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
    });
}
function doWhatItSays(search) {
    // console.log("Doing");
    fs.readFile("random.txt", "Read message!", function (err) {
        if (err) {
            console.log(err);
        }
        console.log("File read!");
    });
    fs.appendFile("log.txt", "Log message!\n", function (err) {
        if (err) {
            console.log(err);
        }
        console.log("File saved in log.txt!");
        console.log("=============================")
    });
    spotifyThisSong();
}


switch (command) {
    case "concert-this":
        concertThis(query);
        break;
    case "spotify-this-song":
        spotifyThisSong(query);
        break;
    case "movie-this":
        movieThis(query);
        break;
    case "do-what-it-says":
        doWhatItSays(query);
        break;

}

