'use strict'

function Player(canvasElement, initialPosition) {
  this.x = initialPosition.x;
  this.y = initialPosition.y;
  this.size = 50;
  this.lives = 3;
  this.speed = 5;
  this.direction = 0;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Player.prototype.update = function() {
  this.y += this.speed * this.direction;
}

Player.prototype.setDirection = function(direction) {
  this.direction = direction;
}

Player.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)

}