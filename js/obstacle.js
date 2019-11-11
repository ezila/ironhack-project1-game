var tabObstacles = ['images/crevette.png', 'images/steak.png', 'images/poulet.png'];

function random(from, to) {
  return Math.floor(from + Math.random()*(to - from));
}

class Obstacle {
  constructor() {
    const img = document.createElement('img');
    img.onload = () => {
      this.img = img;

      this.w = 40;
      this.h = 40;

      this.x = W+this.w;
      this.y = random(0, H-this.h);
    }
    img.src = tabObstacles[Math.floor(Math.random()*tabObstacles.length)];
  }

  draw() {
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  hits(character) {
    return (
      (character.x+character.w >= this.x && character.x <= this.x+this.w) // ---|character|---
      &&
      (character.y <= this.y+this.h && character.y+character.h >= this.y)
    );
  }
}