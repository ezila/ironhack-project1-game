let character;
let obstacles;
let points;
let gameover = false;
let pointCaught = 0;

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
  ctx.fillText("Points: " + pointCaught, 680, 20);
  
  // Personnage
  character.draw();

  // Obstacles
  if (frames % 80 === 0) {
    var obstacle = new Obstacle();
    obstacles.push(obstacle);
  }

  obstacles.forEach(function (obstacle) {
    obstacle.x -= 5; //vitesse
    obstacle.draw();
    if (pointCaught >= 200) {
      obstacle.x -= 7;
    } else if (pointCaught >= 400) {
      point.x -= 9;
    }
  });

  // Collision obstacle
  for (obstacle of obstacles) {
    if (obstacle.hits(character)) {
      console.log('crashed');
      gameover = true;
    }
  }
  
  // Points
  if (frames % 80 === 0) {
    var point = new Point();
    points.push(point);
  }

  points.forEach(function (point) {
    point.x -= 2; //vitesse
    point.draw();
    if (pointCaught >= 200) {
      point.x -= 4;
    } else if (pointCaught >= 400) {
      point.x -= 6;
    }
  });

  // Points attrapés
  for (point of points) {
    if (point.hits(character)) {
      console.log('+1');
      ++pointCaught;
      //ctx.clearRect(80,0,40,H);
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
  if (raf) {
    cancelAnimationFrame(raf);
  }

  character = new Character();
  obstacles = [];
  points = [];

  raf = requestAnimationFrame(animLoop);
}

document.getElementById("start-button").onclick = function() {
  document.getElementById("remove-screen").style.display = 'none';
  startGame();
};

// auto start
//startGame();