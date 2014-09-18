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