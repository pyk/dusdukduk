app.factory("ProductAPI", ["$http",
    function($h) {

        // create class
        var Product = function() {
            this.kode = null;
            this.nama = null;
            this.foto = null;
            this.harga = null;
            this.deskripsi = null;
        };

        var ProductAPI = function(){
            this.products = [];
        };
        ProductAPI.prototype.getAllProducts = function() {
            var self = this;
            return $h({
                method: "GET",
                url: "https://spreadsheets.google.com/feeds/list/1DozgM2zw2q0M7fnMg5R7tGJwUL6K3OWt3rJqxsBLMkU/od6/public/basic?hl=en_US&alt=json"
            }).then(function(response) {
                for (var i = 0; i < response.data.feed.entry.length; i++) {
                    var p = new Product();
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
        return ProductAPI;
}]);