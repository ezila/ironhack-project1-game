var tabPoints = ['images/raisin.png', 'images/tomate.png', 'images/pasteque.png', 'images/avocat.png'];

function random(from, to) {
  return Math.floor(from + Math.random()*(to - from));
}

class Point {
  constructor() {
    const img = document.createElement('img');
    img.onload = () => {
      this.img = img;

      this.w = 40;
      this.h = 40;

      this.x = W+this.w;
      this.y = random(0, H-this.h);
    }
    img.src = tabPoints[Math.floor(Math.random()*tabPoints.length)];
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

  hidePoint() {
    this.x = -50;
    this.y = -50;
  }
}