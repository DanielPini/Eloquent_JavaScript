export class Overworld {
  bg = new Image();
  bgLoaded = false;
  vHeight = 600;

  constructor(bgUrl: string) {
    this.bg.src = bgUrl;
    this.bg.onload = () => (this.bgLoaded = true);
  }

  render(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    player: any,
  ) {
    const scale = canvas.height / this.vHeight;
    const vWidth = canvas.width / scale;
    const cameraX = vWidth / 2 - (player.x + player.width / 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(scale, scale);

    // Parallax Background
    if (this.bgLoaded) {
      ctx.drawImage(this.bg, -660 + player.x * -0.5, 0, 3600, this.vHeight);
    }

    // World Objects
    ctx.save();
    ctx.translate(cameraX, 0);
    player.draw(ctx);
    ctx.restore();

    ctx.restore();
  }
}
