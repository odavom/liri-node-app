// this will read and set any environment variables with the dotenv package
require('dotenv').config();

// this will import the keys.js file and store it in a variable
let keys = require('./keys.js');
console.log(keys);

// access keys information
let spotify = new Spotify(keys.spotify);
console.log(spotify);