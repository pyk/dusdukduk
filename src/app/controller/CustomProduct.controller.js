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