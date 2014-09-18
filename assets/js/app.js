var app = angular.module("dusdukduk", ["ngRoute", "angular-loading-bar"]);

app.config(["$routeProvider", "$locationProvider",
    function($rp, $lp) {
    $rp
    .when("/", {
        templateUrl: "/assets/views/list_of_products.html",
        controller: "ListOfProductsCtrl"
    })
    .when("/product/:id", {
        templateUrl: "/assets/views/product.html",
        controller: "ProductCtrl"
    })
    .when("/checkout", {
        templateUrl: "/assets/views/checkout.html",
        controller: "CartCtrl"
    })
    .when("/success", {
        templateUrl: "/assets/views/success.html",
        controller: "SuccessCtrl"
    })
    .otherwise({
        redirectTo: "/"
    });
}]);
app.controller("CartCtrl", ["$scope", "Cart", "Rupiah", "$http", "transformRequestAsFormPost", "$location",
    function($s, Cart, Rupiah, $h, transformRequestAsFormPost, $l) {

        $s.selected = Cart.selected;

        // rupiah formater
        var rupiah = new Rupiah();
        $s.formatRupiah = function(n) {
            n.hargaTotal = (n.harga + parseInt(n.antirayap) + parseInt(n.antiair)) * n.quantity;
            return rupiah.convert(n.hargaTotal);
        };

        $s.buyer = {};
        $s.shipping = {};
        $s.copyBuyerIdentity = function() {
            console.log("test");
            $s.shipping.email = $s.buyer.email;
            $s.shipping.fullname = $s.buyer.fullname;
            $s.shipping.phone = $s.buyer.phone;
            $s.shipping.addr = $s.buyer.addr;
            $s.shipping.province = $s.buyer.province;
            $s.shipping.country = $s.buyer.country;
        }

        // transaction code
        $s.tcode = Math.floor(Math.random() * 90000);
        $s.totalBiaya = function(ss) {
            var total = 0;
            for (var i = 0; i < ss.length; i++) {
                total += parseInt(ss[i].hargaTotal);
            };
            $s.total_biaya = rupiah.convert(total);
            return rupiah.convert(total);
        }
        // start transaction
        $s.trxshow= true;
        $s.startTransaction = function() {
            var products = [];
            var quantitys = [];
            for (var i = 0; i < $s.selected.length; i++) {
                products.push($s.selected[i].kode)
                quantitys.push($s.selected[i].quantity)
            };
            return $h({
                method: "POST",
                url: "https://script.google.com/macros/s/AKfycbwYbCqm5W8oK1Ta2__oeuuUAPHyATcAtgZEgn6_TCf_ugO8gcgE/exec",
                transformRequest: transformRequestAsFormPost,
                data: {
                    kode: $s.tcode,
                    total_biaya: $s.total_biaya,
                    products: products.join(","),
                    quantitys: quantitys.join(","),
                    buyer_email: $s.buyer.email,
                    buyer_fullname: $s.buyer.fullname,
                    buyer_phone: $s.buyer.phone,
                    buyer_address: $s.buyer.addr,
                    buyer_province: $s.buyer.province,
                    buyer_country: $s.buyer.country,
                    shipping_email: $s.shipping.email,
                    shipping_fullname: $s.shipping.fullname,
                    shipping_phone: $s.shipping.phone,
                    shipping_address: $s.shipping.addr,
                    shipping_province: $s.shipping.province,
                    shipping_country: $s.shipping.country,
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status) {
                $s.trxSuccess = true;
                $s.trxError = false;
                $s.trxshow = false;
            }).error(function(data, status) {
                $s.trxError = true;
                $s.trxshow= false;
                $s.trxSuccess = false;
            })
        }

}]);
app.controller("CustomProductCtrl", ["$scope", "Chair",
    function($s, Chair) {

        // initalize default chair
        $s.chair = new Chair(600000);

        // mode changer
        $s.mode = function(mode) {
            if(mode == "classic") {
                $s.chair.custom.status = false;
                $s.chair.custom.harga = 0;
            } else {
                $s.chair.custom.status = true;
                $s.chair.custom.harga = 10000;
            }
        };

        // formater
        $s.changeToRupiah = function(angka){
            var rev     = parseInt(angka, 10).toString().split("").reverse().join("");
            var rev2    = "";
            for(var i = 0; i < rev.length; i++){
                rev2  += rev[i];
                if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
                    rev2 += ".";
                }
            }
            return "Rp. " + rev2.split("").reverse().join("") + ",00";
        };

        // Color changer
        // Box bool
        $s.frontBox1Red = false;
        $s.frontBox2Red = false;
        $s.frontBox3Red = false;
        $s.frontBox4Red = false;
        $s.frontBox5Red = false;
        $s.sideBox1Red = false;
        $s.frontBox1Green = false;
        $s.frontBox2Green = false;
        $s.frontBox3Green = false;
        $s.frontBox4Green = false;
        $s.frontBox5Green = false;
        $s.sideBox1Green = false;

        $s.frontDefault = function(x) {
            $s["frontBox"+x+"Red"] = false;
            $s["frontBox"+x+"Green"] = false;
        };

        $s.frontRed = function(x) {
            $s["frontBox"+x+"Red"] = true;
            $s["frontBox"+x+"Green"] = false;
        };

        $s.frontGreen = function(x) {
            $s["frontBox"+x+"Red"] = false;
            $s["frontBox"+x+"Green"] = true;
        };
        $s.sideDefault = function(x) {
            $s["sideBox"+x+"Red"] = false;
            $s["sideBox"+x+"Green"] = false;
        };

        $s.sideRed = function(x) {
            $s["sideBox"+x+"Red"] = true;
            $s["sideBox"+x+"Green"] = false;
        };

        $s.sideGreen = function(x) {
            $s["sideBox"+x+"Red"] = false;
            $s["sideBox"+x+"Green"] = true;
        };
}]);
app.controller("ListOfProductsCtrl", ["$scope", "ProductAPI", "Rupiah",
    function($s, ProductAPI, Rupiah) {

        var productAPI = new ProductAPI();

        // formater
        var rupiah = new Rupiah();
        $s.formatRupiah = function(n) {
            return rupiah.convert(n);
        }
        productAPI.getAllProducts().then(function(){
            $s.products = productAPI.products;
        })
}]);
app.controller("ProductCtrl", ["$scope", "$routeParams", "ProductAPI", "Rupiah", "Cart",
    function($s, $rp, ProductAPI, Rupiah, Cart) {

        // get product data
        var productAPI = new ProductAPI();
        productAPI.getProduct($rp.id).then(function(){
            // initialize product
            $s.product = {};
            $s.product = productAPI.product;
            $s.product.quantity = 1;
            $s.product.antiair = 0;
            $s.product.antirayap = 0;
            $s.product.harga = parseInt($s.product.harga);
            $s.product.antiair = parseInt($s.product.antiair);
            $s.product.antirayap = parseInt($s.product.antirayap);
        })

        // rupiah formater
        var rupiah = new Rupiah();
        $s.formatRupiah = function(n) {
            return rupiah.convert((n.harga + parseInt(n.antirayap) + parseInt(n.antiair)) * n.quantity);
        };

        $s.addToCart = function(o) {
            $s.btnCart = "disabled";
            $s.bayar = true;
            return Cart.add(o);
        }
}]);
app.controller("SuccessCtrl", function(){

})
app.service("Cart", function() {
    this.selected = [];
    this.add = function(o) {
        this.selected.push(o);
    }
})
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
app.factory("Chair", function() {

        // create class
        var Chair = function(harga) {
            this.custom = {
                status: false,
                harga: 0
            };
            // colorsnya sesuai namanya
            // contoh: "red" atau "green"
            // untuk scopenya nanti ditaruh image src
            this.colors = {
                frontBox1: null,
                frontBox2: null,
                frontBox3: null,
                frontBox4: null,
                frontBox5: null,
                sideBox1: null,
            };
            this.utilitas = {
                antiRayap: {
                    harga: 0
                },
                antiAir: {
                    harga: 0
                }
            };
            this.hargaAwal = harga;
        };

        Chair.prototype.getHargaTotal = function() {
            return this.hargaAwal + this.custom.harga + parseInt(this.utilitas.antiRayap.harga) + parseInt(this.utilitas.antiAir.harga);
        };

        return Chair;
});
app.factory("Rupiah", function() {

    var Rupiah = function() {};

    Rupiah.prototype.convert = function(n) {
        var rev     = parseInt(n, 10).toString().split("").reverse().join("");
        var rev2    = "";
        for(var i = 0; i < rev.length; i++){
            rev2  += rev[i];
            if((i + 1) % 3 === 0 && i !== (rev.length - 1)){
                rev2 += ".";
            }
        }
        return "Rp. " + rev2.split("").reverse().join("") + ",00";
    };

    return Rupiah;
})