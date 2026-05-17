import { Direction, KeyState } from "./types";

export class Character {
  sprite: HTMLImageElement;
  isLoaded = false;
  facing: "Left" | "Right" = "Left";

  vy = 0;
  gravity = 2.3;
  isJumping = false;
  jumpCount = 0;
  floorY = 550;

  constructor(
    public height: number,
    public width: number,
    public x: number,
    public y: number,
    public speed: number,
    imgUrl: string,
    public maxJumps: number = 2,
  ) {
    this.sprite = new Image();
    this.sprite.src = imgUrl;
    this.sprite.onload = () => (this.isLoaded = true);
  }

  jump() {
    // Consolidated jump logic: Check against jumpCount vs maxJumps
    if (this.jumpCount < this.maxJumps) {
      this.vy = -1.8 * this.speed;
      this.isJumping = true;
      this.jumpCount++;
      console.log("Jumped", this.jumpCount);
    }
  }

  move(direction: Direction) {
    // move() is now exclusively for horizontal and ducking logic
    switch (direction) {
      case "Left":
        this.x -= this.speed;
        this.facing = "Left";
        break;
      case "Right":
        this.x += this.speed;
        this.facing = "Right";
        break;
      case "Down":
        // Logic for ducking could go here
        break;
    }
  }

  handleUpdate(currentKeys: KeyState) {
    // 1. Process continuous horizontal movement
    if (currentKeys.a) this.move("Left");
    if (currentKeys.d) this.move("Right");

    // 2. Apply Gravity & Physics
    this.vy += this.gravity;
    this.y += this.vy;

    // 3. Ground Collision
    if (this.y > this.floorY - this.height) {
      this.y = this.floorY - this.height;
      this.vy = 0;
      this.isJumping = false;
      this.jumpCount = 0; // Reset double jump
    }

    // 4. World Boundaries (Optional: allows 5000px of travel)
    if (this.x < -2000) this.x = -2000;
    if (this.x > 5000) this.x = 5000;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.isLoaded) return;
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (this.facing === "Right") ctx.scale(-1, 1);
    ctx.drawImage(
      this.sprite,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
    );
    ctx.restore();
  }
}
