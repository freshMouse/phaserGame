  // to draw the tileset
var map, layer;
  
var player, playerSpeed = 560, jumpTimmer = 0;

var controls = {};

Game.L1 = function(game) {
  this.create = function() {
    this.setupMap();
    this.setupControls();
    this.setupPlayer();
  }

  this.update = function() {
    this.physics.arcade.collide(player, layer);

    this.keyPresses();
  }

  this.setupMap = function() {
    map = this.add.tilemap("L1Map", 64, 64);
    map.addTilesetImage("L1Tileset");

    layer = map.createLayer(0);
    layer.resizeWorld();

    map.setCollision([0, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }

  this.setupPlayer = function() {
    this.physics.arcade.gravity.y = 1400;

    player = this.add.sprite(100, 200, "miner");
    this.physics.enable(player);

    player.body.collideWorldBounds = true;
    this.camera.follow(player);

    this.playerAnimations();

    map.setTileIndexCallback(2, this.mine, this);
  }

  this.playerAnimations = function() {
    player.animations.add("mine", [27, 28, 29], 5, false);
    player.animations.add("run", [24, 25, 26], 3, true); // also for "jump" animation
    player.animations.add("idel", [24], 1, true);
  }

  this.setupControls = function() {
    controls = {
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR) // mine!
    }
  }

  this.keyPresses = function() {
    player.body.velocity.x = 0;384
    if(controls.space.isDown) {
      player.animations.play("mine");
    }

    if(controls.right.isDown) {
      player.scale.setTo(1, 1);
      player.animations.play("run");
      player.body.velocity.x +=  playerSpeed;
    }

    if(controls.left.isDown) {
      player.scale.setTo(-1, 1);
      player.animations.play("run");
      player.body.velocity.x -=  playerSpeed;
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimmer) {
      console.log("hi");
      player.animations.play("run");
      player.body.velocity.y = -600;
      jumpTimmer = this.time.now + 750;
    }

    if(player.body.velocity.x === 0 && player.body.velocity.y === 0 && !controls.space.isDown) {
      player.animations.play("idel");
    }
  }

  this.mine = function() {
    if(controls.space.isDown) {
      map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));
    }
    map.setCollision([0, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }
}

