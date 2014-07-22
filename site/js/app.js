
var app = app || {};
$(function() {
    lib = new app.LibraryView();
    new app.FilterRouter();
    Backbone.history.start();
    $( '#releaseDate' );
    $( '#addgame' ).hide();  
});
$('.addgamebutton' ).on('click', function() {
    $( '.col-sm-4' ).hide(400)
    $( '#addgame' ).show(400);
    $( '.dropdown').hide(400);
});
$('.default' ).on('click', function() {
    $( '#addgame' ).hide(400);
    $( '.col-sm-4' ).show(400);
    $( '[id=gameimage]' ).animate({opacity: '1',});
    $( '.gamedetails' ).hide();
    $( '.dropdown').show(400);
});
$('.gameimage' ).on('hover', function() {
    $( '.gamedetails' ).show(400);
});

$(".dropdown-menu li a").click(function() {
	var temp = $(this).text();
	$(this).parents('.dropdown').find('.dropdown-toggle').html($(this).text()+" <span class=\"caret\"></span>");
});

