// const canvasWidth = 800;
// const canvasHeight = 600;

const canvasRatio = 600 / 800;
const canvasWidth = window.innerWidth * 0.5;
const canvasHeight = canvasWidth * canvasRatio;

const linesRatio = canvasWidth / 800;
const lineSpacing = 10 * linesRatio;

const lineHeights = {
  first: 45 * (canvasHeight / 600),
  last: canvasHeight - (45 * (canvasHeight / 600)),
};

const lines = [
  { start: 15 * linesRatio, length: 120 * linesRatio },
  { start: null, length: 50 * linesRatio },
  { start: null, length: 300 * linesRatio },
  { start: null, length: 35 * linesRatio },
  { start: null, length: 230 * linesRatio },
];

function calculateLineStarts() {
  for (let i = 1; i < lines.length; i++) {
    lines[i].start = lines[i - 1].start + lines[i - 1].length + lineSpacing;
  }
}

function setup() {
  calculateLineStarts();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("cnvs");
}

function drawLines(mouseY) {
  const sinOffset = mouseY * sin(mouseY) + canvasHeight / 2;

  line(lines[0].start, lineHeights.first, lines[0].start + lines[0].length, mouseY);
  line(lines[1].start, mouseY, lines[1].start + lines[1].length, mouseY);
  line(lines[2].start, mouseY, lines[2].start + lines[2].length, sinOffset);
  line(lines[3].start, sinOffset, lines[3].start + lines[3].length, sinOffset);
  line(lines[4].start, sinOffset, lines[4].start + lines[4].length, lineHeights.last);
}

function draw() {
  if (mouseY >= 0 && mouseY <= canvasHeight) {
    drawLines(mouseY);
  }
}