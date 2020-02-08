function Pipe(up, down, x, y, speed) {
    this.up = up;
    this.down = down;
    // this.img_up = this.img_up;
    // this.img_down = this.img_down;
    this.x = x;
    this.y = y;
    // this.pipes = [pipes];
    this.speed = speed
    this.h = -(Math.random() * (imgs[2].height - 60) + 30);
}
