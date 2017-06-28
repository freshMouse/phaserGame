var House  = require("./House");

module.exports = function(game, map, player) {
  this.houses = new Array(8);

  this.setup = function() {
    for(var i = 0; i < this.houses.length; i++) {
      this.houses[i] = new House(game, map, player);
      this.houses[i].setup();
    }
  }

  this.update = function() {
    for(var j = 0; j < this.houses.length; j++) {
      this.houses[j].update();
    }
  }
}


