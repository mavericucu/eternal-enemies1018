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


  var loop = function() {
    
    this.updateAll();
    this.clearAll();
    this.drawAll();

    requestAnimationFrame(loop);

  }.bind(this);

  loop();
}

Game.prototype.updateAll = function() {

}

Game.prototype.clearAll = function() {

}

Game.prototype.drawAll = function() {

}

Game.prototype.onGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}