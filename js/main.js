let character;
let obstacles;
let gameover = false;

const ctx = document.querySelector('#game-board canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;

function draw() {
  ctx.clearRect(0,0,W,H);
  
  // Personnage
  character.draw();

  // Obstacles
  if (frames % 150 === 0) {
    var obstacle = new Obstacle();
    obstacles.push(obstacle);
  }

  obstacles.forEach(function (obstacle) {
    obstacle.x -= 2; //vitesse
    obstacle.draw();
  });

  // Collision obstacle
  for (obstacle of obstacles) {
    if (obstacle.hits(character)) {
      console.log('crashed');
      gameover = true;
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

  raf = requestAnimationFrame(animLoop);
}
startGame();