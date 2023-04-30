function setup() {
     let myCanvas = createCanvas(400, 400);
     myCanvas.parent('cnvs');
     angleMode(DEGREES);
     noFill();
   }
   
   function draw() {
     background(0);
     translate(width / 2, height / 2);
     let numElements = 100;
     let radius = 120;
   
     for (let i = 0; i < numElements; i++) {
       let angle = map(i, 0, numElements, 0, 360);
       let x = radius * cos(angle);
       let y = radius * sin(angle);
       let circleSize = map(noise(i * 0.02 + frameCount * 0.008), 0, 1, 10, 100);
   
       if (i % 2 == 0) {
         stroke(255);
       } else {
         stroke(0);
       }
   
       strokeWeight(2);
       ellipse(x, y, circleSize, circleSize);
     }
   }
   