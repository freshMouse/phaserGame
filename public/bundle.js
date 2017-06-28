/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function (game) {
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

  this.setup = function () {
    game.physics.arcade.gravity.y = 1400;

    this.player = game.add.sprite(100, 200, "miner");
    game.physics.enable(this.player);

    this.player.body.collideWorldBounds = true;
    game.camera.follow(this.player);

    this.playerAnimations();
  };

  this.playerAnimations = function () {
    this.player.animations.add("mine", [27, 28, 29], 5, false);
    this.player.animations.add("run", [24, 25, 26], 3, true); // also for "jump" animation
    this.player.animations.add("idel", [24], 1, true);
  };

  this.update = function (map) {
    game.physics.arcade.collide(this.player, map.layer);

    this.player.body.velocity.x = 0;
    if (controls.space.isDown) {
      if (controls.left.isDown) {
        this.player.scale.setTo(-1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileLeft(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64));
        if (this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 || this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11) {
          this.mine(map);
        }
      }

      if (controls.right.isDown) {
        this.player.animations.play("mine");
        this.tile = map.map.getTileRight(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64));
        if (this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 || this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11) {
          this.mine(map);
        }
      }
    }

    if (controls.right.isDown) {
      this.player.scale.setTo(1, 1);
      this.player.animations.play("run");
      this.player.body.velocity.x += this.speed;
    }

    if (controls.left.isDown) {
      this.player.scale.setTo(-1, 1);
      this.player.animations.play("run");
      this.player.body.velocity.x -= this.speed;
    }

    if (controls.up.isDown && (this.player.body.onFloor() || this.player.body.touching.down) && game.time.now > this.jumpTimmer) {
      this.player.animations.play("run");
      this.player.body.velocity.y = -600;
      jumpTimmer = game.time.now + 750;
    }

    if (controls.s.isDown) {
      if (controls.right.isDown) {
        this.player.scale.setTo(1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileRight(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64) + 1);
        if (this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 || this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11) {
          this.mine(map);
        }
      }

      if (controls.left.isDown) {
        this.player.scale.setTo(-1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileLeft(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64) + 1);
        if (this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 || this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11) {
          this.mine(map);
        }
      }
    }

    if (controls.w.isDown) {
      if (controls.right.isDown) {
        this.player.scale.setTo(1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileRight(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64) - 1);
        if (this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 || this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11) {
          this.mine(map);
        }
      }

      if (controls.left.isDown) {
        this.player.scale.setTo(-1, 1);
        this.player.animations.play("mine");
        this.tile = map.map.getTileLeft(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64) - 1);
        if (this.tile.index === 2 || this.tile.index === 5 || this.tile.index === 6 || this.tile.index === 9 || this.tile.index === 10 || this.tile.index === 11) {
          this.mine(map);
        }
      }
    }

    if (controls.d.isDown) {
      if (controls.left.isDown) {
        this.tile = map.map.getTileLeft(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64));
        console.log(this.tile);
        this.place(map);
      }

      if (controls.right.isDown) {
        this.tile = map.map.getTileRight(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64));
        this.place(map);
      }
    }
    if (controls.a.isDown) {
      if (game.time.now > this.inven.timmer) {
        var max = this.inven.order.length;
        this.inven.index = (max + this.inven.index - 1) % max;
        this.text = game.add.text(this.player.x + 10, this.player.y, this.inven.order[this.inven.index], { font: "32px Arial", fill: "#f26c4f", align: "left" });

        this.text.fixToCamera = true;
        this.inven.timmer += 2000;
      }
      var self = this;
      setTimeout(function () {
        self.text.destroy();
      }, 500);
    }

    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0 && !controls.space.isDown) {
      this.player.animations.play("idel");
    }
  };

  this.mine = function (map) {
    switch (this.tile.index) {
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
  };

  this.place = function (map) {
    var index = this.inven[this.inven.codeOrder[this.inven.index]];
    var blockNum = this.inven[this.inven.order[this.inven.index]];
    console.log(index, blockNum);
    if (blockNum !== 0) {
      console.log(this.tile);
      map.map.putTile(index, this.tile.x, this.tile.y);
      this.inven[this.inven.order[this.inven.index]]--;
    }
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Boot = __webpack_require__(2);
var Load = __webpack_require__(3);
var L1 = __webpack_require__(4);
var player = __webpack_require__(0);

var conf = {
  width: window.innerWidth,
  height: window.innerHeight,

  renderer: Phaser.AUTO
};
var game = new Phaser.Game(conf);

game.state.add("Boot", Boot, true);
game.state.add("Load", Load);
game.state.add("L1", L1);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (game) {
  this.init = function () {
    this.input.maxPointers = 1;

    this.stage.disableVisibilityChange = true;
  };

  this.preload = function () {
    this.load.image("loadBar", "/assets/images/loadBar.png");
  };

  this.create = function () {
    this.stage.background = "#ffffff";

    this.state.start("Load");
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (game) {
  this.loadBar = null;

  this.preload = function () {
    this.loadBar = this.add.sprite(this.world.centerX, this.world.centerY, "loadBar");
    this.loadBar.anchor.setTo(0.5, 0.5);

    this.time.advanceTimming = true;

    this.load.setPreloadSprite(this.loadBar);

    this.loadAssets();
  };

  this.create = function () {
    this.state.start("L1");
  };

  this.loadAssets = function () {
    this.load.tilemap("L1Map", "/assets/tilemaps/L1Map.csv");
    this.load.image("L1Tileset", "/assets/tiles/L1Set.png");

    this.load.spritesheet("miner", "/assets/spritesheets/miner.png", 32, 32.9);

    this.load.image("ememyHouse", "/assets/images/mushroom.png"); // the mushroom is the house
    this.load.spritesheet("zombie", "/assets/spritesheets/zombi.png", 32, 32);
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Player = __webpack_require__(0);
var Map = __webpack_require__(5);
var Ememy = __webpack_require__(6);

module.exports = function (game) {
  this.init = function () {
    this.player = new Player(this);
    this.map = new Map(this);
    this.ememy = new Ememy(this, this.map, this.player);
  };

  this.create = function () {
    this.map.setup();
    this.setupControls();
    this.player.setup();
    this.ememy.setup();
  };

  this.update = function () {
    this.player.update(this.map);
    this.ememy.update();
  };

  this.setupControls = function () {
    controls = {
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), // mine!
      s: this.input.keyboard.addKey(Phaser.Keyboard.S),
      w: this.input.keyboard.addKey(Phaser.Keyboard.W),
      d: this.input.keyboard.addKey(Phaser.Keyboard.D),
      a: this.input.keyboard.addKey(Phaser.Keyboard.A)
    };
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (game) {
  this.setup = function () {
    this.map = game.add.tilemap("L1Map", 64, 64);
    this.map.addTilesetImage("L1Tileset");

    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld();

    this.map.setCollision([0, 2, 3, 4, 5, 6, 7, 8, 9, 10], true, this.layer, true);
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var House = __webpack_require__(7);

module.exports = function (game, map, player) {
  this.houses = new Array(8);

  this.setup = function () {
    for (var i = 0; i < this.houses.length; i++) {
      this.houses[i] = new House(game, map, player);
      this.houses[i].setup();
    }
  };

  this.update = function () {
    for (var j = 0; j < this.houses.length; j++) {
      this.houses[j].update();
    }
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Zombie = __webpack_require__(8);

module.exports = function (game, map, player) {
  this.x = Math.random() * 5000;
  this.y = Math.random() === 0.5 ? -Math.random() * 100 : 100;

  this.zombies = new Array(5);

  this.house = game.add.sprite(this.x, this.y, "ememyHouse");

  this.setup = function () {
    game.physics.enable(this.house);
    this.house.collideWorldBounds = true;

    for (var i = 0; i < this.zombies.length; i++) {
      this.zombies[i] = new Zombie(game, this.x, this.y, map, player);
      this.zombies[i].setup();
    }
  };

  this.update = function () {
    game.physics.arcade.collide(this.house, map.layer);

    for (var i = 0; i < this.zombies.length; i++) {
      this.zombies[i].update();
    }
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function Zombie(game, x, y, map, player) {
  this.speed = 300 + Math.random() * 50;
  this.jump = -500;

  this.jumpTimmer = 0;

  this.canMove = false;
  this.setup = function () {
    this.zombie = game.add.sprite(x, y, "zombie");
    game.physics.enable(this.zombie);
    this.zombie.collideWorldBounds = true;

    this.zombie.animations.add("walk", [35, 36, 37, 38], 4, true);
  };

  this.update = function () {
    game.physics.arcade.collide(this.zombie, map.layer);
    game.physics.arcade.collide(this.zombie, player.player, this.killPlayer);

    this.zombie.body.velocity.x = 0;

    if (this.zombie.body.onFloor()) {
      this.canMove = true;
    }

    if (this.canMove) {
      this.zombie.body.velocity.x += this.speed;
    }

    if (this.canMove && this.zombie.body.onFloor()) {
      this.zombie.body.velocity.y += this.jump;
    }
  };

  this.killPlayer = function () {
    location.reload();
  };
};

/***/ })
/******/ ]);