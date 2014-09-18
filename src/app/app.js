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