const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

type Direction = "Up" | "Down" | "Left" | "Right";

class Character {
  height;
  width;
  x;
  y;
  speed;
  gravity: number = 2;

  constructor(
    height: number,
    width: number,
    x: number,
    y: number,
    speed: number,
  ) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move(direction: Direction) {
    const s = this.speed;
    direction == "Up"
      ? (this.y -= s)
      : direction == "Down"
        ? (this.y += s)
        : direction == "Left"
          ? (this.x -= s)
          : (this.y += s);
    console.log("Moved", direction);
  }
}
