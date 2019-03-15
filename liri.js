// this shares the information in dotenv with the liri.js file and hides the keys
require('dotenv').config();

// GLOBAL VARIABLES

let keys = require('./keys.js');

let fs = require('fs');
let axios = require('axios')
let moment = require('moment')

let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

let command = process.argv[2];

let parameter = process.argv[3];

function switchCase(command) {
    console.log(command);
    switch(command) {

        case 'concert-this':
            bandsInTown(parameter);
            break;

        case 'spotify-this-song':
            spotifySong(parameter);
            break;

        case 'movie-this':
            omdbMovie(parameter);
            break;

        case 'do-what-it-says':
            getRandom();
            break;

    }
};


function bandsInTown(parameter) {

axios.get("https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp").then (
        function(response) {
            // console.log(response)
            console.log(response.data[0]);
            console.log("VENUE: " + response.data[0].venue.name);
            console.log("LOCATION: " + response.data[0].venue.city + ",",response.data[0].venue.region);
            console.log("DATE: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
           
           
        }
    )
};


function spotifySong(parameter) {
    
    spotify.search ({type:'track', query: 'All the Small Things'}, function(err,data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    console.log(data);
    });

};
// spotifySong(parameter)


function omdbMovie(parameter) {

};

function getRandom(parameter) {

};


switchCase(command);



