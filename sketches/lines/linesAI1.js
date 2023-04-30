// Circle properties
const circleCount = 300; // Increase the number of circles for a larger pattern
const minRadius = 20;
const maxRadius = minRadius * 5; // Increase the maximum radius for larger circles
const noiseScale = 0.02;

// Canvas size
const canvasX = 350;
const canvasY = canvasX;

function setup() {
  const canvas = createCanvas(canvasX, canvasY);
  canvas.parent("cnvs");
  background(255);
  noFill();
}

function draw() {
  background(255);
  translate(canvasX / 2, canvasY / 2);
  stroke(0);
  strokeWeight(1);

  for (let i = 0; i < circleCount; i++) {
    const angle = map(i, 0, circleCount, 0, 720); // 720 degrees for a more intertwined pattern
    const radius = map(noise(i * noiseScale, frameCount * noiseScale), 0, 1, minRadius, maxRadius);
    const x = radius * cos(angle);
    const y = radius * sin(angle);

    // Draw the current circle
    ellipse(x, y, radius * 2, radius * 2);

    // Draw a line to the next circle
    if (i < circleCount - 1) {
      const nextAngle = map(i + 1, 0, circleCount, 0, 720);
      const nextRadius = map(noise((i + 1) * noiseScale, frameCount * noiseScale), 0, 1, minRadius, maxRadius);
      const nextX = nextRadius * cos(nextAngle);
      const nextY = nextRadius * sin(nextAngle);
      line(x, y, nextX, nextY);
    }
  }
}