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
                // console.log(artist[i]);
                console.log("\r\n");
                console.log("VENUE: " + artist[i].venue.name);
                console.log("LOCATION: " + artist[i].venue.city + ", " + artist[i].venue.region);
                console.log("DATE: " + moment(artist[i].datetime).format("MM/DD/YYYY"));
            }

           
            // console.log("LOCATION: " + response.data[0].venue.city + ",",response.data[0].venue.region);
            // console.log("DATE: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

            
           
           
        });
}

function spotifySong(parameter) {
    if (!parameter) {
        parameter = "The Sign Ace of Base";
    };
    // console.log(parameter);
    spotify.search ({type:'track', query: parameter})
    .then(function(response) {
        // console.log(typeof response);
        // console.log(response)

        // items is an array of array objects
        // console.log(response.tracks.items);
        // so set to song to iteratre through items array
        let song = response.tracks.items;
        // console.log(song[0].name);
        // for(let i in song) {
            // console.log(song[i]);
            // let songSearch = song[i];
            // console.log(songSearch.name)
            // console.log(songSearch.artists);
            // for(let i in songSearch.artists) {
                // console.log(songSearch.artists[i]);
                // let artists = songSearch.artists[i];
                // this prints all 20 artists
                // console.log(artists.name)
            // }
        // }


            // the below works
        console.log(song[0].artists[0].name)
        console.log(song[0].name);
        console.log(song[0].preview_url);
        console.log(song[0].album.name)


        // for( i = 0; i < song.length; i++);
        // console.log(song[i]);
      })
      .catch(function(err) {
        console.log(err);
      });

      

    }




    //     console.log(data)
    // //    console.log(data.tracks.items[0]);
    //    let song = data.tracks.items[0];
        // console.log(song);

        // console.log(song.album.artists[0].preview_url)

        // the below works
        // console.log(song.album.artists[0].name)
        // console.log(song.album.name)


        // console.log(data.tracks);
    // console.log(data.tracks.items[0].artists[0].name);
    // console.log(data.tracks);
    // let song = data.tracks.items;
    
    // for (let i = 0; i < song.length; i++) {
    //     // console.log(song[i].artists)
    //     // console.log(song[i].name)
    // }
   
   
    




    // });


// spotifySong(parameter)


function omdbMovie(parameter) {
    axios.get("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy").then (function(response){
        if (parameter === undefined) {
            inputParameter = "Mr. Nobody"
           
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
           
            console.log("It's on Netflix!");  
        }
        // console.log( response.data);
        console.log("TITLE: " + response.data.Title);
        console.log("YEAR: " + response.data.Year);
        console.log("IMDB: " + response.data.imdbRating);
        console.log("ROTTEN TOMATOES: " + response.data.Ratings[2].Value)
        console.log("COUNTRY: " + response.data.Country);
        console.log("LANGUAGE: " + response.data.Language);
        console.log("PLOT: " + response.data.Plot);
        console.log("ACTORS: " + response.data.Actors);

    });

}

function getRandom(parameter) {
    fs.readFile('random.txt', 'utf8', function
    (err, data) {

        if(err) {
            return console.log(error);
        }
    console.log(data);

   
    let randomData = data.split(", ")
    console.log(randomData);

    });
}


switchCase(command);



