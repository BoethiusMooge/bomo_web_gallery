let numLines = 150;
let angleStep;
let lineLength = 150;

function setup() {
    let myCanvas = createCanvas(600, 600);
    myCanvas.parent('cnvs');
    angleStep = 360 / numLines;
    background(240);
    strokeWeight(2);
}

function draw() {
    background(240, 240, 240, 25);
    translate(width / 2, height / 2);

    for (let i = 0; i < numLines; i++) {
        let currentAngle = radians(angleStep * i + frameCount);
        let x1 = cos(currentAngle) * lineLength;
        let y1 = sin(currentAngle) * lineLength;
        let x2 = cos(currentAngle + PI) * lineLength;
        let y2 = sin(currentAngle + PI) * lineLength;
        stroke(30, 30, 30, 200);
        line(x1, y1, x2, y2);
    }
}
