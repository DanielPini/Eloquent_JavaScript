"use strict";
class Vec {
    x;
    y;
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
console.log("Vec2", vec2.x, vec2.y);
const vec3 = vec1.minus(vec2);
console.log("Vec3 length", vec3.length);
class Group {
    map;
    constructor() {
        this.map = new Map();
    }
    add(value) {
        if (this.map.has(value))
            return false;
        this.map.set(value, true);
    }
    delete(value) {
        if (this.map.has(value)) {
            this.map.delete(value);
            return true;
        }
        return false;
    }
    has(value) {
        this.map.has(value);
    }
    static from(values) {
        const newGroup = new Group();
        for (const value of values) {
            newGroup.add(value);
        }
        return newGroup;
    }
}
const groupie = new Group();
groupie.add(7);
groupie.add(6);
groupie.add(69);
groupie.add(7);
console.log(groupie.map.keys());
class GroupIterator {
    map;
    constructor(group) {
        this.map = group.map;
    }
    *[Symbol.iterator]() {
        for (const key of this.map.keys()) {
            yield key;
        }
    }
}
const iterableGroupie = new GroupIterator(groupie);
console.log(iterableGroupie.map.keys());
console.log("Iterable:", ...iterableGroupie);
