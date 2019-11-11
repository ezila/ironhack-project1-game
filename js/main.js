let character;
let obstacles;
let points;

let mainSong = new Audio('audio/mainsound_hipjazz.mp3');
let pointSound = new Audio('audio/point_checked.wav');
let obstacleSound = new Audio('audio/bahh_degout.mp3');

const ctx = document.querySelector('#game-board canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;

function draw() {
  ctx.clearRect(0,0,W,H);
  
  // Personnage
  character.draw();

  // Obstacles
  if (pointCaught >= 15) {
    if (frames % 15 === 0) {
      var obstacle = new Obstacle();
      obstacles.push(obstacle);
    }
  } else if (pointCaught >= 8) {
      if (frames % 30 === 0) {
        var obstacle = new Obstacle();
        obstacles.push(obstacle);
      }
    } else {
      if (frames % 50 === 0) {
        var obstacle = new Obstacle();
        obstacles.push(obstacle);
      }
  }

  obstacles.forEach(function (obstacle) {
    obstacle.x -= 5; //vitesse
    obstacle.draw();
  });

  // Collision obstacle
  for (obstacle of obstacles) {
    if (obstacle.hits(character)) {
      console.log('crashed');
      gameover = true;
      obstacleSound.volume = 1;
      obstacleSound.play();
      gameOver();
    }
  }
  
  // Points
  if (frames % 50 === 0) {
    var point = new Point();
    points.push(point);
  }

  points.forEach(function (point) {
    point.x -= 3; //vitesse
    point.draw();
  });

  // Points attrapés
  for (point of points) {
    if (point.hits(character)) {
      console.log('+1');
      ++pointCaught;
      pointSound.volume = 1;
      pointSound.play();
      point.hidePoint();
    }
  }

  // Counter
  ctx.fillStyle = "black";
  ctx.font = "12px FR73 Pixel W00 Regular";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + pointCaught, 660, 20);
}

document.onkeydown = function (e) {
  if (!character) return;
  
  switch (e.keyCode) {
    case 38:
      // top
      character.moveTop();
      break;
    case 40:
      //bottom
      character.moveBottom();
      break;
  }
}


let raf;
let frames = 0;
function animLoop() {
  frames++;

  draw();
  
  if (!gameover) {
    raf = requestAnimationFrame(animLoop);
  }
}


function startGame() {
  gameover = false;
  pointCaught = 0;
  if (raf) {
    cancelAnimationFrame(raf);
  }

  character = new Character();
  obstacles = [];
  points = [];

  raf = requestAnimationFrame(animLoop);

  mainSong.volume = 0.2;
  mainSong.loop = true;
  mainSong.play();
}

function gameOver() {
  ctx.clearRect(0,50,W,H);
  //document.getElementById("game-board").style.display = 'none';
  document.getElementById("game-over").style.display = 'block';
  mainSong.pause();
  document.getElementById("over-button").onclick = function() {
    document.getElementById("game-over").style.display = 'none';
    document.getElementById("game-board").style.display = 'block';
    startGame();
  };
}

document.getElementById("start-button").onclick = function() {
  document.getElementById("remove-screen").style.display = 'none';
  startGame();
};

// auto start
//startGame();