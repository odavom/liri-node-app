# liri-node-app

# Overview
LIRI(Language Interpretation & Recognition Interface)is a command line node app that will search
* Spotify for songs 
* Bands in Town for concerts 
* OMDB for movies 


## Please use the following command line parameters to search

1. Bands in Town - search example
* `node liri concert-this "artist/band"`
    returns
     * Name of the venue

     * Venue location

     * Date of the Event
2. Spotify - search example
* `node liri spotify-this-song "name of song"`
    returns
     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from
3. OMDB - search example
* `node liri movie-this "name of movie"`
    returns
     * Title of the movie.
     * Year the movie came out.
     * IMDB Rating of the movie.
     * Rotten Tomatoes Rating of the movie.
     * Country where the movie was produced.
     * Language of the movie.
     * Plot of the movie.
     * Actors in the movie.
4. Random - search example
* `node liri do-what-it-says`
    returns
     * random command line search