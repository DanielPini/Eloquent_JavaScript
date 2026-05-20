class Box {
  #content: string[] = ["sieve"];
  locked = true;

  unlock() {
    this.locked = false;
  }
  lock() {
    this.locked = true;
  }

  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
}

const box = new Box();

const withBoxUnlocked = (func: () => void) => {
  if (box.locked) {
    box.unlock();
    try {
      func();
    } catch (e) {
      throw e;
    } finally {
      box.lock();
    }
  } else {
    try {
      func();
    } catch (e) {
      throw e;
    }
  }
};

withBoxUnlocked(() => {
  console.log(box.content);
});
console.log(box);
