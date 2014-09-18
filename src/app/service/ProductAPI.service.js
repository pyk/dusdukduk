app.factory("ProductAPI", ["$http",
    function($h) {

        // create class
        var Product = function() {
            this.id = null;
            this.kode = null;
            this.nama = null;
            this.foto = null;
            this.harga = null;
            this.deskripsi = null;
            this.quantity = null;
        };

        var ProductAPI = function(){
            this.products = [];
            this.product = null;
        };

        ProductAPI.prototype.getAllProducts = function() {
            var self = this;
            return $h({
                method: "GET",
                url: "https://spreadsheets.google.com/feeds/list/1DozgM2zw2q0M7fnMg5R7tGJwUL6K3OWt3rJqxsBLMkU/od6/public/basic?hl=en_US&alt=json"
            }).then(function(response) {
                for (var i = 0; i < response.data.feed.entry.length; i++) {
                    var p = new Product();
                    // id produk
                    var idregex = /\S{5}$/g;
                    p.id = response.data.feed.entry[i].id.$t.match(idregex)[0]
                    var xs = response.data.feed.entry[i].content.$t.split(", ");
                    var regex = /\w+:\s([^&]*)/g;
                    p.kode = xs[0].replace(/^\S+\s/, "");
                    p.nama = xs[1].replace(/^\S+\s/, "");
                    p.foto = xs[2].replace(/^\S+\s/, "");
                    p.harga = xs[3].replace(/^\S+\s/, "");
                    p.deskripsi = xs[4].replace(/^\S+\s/, "");
                    self.products.push(p);
                };
                return response;
            })
        };

        ProductAPI.prototype.getProduct = function(id) {
            var self = this;
            return $h({
                method: "GET",
                url: "https://spreadsheets.google.com/feeds/list/1DozgM2zw2q0M7fnMg5R7tGJwUL6K3OWt3rJqxsBLMkU/od6/public/basic/"+ id +"?hl=en_US&alt=json"
            }).then(function(response) {
                var p = new Product();
                // id produk
                var idregex = /\S{5}$/g;
                p.id = response.data.entry.id.$t.match(idregex)[0];
                var xs = response.data.entry.content.$t.split(", ");
                var regex = /\w+:\s([^&]*)/g;
                p.kode = xs[0].replace(/^\S+\s/, "");
                p.nama = xs[1].replace(/^\S+\s/, "");
                p.foto = xs[2].replace(/^\S+\s/, "");
                p.harga = xs[3].replace(/^\S+\s/, "");
                p.deskripsi = xs[4].replace(/^\S+\s/, "");
                self.product = p;
                return response;
            })
        };

        return ProductAPI;
}]);

        // -------------------------------------------------- //
        // -------------------------------------------------- //


        // I provide a request-transformation method that is used to prepare the outgoing
        // request as a FORM post instead of a JSON packet.
        app.factory(
            "transformRequestAsFormPost",
            function() {

                // I prepare the request data for the form post.
                function transformRequest( data, getHeaders ) {

                    var headers = getHeaders();

                    headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";

                    return( serializeData( data ) );

                }


                // Return the factory value.
                return( transformRequest );


                // ---
                // PRVIATE METHODS.
                // ---


                // I serialize the given Object into a key-value pair string. This
                // method expects an object and will default to the toString() method.
                // --
                // NOTE: This is an atered version of the jQuery.param() method which
                // will serialize a data collection for Form posting.
                // --
                // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
                function serializeData( data ) {

                    // If this is not an object, defer to native stringification.
                    if ( ! angular.isObject( data ) ) {

                        return( ( data == null ) ? "" : data.toString() );

                    }

                    var buffer = [];

                    // Serialize each key in the object.
                    for ( var name in data ) {

                        if ( ! data.hasOwnProperty( name ) ) {

                            continue;

                        }

                        var value = data[ name ];

                        buffer.push(
                            encodeURIComponent( name ) +
                            "=" +
                            encodeURIComponent( ( value == null ) ? "" : value )
                        );

                    }

                    // Serialize the buffer and clean it up for transportation.
                    var source = buffer
                        .join( "&" )
                        .replace( /%20/g, "+" )
                    ;

                    return( source );

                }

            }
        );