app.controller("ListOfProductsCtrl", ["$scope", "ProductAPI",
    function($s, ProductAPI) {

        var productAPI = new ProductAPI();
        productAPI.getAllProducts().then(function(){
            $s.products = productAPI.products;
        })
}]);