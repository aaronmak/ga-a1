mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25tYWsiLCJhIjoiY2lqbW56MW41MDBhd3Q5a281cnczZzRxcCJ9.JJiANbdTxSUXpaUmQkXWDg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
    center: [103.829630, 1.360888], // starting position
    zoom: 11.5 // starting zoom
});
