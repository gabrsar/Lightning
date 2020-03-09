let seed = new Date().getTime();
let step = 0;
let maxSteps = 80;
let run = true;

function setup() {
  frameRate(60);
  let width = window.innerWidth;
  let height = window.innerHeight;
  createCanvas(width, height);
  angleMode(DEGREES);

}

function getBranches(depth, rng) {

  if (depth < 20) {
    return 0.6 + (rng.quick() * 2);
  }
  if (depth < 70) {
    return 0.5 + (rng.quick() * 1.8);
  }

  return 0;

}

function raio(ttl, maxTtl, mySeed) {
  const depth = maxTtl - ttl;
  const rng = new Math.seedrandom(mySeed + depth);

  push();

  const spread = 25 + depth * 2;
  const angle = (rng.quick() * spread - spread / 2);
  let size = rng.quick() * 10;

  const branches = Math.floor(getBranches(depth, rng));

  if (depth === 0) {
    console.log('BRANCHES', branches);
  }

  rotate(angle);

  if (ttl > 0) {
    const color = Math.max(255 - (ttl * 4), 0);
    stroke(color);
  } else {
    size = 2;
    stroke(255, 255, 255);
    strokeWeight(3);
  }

  line(0, 0, size, 0);
  translate(size, 0);

  if (ttl > 0) {
    const newTtl = ttl - 1;
    for (let i = 0; i < branches; i++) {
      raio(newTtl, maxTtl, rng.quick());
    }
  }
  pop();
}

function mouseClicked() {
  run = !run;
  console.log('RUN', run);
}

function draw() {
  if (!run) {
    return;
  }
  if (step <= maxSteps) {
    background(0);

    stroke(255, 255, 255);
    translate(width / 2, 50);
    rotate(90);

    const steps = Math.min(step, maxSteps);

    raio(steps, steps, seed);
    step = step + 1;

  } else {
    seed = seed + 1;
    console.log(seed);
    step = 0;
  }
}