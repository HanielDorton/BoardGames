var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: _.template( $( '#bookTemplate' ).html() ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});

app.LibraryView = Backbone.View.extend({
    el: '#books',

    initialize: function( initialBooks ) {
	
        this.collection = new app.Library( initialBooks );
        this.render();
this.listenTo( this.collection, 'add', this.renderBook );

    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderBook( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function( item ) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    },
	events:{
    'click #add':'addBook'
},

addBook: function( e ) {
    e.preventDefault();

    var formData = {};

    $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
        if( $( el ).val() != '' )
        {
            formData[ el.id ] = $( el ).val();
        }
    });

    this.collection.add( new app.Book( formData ) );
},


});
