Game.L1 = function(game) {
  this.init = function() {
    this.player = new Player(this);
    this.map = new Map(this);
  }
  
  this.create = function() {
    this.map.setup();
    this.setupControls();
    this.player.setup();
  }

  this.update = function() {
    this.player.update(this.map);
  }

  this.setupControls = function() {
    controls = {
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR) // mine!
    }
  }

  this.mine = function() {
    map.putTile(-1, this.mineTile.x, this.mineTile.y);
  }
}

