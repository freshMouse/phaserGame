module.exports = function Zombie(game, x, y, map, player) {
  this.speed = 300 + Math.random() * 50;
  this.jump = -500;

  this.jumpTimmer = 0;

  this.canMove = false;
  this.setup = function() {
    this.zombie = game.add.sprite(x, y, "zombie");
    game.physics.enable(this.zombie);
    this.zombie.collideWorldBounds = true;

    this.zombie.animations.add("walk", [35, 36, 37, 38], 4, true);
  }

  this.update = function() {
    game.physics.arcade.collide(this.zombie, map.layer);
    game.physics.arcade.collide(this.zombie, player.player, this.killPlayer);

    this.zombie.body.velocity.x = 0;

    if(this.zombie.body.onFloor()) {
      this.canMove = true;
    }

    if(this.canMove) {
      this.zombie.body.velocity.x += this.speed;
    }

    if(this.canMove && this.zombie.body.onFloor()) {
      this.zombie.body.velocity.y += this.jump;
    }
  }

  this.killPlayer = function() {
    location.reload();
  }
}
