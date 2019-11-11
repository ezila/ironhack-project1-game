class Character {
  constructor() {
    const img = document.createElement('img');
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth/img.naturalHeight;

      this.sx = 0;
      this.sy = 0;

      this.sw = 50;
      this.sh = 88;

      this.w = 50;
      this.h = 88;

      this.x = 30;
      this.y = 225;
    }
    img.src = "images/sprite-character.png";
  }

  draw() {
    if (!this.img) return;
    //ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
  }

  moveTop() {
    this.y += -30;
    if (this.y < 30) {
      this.y = 30;
    }

    this.sx = 0;
  }

  moveBottom () {
    this.y += 30;
    if (this.y > 380) {
      this.y = 380;
    }

    this.sx = 50;
  }
}