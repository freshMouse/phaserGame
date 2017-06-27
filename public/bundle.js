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
    if (controls.space.isDown || controls.space.isDown && controls.right.isDown) {
      this.player.animations.play("mine");
      this.mineTile = map.map.getTileRight(0, Math.round(this.player.x / 64) - 1, Math.round(this.player.y / 64) - 1);
      if (this.mineTile.index === 2 || this.mineTile.index === 5 || this.mineTile.index === 6 || this.mineTile.index === 9 || this.mineTile.index === 10 || this.mineTile.index === 11) {
        this.mine(map);
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

    if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0 && !controls.space.isDown) {
      this.player.animations.play("idel");
    }
  };

  this.mine = function (map) {
    map.map.putTile(-1, this.mineTile.x, this.mineTile.y);
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
      space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR) // mine!
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

var Zombie = __webpack_require__(7);

module.exports = function (game, map, player) {
  this.housePos = { x: 10, y: 10 };
  this.setup = function () {
    this.house = game.add.sprite(this.housePos.x, this.housePos.y, "ememyHouse");
    game.physics.enable(this.house);
    this.house.collideWorldBounds = true;

    this.zombie = new Zombie(game, this.housePos.x, this.housePos.y, map, player);
    this.zombie.setup();
  };

  this.update = function () {
    game.physics.arcade.collide(this.house, map.layer);

    this.zombie.update();
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function Zombie(game, x, y, map, player) {
  this.speed = 300;
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
    alert("died");
    player.player.reset(100, 10);
  };
};

/***/ })
/******/ ]);