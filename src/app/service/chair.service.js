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