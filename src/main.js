var Boot = require("./js/states/Boot");
var Load = require("./js/states/Load");
var L1 = require("./js/states/L1");

var conf = {
  width: window.innerWidth,
  height: window.innerHeight,

  renderer: Phaser.AUTO
}
var game = new Phaser.Game(conf);

game.state.add("Boot", Boot, true);
game.state.add("Load", Load);
game.state.add("L1", L1);


