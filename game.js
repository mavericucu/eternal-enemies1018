'use strict'

function Game(canvasElement) {
  this.player = null;
  this.enemies = [];
  this.canvasElement = canvasElement;
  this.initialPositionPlayer = {
    x: 0,
    y: this.canvasElement.height / 2
  }
  this.gameIsOver = false;
}

Game.prototype.start = function() {

  this.ctx = this.canvasElement.getContext('2d');

  this.startLoop();
}

Game.prototype.startLoop = function() {

  this.player = new Player(this.canvasElement, this.initialPositionPlayer);
  this.enemies.push(new Enemy(this.canvasElement));

  this.handleKeyUp = function(event) {
    if (event.key === 'ArrowUp') {
      this.player.setDirection(-1);
    } else if (event.key === 'ArrowDown') {
      this.player.setDirection(1);
    }
  }.bind(this)
  
  document.addEventListener('keyup', this.handleKeyUp);

  var loop = function() {

    if (Math.random() > 0.97) {
      this.enemies.push(new Enemy(this.canvasElement));
    }

    this.checkAllCollisions();
    this.updateAll();
    this.clearAll();
    this.drawAll();

    if (!this.gameIsOver) {
      requestAnimationFrame(loop);
    }

  }.bind(this);

  loop();
}

Game.prototype.updateAll = function() {
  this.player.update();
  this.enemies.forEach(function(enemy) {
    enemy.update();
  })
  
}

Game.prototype.clearAll = function() {
  this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

  this.enemies = this.enemies.filter(function(enemy) {
    return enemy.isInCanvas();
  });
}

Game.prototype.drawAll = function() {
  this.player.draw();
  this.enemies.forEach(function(enemy) {
    enemy.draw();
  })
}

Game.prototype.checkAllCollisions = function() {
  this.enemies.forEach(function(enemy, index) {
    if (this.player.collidesWithEnemy(enemy)) {
      this.player.lives--;
      this.lostLive(this.player.lives);
      this.enemies.splice(index, 1);

      if (!this.player.lives) {
        this.gameIsOver = true;
        this.finishGame();
      }
    }
  }.bind(this)); 
}

Game.prototype.onGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}

Game.prototype.onLiveLost = function(callback) {
  this.lostLive = callback;
}

Game.prototype.finishGame = function() {
  this.gameOverCallback();
}