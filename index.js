var express = require('express');
var path = require('path');
var exphbs  = require('express-handlebars');
var routes = require('./routes/routes.js');
var config = require( './config/config.json' );
var bodyParser = require('body-parser');

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);


app.listen( {
    port: config.port
}, function () {
    console.log( `Food Fight is listening on port ${config.port}.` );
} ).on( 'error', function ( err ) {
    if ( err ) {
        console.log( `Couldn't listen on port ${config.port}. (Run as root?)` );
    }
} );