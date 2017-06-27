var Zombie = require("./Zombie");

module.exports = function(game, map, player) {
  this.housePos = {x: 10, y: 10};
  this.zombies = new Array(10);
  this.setup = function() {
    this.house = game.add.sprite(this.housePos.x, this.housePos.y, "ememyHouse");
    game.physics.enable(this.house);
    this.house.collideWorldBounds = true;

    for(var i = 0; i < this.zombies.length; i++) {
      this.zombies[i] = new Zombie(game, this.housePos.x, this.housePos.y, map, player);
      this.zombies[i].setup();
    }
  }

  this.update = function() {
    game.physics.arcade.collide(this.house, map.layer); 
    for(var i = 0; i < this.zombies.length; i++) {
      this.zombies[i].update();
    }
  }
}


