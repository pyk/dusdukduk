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