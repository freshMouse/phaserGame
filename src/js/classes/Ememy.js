var Zombie = require("./Zombie");

module.exports = function(game, map, player) {
  this.housePos = {x: 10, y: 10};
  this.setup = function() {
    this.house = game.add.sprite(this.housePos.x, this.housePos.y, "ememyHouse");
    game.physics.enable(this.house);
    this.house.collideWorldBounds = true;

    this.zombie = new Zombie(game, this.housePos.x, this.housePos.y, map, player);
    this.zombie.setup();
  }

  this.update = function() {
    game.physics.arcade.collide(this.house, map.layer); 

    this.zombie.update();
  }
}


