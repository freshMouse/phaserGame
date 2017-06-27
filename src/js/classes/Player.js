module.exports = function(game) {
  this.speed = 400;
  this.jumpTimmer = 0;

  this.setup = function() {
    game.physics.arcade.gravity.y = 1400;

    this.player = game.add.sprite(100, 200, "miner");
    game.physics.enable(this.player);

    this.player.body.collideWorldBounds = true;
    game.camera.follow(this.player);

    this.playerAnimations();
  }

  this.playerAnimations = function() {
    this.player.animations.add("mine", [27, 28, 29], 5, false);
    this.player.animations.add("run", [24, 25, 26], 3, true); // also for "jump" animation
    this.player.animations.add("idel", [24], 1, true);
  }

  this.update = function(map) {
    game.physics.arcade.collide(this.player, map.layer);

    this.player.body.velocity.x = 0;
    if(controls.space.isDown || controls.space.isDown && controls.right.isDown) {
      this.player.animations.play("mine");
      this.mineTile = map.map.getTileRight(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64) - 1); 
      if(this.mineTile.index === 2 || this.mineTile.index === 5 || this.mineTile.index === 6 ||  this.mineTile.index === 9 || this.mineTile.index === 10 || this.mineTile.index === 11   ) {
        this.mine(map);
      }
    }

    if(controls.right.isDown) {
      this.player.scale.setTo(1, 1);
      this.player.animations.play("run");
      this.player.body.velocity.x += this.speed;
    }

    if(controls.left.isDown) {
      this.player.scale.setTo(-1, 1);
      this.player.animations.play("run");
      this.player.body.velocity.x -=  this.speed;
    }

    if(controls.up.isDown && (this.player.body.onFloor() || this.player.body.touching.down) && game.time.now > this.jumpTimmer) {
      this.player.animations.play("run");
      this.player.body.velocity.y = -600;
      jumpTimmer = game.time.now + 750;
    }

    if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0 && !controls.space.isDown) {
      this.player.animations.play("idel");
    }
  }

  this.mine = function(map) {
    map.map.putTile(-1, this.mineTile.x, this.mineTile.y);
  }
}
