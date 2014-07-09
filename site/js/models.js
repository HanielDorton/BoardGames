var app = app || {};

app.Game = Backbone.Model.extend({
    defaults: {
        coverImage: 'img/default.jpeg',
        title: 'No title',
        minPlayers: 0,
        maxPlayers: 8,
        Time: 60,
    },
parse: function( response ) {
    response.id = response._id;
    return response;
}
});
