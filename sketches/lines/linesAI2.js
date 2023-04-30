// Canvas size
const canvasX = 400;
const canvasY = 330;

// Tree properties
const initialLength = 100;
const lengthDecay = 0.7;
const lineWidthDecay = 0.75;
const initialLineWidth = 8;
const noiseScale = 0.01;

function setup() {
  const canvas = createCanvas(canvasX, canvasY);
  canvas.parent("cnvs");
  angleMode(DEGREES);
  background(255);
  stroke(0);
}

function draw() {
  background(255);
  translate(canvasX / 2, canvasY);

  const angleRange = map(mouseX, 0, canvasX, 10, 60); // Control branching angle based on mouseX
  drawBranch(initialLength, initialLineWidth, angleRange);
}

function drawBranch(length, lineWidth, angleRange) {
  if (length < 2) {
    return;
  }

  // Draw the current branch
  strokeWeight(lineWidth);
  line(0, 0, 0, -length);
  translate(0, -length);

  // Apply Perlin noise to the branching angle for a more organic look
  const angleOffset = map(noise(frameCount * noiseScale), 0, 1, -angleRange / 2, angleRange / 2);

  // Draw branches for the next stage of life
  const newLength = length * lengthDecay;
  const newLineWidth = lineWidth * lineWidthDecay;

  push();
  rotate(-angleRange / 2 + angleOffset);
  drawBranch(newLength, newLineWidth, angleRange);
  pop();

  push();
  rotate(angleRange / 2 + angleOffset);
  drawBranch(newLength, newLineWidth, angleRange);
  pop();
}