var app = app || {};

app.GameView = Backbone.View.extend({
    tagName: 'div',
    className: 'gameContainer',
    template: _.template( $( '#gameTemplate' ).html() ),

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});

app.LibraryView = Backbone.View.extend({
    el: '#games',

    initialize: function() {
    this.collection = new app.Library();
    this.collection.fetch({reset: true});
    this.on("change:playerType", this.filterByPlayer, this);
    this.on("change:timeType", this.filterByTime, this);
    this.listenTo( this.collection, 'add', this.renderGame );
    this.collection.on("reset", this.render, this);
},



    render: function() {
        this.collection.each(function( item ) {
            this.renderGame( item );
        }, this );
	$( '.gamedetails').hide();
    },


    renderGame: function( item ) {
        var gameView = new app.GameView({
            model: item
        });
        this.$el.append( gameView.render().el );
    },
events:{
    'click #add':'addGame',
    'click #gameimage':'focusGame',
    'click .gamedetails':'unfocusGame',
},

resetFilters: function( ) {
    this.playerFilter = "0";
    this.timeFilter = "0"
    this.filterByPlayer();
},

filterByPlayer: function ( ) {
    this.$el.empty();
    if (!this.playerFilter || this.playerFilter === "0") {
	if (!this.timeFilter || this.timeFilter === "0") {
		this.collection.each(function( item ) {
		    this.renderGame( item );
		}, this ); }
	else {
	    var maxTime;
	    if (this.timeFilter === '120') {maxTime = 99999}
	    else {maxTime = Number(this.timeFilter) +30}
	    this.collection.each(function( item ) {
		if (item.get("time") >= Number(this.timeFilter) &&
		item.get("time") <= maxTime)
		{this.renderGame( item );}
		}, this ); 
	}
    } else {
	lib.trigger("reset");
	if (!this.timeFilter || this.timeFilter === "0") {
		this.collection.each(function( item ) {
		    if (item.get("minPlayers") <= Number(this.playerFilter) && 
			item.get("maxPlayers") >= Number(this.playerFilter)) 
			{this.renderGame( item );}
		}, this ); }
	else {
		var maxTime;
		if (this.timeFilter === '120') {maxTime = 99999}
		else {maxTime = Number(this.timeFilter) +30}
		this.collection.each(function( item ) {
		    if (item.get("minPlayers") <= Number(this.playerFilter) && 
			item.get("maxPlayers") >= Number(this.playerFilter) &&
			item.get("time") >= Number(this.timeFilter) &&
			item.get("time") <= maxTime) 
			{this.renderGame( item );}
		}, this ); }

    }
    $( '.gamedetails').hide();
},

filterByTime: function ( ) {
    this.$el.empty();
    if (!this.timeFilter || this.timeFilter === "0") {
	if (!this.playerFilter || this.playerFilter === "0") {
	    this.collection.each(function( item ) {
                this.renderGame( item );
            }, this );
	}
	else {
	    this.collection.each(function( item ) {
	    if (item.get("minPlayers") <= Number(this.playerFilter) && 
		item.get("maxPlayers") >= Number(this.playerFilter))
	        {this.renderGame( item );}
                }, this ); }
	}
    else {
        lib.trigger("reset");
	var maxTime;
	if (this.timeFilter === '120') {maxTime = 99999}
	else {maxTime = Number(this.timeFilter) +30}
        if (!this.playerFilter || this.playerFilter === "0") {
            this.collection.each(function( item ) {
                if (item.get("time") >= Number(this.timeFilter) &&
		    item.get("time") <= maxTime)
		{this.renderGame( item );}
                }, this ); }
	else {
            this.collection.each(function( item ) {
                if (item.get("time") >= Number(this.timeFilter) &&
		    item.get("time") <= maxTime &&
		    item.get("minPlayers") <= Number(this.playerFilter) && 
		    item.get("maxPlayers") >= Number(this.playerFilter))
		{this.renderGame( item );}
                }, this ); }
    }
    $( '.gamedetails').hide();
},


unfocusGame: function( e ) {
    $(e.currentTarget).prevUntil('focused').animate({opacity: '1',});
    $(e.currentTarget).prevUntil('focused').removeClass('focused');
    $(e.currentTarget).hide(400);
},

focusGame: function( e ) {
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
addGame: function( e ) {
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
        $( el ).val('');
    });

    this.collection.create( formData );
},


});

app.FilterRouter = Backbone.Router.extend({
    routes: {
        "players/:type": "playerFilter",
	"time/:type": "timeFilter",
	"home": "reset"
    },
 
    playerFilter: function (type) {
        lib.playerFilter = type;
        lib.trigger("change:playerType");
    },

    timeFilter: function (type) {
        lib.timeFilter = type;
        lib.trigger("change:timeType");
    },

    reset: function () {
	lib.resetFilters();
    },
});
