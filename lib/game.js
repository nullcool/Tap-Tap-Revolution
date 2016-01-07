/*global Tap*/
(function(){
  if (typeof Tap === "undefined") {
    window.Tap = {};
  }

  var Game = Tap.Game = function() {
    this.dots = [];
    this.score = 0;
    this.lost = false;
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 650;
  Game.BG_COLOR = '#DDDDDD';


  Game.prototype.add = function (object) {
    this.dots.push(object);
  };

  Game.prototype.remove = function (object) {
    this.dots.splice(this.dots.indexOf(object), 1);
  };

  Game.prototype.addDot = function (color) {
    var dot = new Tap.MovingObject(color);
    this.add(dot);
  };

  Game.prototype.sendDot = function () {
    var num = Math.floor(Math.random() * 3);
    this.addDot(COLORS[num]);
  };

  var COLORS = {
    0: {
      color: window.BALLS[0],
      pos: [238, -18],
      vel: [-1.55,5],
      radius: 4,
      game: this
    },
    1: {
      color: window.BALLS[1],
      pos: [245, -18],
      vel: [-0.1,5],
      radius: 4,
      game: this
    },
    2: {
      color: window.BALLS[2],
      pos: [250, -18],
      vel: [1.3,5],
      radius: 4,
      game: this
    }
  };


  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    if (this.score > 0 ) {
      ctx.fillStyle = 'white';
      ctx.font = '24pt Arial';
      ctx.textAlign = 'left';
      ctx.fillText(this.score, 25, 50);
      // ctx.fillRect(35, 545, 80, 75);
      // ctx.fillRect(210, 545, 80, 75);
      // ctx.fillRect(390, 545, 80, 75);
    }
    this.score += 1;
    this.dots.forEach(function (object) {
      if (object.out()) {
        this.lost = true;
      } else {
        object.draw(ctx);
      }
    }.bind(this));
  };

  Game.prototype.lose = function (ctx) {
    document.getElementById('music').load();
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = 'white';
    ctx.font = '24pt Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.score, 250, 150);
    ctx.fillText('You let a ball past...', 250, 250);
    ctx.font = '30pt Arial';
    ctx.fillText('You Lose!', 250, 350);
    ctx.font = '24pt Arial';
    ctx.fillText('Press Space to Restart', 250, 450);
  };


  Game.prototype.step = function (delta) {
    this.moveObjects(delta);
  };

  Game.prototype.moveObjects = function (delta) {
  this.dots.forEach(function (object) {
    object.move(delta);
  });
};

Game.prototype.keyPressed = function (e) {
  if (e.keyCode === 37){
    this.dots.forEach(function(dot){
      if (dot.redSaved()){
        this.remove(dot);
      }
    }.bind(this));
  } else if (e.keyCode === 40) {
    this.dots.forEach(function(dot){
      if (dot.greenSaved()){
        this.remove(dot);
      }
    }.bind(this));
  } else if (e.keyCode === 39) {
    this.dots.forEach(function(dot){
      if (dot.blueSaved()){
        this.remove(dot);
      }
    }.bind(this));
  }
};

})();
