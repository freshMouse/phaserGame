var Zombie = require("./Zombie.js");

module.exports = function(game, map, player) {
  this.x = Math.random() * 10000;
  this.y = 3000;

  this.zombies = new Array(5);

  this.house = game.add.sprite(this.x, this.y, "ememyHouse");

  this.setup = function() {
    game.physics.enable(this.house);
    this.house.collideWorldBounds = true;

    for(var i = 0; i < this.zombies.length; i++) {
      this.zombies[i] = new Zombie(game, this.x, this.y, map, player);
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
