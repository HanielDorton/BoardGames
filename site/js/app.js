
var app = app || {};
$(function() {
    new app.LibraryView();
    new app.FilterRouter();
    Backbone.history.start();

    $( '#releaseDate' );
    $( '.about' ).hide();
    $( '#addgame' ).hide();  
});

$('.aboutbutton' ).on('click', function() {
    $( '.about' ).show(400);
    $( '#addgame ').hide(400);
    $( '.col-sm-4' ).hide(400);
    $( '.dropdown').hide(400);
});

$('.addgamebutton' ).on('click', function() {
    $( '.about' ).hide(400);
    $( '.col-sm-4' ).hide(400)
    $( '#addgame' ).show(400);
    $( '.dropdown').hide(400);
});
$('.default' ).on('click', function() {
    $( '.about' ).hide(400);
    $( '#addgame' ).hide(400);
    $( '.col-sm-4' ).show(400);
    $( '[id=gameimage]' ).animate({opacity: '1',});
    $( '.gamedetails' ).hide();
    $( '.dropdown').show(400);
});
$('.gameimage' ).on('hover', function() {
    $( '.gamedetails' ).show(400);
    $( '.about' ).show(400);
});

