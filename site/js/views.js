var app = app || {};

app.GameView = Backbone.View.extend({
    tagName: 'div',
    className: 'gameContainer',
    template: _.template( $( '#gameTemplate' ).html() ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});

app.LibraryView = Backbone.View.extend({
    el: '#games',

    initialize: function() {
    this.collection = new app.Library();
    this.collection.fetch({reset: true});
    this.render();
    this.on("change:filterType", this.filterByType, this);
    this.listenTo( this.collection, 'add', this.renderGame );
    this.listenTo( this.collection, 'reset', this.render );
},



    // render library by rendering each game in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderGame( item );
        }, this );
	$( '.gamedetails').hide();
    },


    // render a game by creating a GameView and appending the
    // element it renders to the library's element
    renderGame: function( item ) {
        var gameView = new app.GameView({
            model: item
        });
        this.$el.append( gameView.render().el );
    },
events:{
    'click #add':'addgame',
    'click #gameimage':'focusgame',
    'click .gamedetails':'unfocusgame',
    //'click .gamedetails':'filterByType'
},

setFilter: function (e) {
    this.filterType = e.currentTarget.value;
    this.trigger("change:filterType");
},

filterByType: function ( ) {
    console.log("filtering");
    if (this.filterType === "") {
        this.collection.reset();
    } else {
        this.collection.reset({ silent: true });
 
        var filterType = this.filterType,
            filtered = _.filter(this.collection.models, function (item) {
            return item.get("minPlayers") === filterType;
        });
 
        this.collection.reset(filtered);
    }
},


unfocusgame: function( e ) {
    $(e.currentTarget).prevUntil('focused').animate({opacity: '1',});
    $(e.currentTarget).prevUntil('focused').removeClass('focused');
    $(e.currentTarget).hide(400);
},

focusgame: function( e ) {
if( $(e.currentTarget).hasClass('focused')) {
    $(e.currentTarget).removeClass('focused');
    $(e.currentTarget).animate({opacity: '1',});
    $(e.currentTarget).parent().children('.gamedetails').hide(400);
} else {
    $(e.currentTarget).addClass('focused');
    $(e.currentTarget).animate({opacity: '.5',});
    $(e.currentTarget).parent().children('.gamedetails').show(400);
}

},
addgame: function( e ) {
    e.preventDefault();

    var formData = {};

    $( '#addgame div' ).children( 'input' ).each( function( i, el ) {
        if( $( el ).val() != '' )
        {
            if( el.id === 'keywords' ) {
                formData[ el.id ] = [];
                _.each( $( el ).val().split( ' ' ), function( keyword ) {
                    formData[ el.id ].push({ 'keyword': keyword });
                });
            } else if( el.id === 'releaseDate' ) {
                formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
            } else {
                formData[ el.id ] = $( el ).val();
            }
        }
        // Clear input field value
        $( el ).val('');
    });

    this.collection.create( formData );
},


});

app.FilterRouter = Backbone.Router.extend({
    routes: {
        "filter/:type": "urlFilter"
    },
 
    urlFilter: function (type) {
        console.log("reached FilterRouter");
        this.filterType = type;
        this.trigger("change:filterType");
    }
});
