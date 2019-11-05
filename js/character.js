class Character {
  constructor() {
    const img = document.createElement('img');
    img.onload = () => {
      this.img = img;

      const imgRatio = img.naturalWidth/img.naturalHeight;

      this.w = 50;
      this.h = this.w/imgRatio;

      this.x = 30;
      this.y = 225;
    }
    img.src = "images/character.png";
  }

  draw() {
    if (!this.img) return;
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  moveTop() {
    this.y += -30;
    if (this.y < 30) {
      this.y = 30;
    }
  }

  moveBottom () {
    this.y += 30;
    if (this.y > 380) {
      this.y = 380;
    }
  }
}