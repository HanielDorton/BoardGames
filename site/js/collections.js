var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Game,
    url: '/api/games',
    comparator: 'title'
});
