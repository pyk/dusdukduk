app.service("Cart", function() {
    this.selected = [];
    this.add = function(o) {
        this.selected.push(o);
    }
})