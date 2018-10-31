'use strict'

function Enemy(canvasElement) {
  this.size = 40;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
  this.x = this.canvasElement.width + 50;
  this.y = Math.floor(Math.random() * this.canvasElement.height);
}

Enemy.prototype.update = function() {
  this.x -= 5;
}

Enemy.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y - this.size / 2, this.size, this.size)
}

Enemy.prototype.isInCanvas = function() {
  return this.x > -this.size;  
}