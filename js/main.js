let character;
let obstacles;
let points;

const ctx = document.querySelector('#game-board canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;

function draw() {
  ctx.clearRect(0,0,W,H);

  // Counter
  ctx.fillStyle = "black";
  ctx.font = "12px FR73 Pixel W00 Regular";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Points: " + pointCaught, 660, 20);
  
  // Personnage
  character.draw();

  // Obstacles
  if (frames % 50 === 0) {
    var obstacle = new Obstacle();
    obstacles.push(obstacle);
  }

  obstacles.forEach(function (obstacle) {
    obstacle.x -= 5; //vitesse
    obstacle.draw();

    // if (pointCaught / 9 === 0) {
    //   ++obstacle.x;
    // }
  });

  // Collision obstacle
  for (obstacle of obstacles) {
    if (obstacle.hits(character)) {
      console.log('crashed');
      gameover = true;
      gameOver()
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

    // if (pointCaught >= 5) {
    //   point.x -= 4;
    // }
  });

  // Points attrapés
  for (point of points) {
    if (point.hits(character)) {
      console.log('+1');
      ++pointCaught;
      point.hidePoint();
    }
  }
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
}

function gameOver() {
  document.getElementById("game-board").style.display = 'none';
  document.getElementById("game-over").style.display = 'block';
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