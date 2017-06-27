var Player = require("./../classes/Player");
var Map =    require("./../classes/Map");
var Ememy =  require("./../classes/Ememy");

module.exports = function(game) {
  this.init = function() {
    this.player = new Player(this);
    this.map = new Map(this);
    this.ememy = new Ememy(this, this.map, this.player);
  }
  
  this.create = function() {
    this.map.setup();
    this.setupControls();
    this.player.setup();
    this.ememy.setup();
  }

  this.update = function() {
    this.player.update(this.map);
    this.ememy.update();
  }

  this.setupControls = function() {
    controls = {
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR) // mine!
    }
  }
}

