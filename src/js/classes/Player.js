module.exports = function(game) {
  this.speed = 400;
  this.jumpTimmer = 0;

  this.inven = {
    stone: 0,
    sand: 0,
    diamond: 0,

    codeOrder: ["stoneCode", "sandCode", "diamondCode"],
    order: ["stone", "sand", "diamond"],

    stoneCode: 6,
    sandCode: 2,
    diamondCode: 5,

    index: 0,

    timmer: 100 
  };


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
    if(controls.space.isDown) {
      if(controls.left.isDown) {
        this.player.scale.setTo(-1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileLeft(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64));
        if(this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 ||  this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11   ) {
          this.mine(map);
        }
      }

      if(controls.right.isDown) {
        this.player.animations.play("mine");
        this.tile = map.map.getTileRight(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64));
        if(this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 ||  this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11   ) {
          this.mine(map);
        }
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

    if(controls.s.isDown) {
      if(controls.right.isDown) {
        this.player.scale.setTo(1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileRight(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64) + 1);
        if(this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 ||  this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11   ) {
          this.mine(map);
        }
      }

      if(controls.left.isDown) {
        this.player.scale.setTo(-1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileLeft(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64) + 1);
        if(this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 ||  this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11   ) {
          this.mine(map);
        }

      }
    }

    if(controls.w.isDown) {
      if(controls.right.isDown) {
        this.player.scale.setTo(1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileRight(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64) - 1);
        if(this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 ||  this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11   ) {
          this.mine(map);
        }
      }

      if(controls.left.isDown) {
        this.player.scale.setTo(-1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileLeft(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64) - 1);
        if(this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 ||  this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11   ) {
          this.mine(map);
        }
      }

    }

    if(controls.d.isDown) {
      if(controls.left.isDown) {
        this.tile = map.map.getTileLeft(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64));
        console.log(this.tile);
        this.place(map);
      }

      if(controls.right.isDown) {
        this.tile = map.map.getTileRight(0, Math.round(this.player.x/64) - 1, Math.round(this.player.y/64));
        this.place(map);
      } 
    }
    if(controls.a.isDown) {
      if(game.time.now > this.inven.timmer) {
       var max = this.inven.order.length;
        this.inven.index = (max + this.inven.index - 1) % max;
        this.text =  game.add.text(this.player.x + 10, this.player.y, this.inven.order[this.inven.index], { font: "32px Arial", fill: "#f26c4f", align: "left" });

        this.text.fixToCamera = true;
        this.inven.timmer += 2000;
      }
      var self = this;
      setTimeout(function() {
        self.text.destroy();
      }, 500);
    }

    if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0 && !controls.space.isDown) {
      this.player.animations.play("idel");
    }
  }

  this.mine = function(map) {
    switch(this.tile.index) {
      case 2:
        this.inven.sand++;
        break;
      case 5:
        this.inven.diamond++;
        break;
      case 6:
        this.inven.stone++;
        break;
      case 10:
        this.inven.iron++;
        break;
      default:
        break;
    }
    map.map.putTile(-1, this.tile.x, this.tile.y);
  }

  this.place = function(map) {
    var index = this.inven[this.inven.codeOrder[this.inven.index]];
    var blockNum = this.inven[this.inven.order[this.inven.index]];
    console.log(index, blockNum);
    if(blockNum !== 0) {
      console.log(this.tile);
      map.map.putTile(index, this.tile.x, this.tile.y);
      this.inven[this.inven.order[this.inven.index]]--;
    }
  }
};
