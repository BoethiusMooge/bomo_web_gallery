let myCanvas;

function setup() {
  myCanvas = createCanvas(400, 400);
  myCanvas.parent('cnvs');
  angleMode(DEGREES);
  noFill();
}

const numShapes = 10;
const shapeRadius = 100;
let rotationSpeed = 0.0;

function draw() {
  background(0);

  translate(width / 2, height / 2);

  for (let i = 0; i < numShapes; i++) {
    let shapeColor = color(255, 255, 255, 100);
    stroke(shapeColor);
    strokeWeight(2);

    push();
    let angle = (frameCount * rotationSpeed * (i % 2 === 0 ? 1 : -1)) + (360 / numShapes) * i;
    rotate(angle);
    let x = shapeRadius * cos(angle);
    let y = shapeRadius * sin(angle);
    polygon(x, y, shapeRadius, 6);
    pop();
  }
}

function polygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mouseWheel(event) {
  rotationSpeed += event.delta * 0.001;
}