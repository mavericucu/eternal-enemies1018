'use strict';

function Player (canvasElement, initialPosition) {
  this.x = initialPosition.x;
  this.y = initialPosition.y;
  this.size = 50;
  this.lives = 3;
  this.speed = 5;
  this.direction = 0;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Player.prototype.update = function () {
  if (this.y <= this.size / 2) {
    this.setDirection(1);
  }

  if (this.y >= this.canvasElement.height - this.size / 2) {
    this.setDirection(-1);
  }

  this.y += this.speed * this.direction;
};

Player.prototype.setDirection = function (direction) {
  this.direction = direction;
};

Player.prototype.draw = function () {
  this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size);
};

Player.prototype.collidesWithEnemy = function (enemy) {
  var collidesTop = enemy.y <= this.y + this.size;
  var collidesBottom = enemy.y + enemy.size >= this.y;
  var collidesRight = enemy.x <= this.x + this.size;

  return collidesRight && collidesBottom && collidesTop;
};
