// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require ("mongoose"); //MongoDB integration

//Create server
var app = express();

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Where to serve static content
    app.use( express.static( __dirname + '/site' ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Start server
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});


//database connectiong
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/HelloMongoose';

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});


//Schemas
var Game = new mongoose.Schema({
    coverImage: String,
    title: String,
    minPlayers: Number,
    maxPlayers: Number,
    time: Number
});



//Models
var GameModel = mongoose.model( 'Game', Game );

//route to get all games from database
app.get( '/api/games', function( request, response ) {
    return GameModel.find( function( err, games ) {
        if( !err ) {
            return response.send( games );
        } else {
            return console.log( err );
        }
    });
});

//route to Insert a new game
app.post( '/api/games', function( request, response ) {
    var game = new GameModel({
        coverImage: request.body.coverImage,
        title: request.body.title,
        minPlayers: request.body.minPlayers,
        maxPlayers: request.body.maxPlayers,
        time: request.body.time,
    });

    return game.save( function( err ) {
        if( !err ) {
            console.log( 'created' );

                        return response.send( game );
            } else {
                console.log( err );
            }
    });
});

//route to Get a single game by id
app.get( '/api/games/:id', function( request, response ) {
    return GameModel.findById( request.params.id, function( err, game ) {
        if( !err ) {
            return response.send( game );
        } else {
            return console.log( err );
        }
    });
});

//Route to update a game
app.put( '/api/games/:id', function( request, response ) {
    console.log( 'Updating game ' + request.body.title );
    return GameModel.findById( request.params.id, function( err, game ) {
        game.coverImage = request.body.coverImage;
        game.title = request.body.title;
        game.minPlayers = request.body.minPlayers;
        game.maxPlayers = request.body.maxPlayers;
        game.time = request.body.time;

        return game.save( function( err ) {
            if( !err ) {
                console.log( 'game updated' );
            return response.send( game );
        } else {
            console.log( err );
        }
        });
    });
});

//Route to Delete a game
app.delete( '/api/games/:id', function( request, response ) {
    console.log( 'Deleting game with id: ' + request.params.id );
    return GameModel.findById( request.params.id, function( err, game ) {
        return game.remove( function( err ) {
            if( !err ) {
                console.log( 'Game removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});


