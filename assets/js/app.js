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
    .otherwise({
        redirectTo: "/"
    });
}]);
app.controller("ListOfProductsCtrl", ["$scope",
    function($s) {

}]);
app.controller("ProductCtrl", ["$scope", "Chair",
    function($s, Chair) {

        // Box bool
        // $s.frontBox1Red = false;
        // $s.frontBox2Red = false;
        // $s.frontBox3Red = false;
        // $s.frontBox4Red = false;
        // $s.frontBox5Red = false;
        // $s.sideBox1Red = false;
        // $s.frontBox1Green = false;
        // $s.frontBox2Green = false;
        // $s.frontBox3Green = false;
        // $s.frontBox4Green = false;
        // $s.frontBox5Green = false;
        // $s.sideBox1Green = false;

        // $s.frontDefault = function(x) {
        //     $s["frontBox"+x+"Red"] = false;
        //     $s["frontBox"+x+"Green"] = false;
        // };

        // $s.frontRed = function(x) {
        //     $s["frontBox"+x+"Red"] = true;
        //     $s["frontBox"+x+"Green"] = false;
        // };

        // $s.frontGreen = function(x) {
        //     $s["frontBox"+x+"Red"] = false;
        //     $s["frontBox"+x+"Green"] = true;
        // };
        // $s.sideDefault = function(x) {
        //     $s["sideBox"+x+"Red"] = false;
        //     $s["sideBox"+x+"Green"] = false;
        // };

        // $s.sideRed = function(x) {
        //     $s["sideBox"+x+"Red"] = true;
        //     $s["sideBox"+x+"Green"] = false;
        // };

        // $s.sideGreen = function(x) {
        //     $s["sideBox"+x+"Red"] = false;
        //     $s["sideBox"+x+"Green"] = true;
        // };

        // initalize default chair
        $s.chair = new Chair();
        $s.mode = function(mode) {
            console.log(mode)
            if(mode == "classic") {
                $s.chair.custom = false;
            } else {
                $s.chair.custom = true;
            }
        }
}]);
app.factory("Chair", function() {

        // create class
        var Chair = function() {
            this.custom = null;
            this.data = {};
            // colorsnya sesuai namanya
            // contoh: "red" atau "green"
            // untuk scopenya nanti ditaruh image src
            this.data.colors = {
                frontBox1: null,
                frontBox2: null,
                frontBox3: null,
                frontBox4: null,
                frontBox5: null,
                sideBox1: null,
            };

        }

        return Chair;
})