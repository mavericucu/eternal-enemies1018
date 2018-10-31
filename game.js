'use strict'

function Game(canvasElement) {
  this.player = null;
  this.enemies = [];
  this.canvasElement = canvasElement;
}

Game.prototype.start = function() {

  this.ctx = this.canvasElement.getContext('2d');

  this.startLoop();
}

Game.prototype.startLoop = function() {

  setTimeout(function() {
    this.gameOverCallback();
  }.bind(this), 3000)

}

Game.prototype.onGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}