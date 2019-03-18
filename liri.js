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
            
            // returns and array object named data
            // console.log(response);
            // console.log(response.data)
            let artist = response.data
           
            console.log (artist)
           
            for (let i = 0; i < artist.length; i++) {
                // console.log(artist[i]);nod
                console.log("\r\n");
                console.log("VENUE: " + artist[i].venue.name);
                console.log("LOCATION: " + artist[i].venue.city + ", " + artist[i].venue.region);
                console.log("DATE: " + moment(artist[i].datetime).format("MM/DD/YYYY"));
            }

           
            // console.log("LOCATION: " + response.data[0].venue.city + ",",response.data[0].venue.region);
            // console.log("DATE: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

            
           
           
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
    axios.get("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy").then (function(response){
        // if (parameter === undefined) {
        //     inputParameter = "Mr. Nobody"
           
        //     console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
           
        //     console.log("It's on Netflix!");  
        // }
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.imdbRating);
        // rotten tomatos
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);


    })

}

function getRandom(parameter) {

};


switchCase(command);



