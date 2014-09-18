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
            console.log($s.products);
        })
}]);