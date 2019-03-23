# liri-node-app

# Overview
LIRI(Language Interpretation & Recognition Interface)is a command line node app that will search
* Spotify for songs 
* Bands in Town for concerts 
* OMDB for movies 


## Please use the following parameters to search

1. Bands in Town - search example
* `node liri concert-this "artist/band"`
    returns
     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from
2. Spotify - search example
* `node liri spotify-this-song "name of song"`
3. OMDB - search example
* `node liri movie-this "name of movie"`
4. Random - search example
* `node liri do-what-it-says`