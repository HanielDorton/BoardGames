
var app = app || {};
$(function() {
    new app.LibraryView();
    $( '#releaseDate' ).datepicker();
    $( '.about').hide();
    $( '#addgame').hide();  
});

$('.aboutbutton').on('click', function() {
    $( '.about').show(400);
    $( '#addgame').hide(400);
    $( '.eachgame').hide(400);
});

$('.addgamebutton').on('click', function() {
    $( '.about').hide(400);
    $( '.eachgame').hide(400)
    $( '#addgame').show(400);
});
$('.default').on('click', function() {
    $( '.about').hide(400);
    $( '#addgame').hide(400);
    $( '.eachgame').show(400);
    $( '[id=gameimage]').animate({opacity: '1',});
    $( '.gamedetails').hide();
});
$('.gameimage').on('hover', function() {
    $( '.gamedetails').show(400);
    $( '.about').show(400);
});

