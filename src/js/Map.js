module.exports = function(game) {
  this.setup = function() {
    this.map = game.add.tilemap("L1Map", 64, 64);
    this.map.addTilesetImage("L1Tileset");

    this.layer = this.map.createLayer(0);
    this.layer.resizeWorld();

    this.map.setCollision([0, 2, 3, 4, 5, 6, 7, 8, 9, 10], true, this.layer, true);

  }
}
