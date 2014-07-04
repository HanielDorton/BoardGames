// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongodb = require( 'mongodb' ); //MongoDB integration

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
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Start server
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});

mongodb.Db.connect('mongodb://localhost/mydb', function (err, db) {
  db.collection('books', function(er, collection) {
    collection.insert({'title': 'sherlock holmes', 'author': "Conan Doyle"}, {safe: true}, function(er,rs) {
    });
  });
});


