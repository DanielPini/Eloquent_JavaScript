"use strict";
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(vector) {
        return new Vec(this.x + vector.x, this.y + vector.y);
    }
    minus(vector) {
        return new Vec(this.x - vector.x, this.y - vector.y);
    }
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}
const vec1 = new Vec(100, 50);
console.log("Vec1", vec1.x, vec1.y);
console.log("Vec1 length", vec1.length);
const vec2 = new Vec(77, -22);
vec1.minus(vec2);
console.log("Vec1 after modification", vec1.x, vec1.y);
console.log("Vec1 length", vec1.length);
