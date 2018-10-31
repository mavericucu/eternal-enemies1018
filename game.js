'use strict'

function Game(canvasElement) {
  this.player = null;
  this.enemies = [];
  this.canvasElement = canvasElement;
  this.initialPositionPlayer = {
    x: 0,
    y: this.canvasElement.height / 2
  }
}

Game.prototype.start = function() {

  this.ctx = this.canvasElement.getContext('2d');

  this.startLoop();
}

Game.prototype.startLoop = function() {

  this.player = new Player(this.canvasElement, this.initialPositionPlayer);

  this.handleKeyUp = function(event) {
    if (event.key === 'ArrowUp') {
      this.player.setDirection(-1);
    } else if (event.key === 'ArrowDown') {
      this.player.setDirection(1);
    }
  }.bind(this)
  
  document.addEventListener('keyup', this.handleKeyUp);

  var loop = function() {

    this.updateAll();
    this.clearAll();
    this.drawAll();

    requestAnimationFrame(loop);

  }.bind(this);

  loop();
}

Game.prototype.updateAll = function() {
  this.player.update();
  
}

Game.prototype.clearAll = function() {
  this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
}

Game.prototype.drawAll = function() {
  this.player.draw();

}

Game.prototype.onGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}