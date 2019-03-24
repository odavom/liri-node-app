// this shares the information in dotenv with the liri.js file and hides the keys
require('dotenv').config();

// GLOBAL VARIABLES

let fs = require('fs');

let axios = require('axios');
let moment = require('moment');
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

let keys = require('./keys.js');

let command = process.argv[2];

let parameter = process.argv.slice(3).join(" ");

var divider = "\n------------------------------------------------------------\n\n";

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

    axios.get("https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp")
    .then(
        function(response) {
           
            // returns an array object named data
            // console.log(response);
            // console.log(response.data)
            let artist = response.data
           
            // console.log (artist)
           
            for (let i = 0; i < artist.length; i++) {
                // console.log(artist[i]);
                let search = artist[i];
                // console.log(search.lineup.join(", "));

                // // console.log("\r\n");
                let artistData = [
                    "LINEUP: " + search.lineup.join(", "),
                    "VENUE: " + search.venue.name,
                    "LOCATION: " + search.venue.city + ", " + search.venue.region,
                    "DATE: " + moment(search.datetime).format("MM/DD/YYYY"),
                ].join("\n\n") 

               

                fs.appendFile("log.txt", artistData + divider, function(err) {
                    if (err) throw err;
                    console.log(divider + artistData + divider);
                });
            }
        
            // console.log("LOCATION: " + response.data[0].venue.city + ",",response.data[0].venue.region);
            // console.log("DATE: " + moment(response.data[0].datetime).format("MM/DD/YYYY")); 
        })
        .catch(function (error) {
            console.log(error);
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
            let songData = [
                "ARTIST: " + song[0].artists[0].name,
                "SONG: " + song[0].name,
                "PREVIEW: " + song[0].preview_url,
                "ALBUM: " + song[0].album.name,
            ].join("\n\n");

            fs.appendFile("log.txt", songData + divider, function(err) {
                if (err) throw err;
                console.log(divider + songData + divider);
            });

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
    axios.get("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy")
    .then (function(response){
        if (!parameter) {
            parameter = "Mr. Nobody"
           
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
           
            console.log("It's on Netflix!");  
        } else { 
        // console.log(response.data);
        // let object = response.data;
        // console.log(object)
        // object = JSON.stringify(object);
        // console.log(object)
       let movieData = [
            "TITLE: " + response.data.Title,
            "YEAR: " + response.data.Year,
            "IMDB: " + response.data.imdbRating,
            "ROTTEN TOMATOES: " + response.data.Ratings[2].Value,
            "COUNTRY: " + response.data.Country,
            "LANGUAGE: " + response.data.Language,
            "PLOT: " + response.data.Plot,
            "ACTORS: " + response.data.Actors].join("\n\n");
        
            fs.appendFile("log.txt", movieData + divider, function(err) {
            if (err) throw err;
            console.log(divider + movieData + divider);
            });
        
    }
    })
    .catch(function (error) {
        console.log(error);
      });

}

function getRandom(parameter) {
    fs.readFile('random.txt', 'utf8', function
    (err, data) {

        if(err) {
            return console.log(error);
        } else {
            // console.log(data);

            let dataArr = data.split(",")
            // console.log(randomData);
            console.log(dataArr[0], dataArr[1]);

            switch(dataArr[0]) {

                case 'concert-this':
                    bandsInTown(dataArr[1]);
                    break;
        
                case 'spotify-this-song':
                    spotifySong(dataArr[1]);
                    break;
        
                case 'movie-this':
                    omdbMovie(dataArr[1]);
                    break;
        
                case 'do-what-it-says':
                    getRandom(dataArr[1]);
                    break;
        
            }

        }
    

    });
}


switchCase(command);



