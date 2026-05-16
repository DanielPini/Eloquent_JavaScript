"use strict";
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
class Character {
    constructor(height, width, x, y, speed) {
        this.gravity = 2;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    move(direction) {
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
