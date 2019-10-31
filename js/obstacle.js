function random(from, to) {
  return Math.floor(from + Math.random()*(to - from));
}

class Obstacle {
  constructor() {
    this.w = 50;
    this.h = 50;

    this.x = W+this.w;
    this.y = random(0, H-this.h);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x,this.y, this.w,this.h);
  }

  hits(character) {
    return (
      (character.x+character.w >= this.x && character.x <= this.x+this.w) // ---|character|---
      &&
      (character.y <= this.y+this.h && character.y+character.h >= this.y)
    );
  }
}