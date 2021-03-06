module.exports = function(game) {
  this.init = function() {
    this.input.maxPointers = 1;

    this.stage.disableVisibilityChange = true;
  }

  this.preload = function() {
    this.load.image("loadBar", "/assets/images/loadBar.png");
  }

  this.create = function() {
    this.stage.background = "#ffffff";

    this.state.start("Load");
  }
}
