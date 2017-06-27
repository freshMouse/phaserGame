module.exports = function(game) {
  this.loadBar = null;

  this.preload = function() {
    this.loadBar = this.add.sprite(this.world.centerX, this.world.centerY, "loadBar");
    this.loadBar.anchor.setTo(0.5, 0.5);

    this.time.advanceTimming = true;

    this.load.setPreloadSprite(this.loadBar);

    this.loadAssets();

  }

  this.create = function() {
    this.state.start("L1");
  }

  this.loadAssets = function() {
    this.load.tilemap("L1Map", "/assets/L1Map.csv");
    this.load.image("L1Tileset", "/assets/tiles.png");

    this.load.spritesheet("miner", "/assets/miner.png", 32, 29.9);
  }
}
