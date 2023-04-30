const generalRatio = 0.60;

// Sketch 1
const sketch1 = (p) => {

     let img;
     p.preload = () => {
          img = p.loadImage('../../assets/glass_portrait.jpg');
     }

     p.setup = () => {
          canvasWidth = 450 * generalRatio;
          canvasHeight = (canvasWidth / img.width) * img.height;

          p.createCanvas(canvasWidth, canvasHeight);

          img.resize(canvasWidth, canvasHeight);

          const pixelSize = 15;

          p.noStroke();
          p.rectMode(p.CENTER);

          p.background(255);

          const offsetX = (canvasWidth - img.width) / 2;
          const offsetY = (canvasHeight - img.height) / 2;

          for (let x = 0; x < img.width; x += pixelSize) {
               for (let y = 0; y < img.height; y += pixelSize) {
                    let color = img.get(x, y);
                    let brightnessValue = p.brightness(color);

                    let newSize = p.map(brightnessValue, 0, 255, pixelSize * 1.5, 0);
                    p.fill(color);
                    p.rect(x + offsetX, y + offsetY, newSize, newSize);
               }
          }
     };
};


// Sketch 2
const sketch2 = (p) => {

     let img;
     p.preload = () => {
          img = p.loadImage('../../assets/glass_portrait.jpg');
     }

     p.setup = () => {
          canvasWidth = 470 * generalRatio;
          canvasHeight = (canvasWidth / img.width) * img.height;

          p.createCanvas(canvasWidth, canvasHeight);

          img.resize(canvasWidth, canvasHeight);

          p.background(255);
          let tileSize = 20;

          for (let col = tileSize; col < img.width - tileSize; col += tileSize) {
               for (let row = tileSize; row < img.height - tileSize; row += tileSize) {

                    let c = img.get(col, row);
                    let b = p.brightness(c);

                    // Draw circles
                    let circleSize = p.map(b, 0, 255, tileSize, 0);
                    p.fill('black');
                    p.circle(col, row, circleSize);

                    // Draw lines connecting the circles
                    p.strokeWeight(1);
                    p.stroke('black');
                    if (col + tileSize < img.width - tileSize) {
                         p.line(col, row, col + tileSize, row);
                    }
                    if (row + tileSize < img.height - tileSize) {
                         p.line(col, row, col, row + tileSize);
                    }
               }
          }
     };
};


// Sketch 2
const sketch3 = (p) => {

     let img;
     p.preload = () => {
          img = p.loadImage('../../assets/glass_portrait.jpg');
     }

     p.setup = () => {
          canvasWidth = 450 * generalRatio;
          canvasHeight = (canvasWidth / img.width) * img.height;

          p.createCanvas(canvasWidth, canvasHeight);

          img.resize(canvasWidth, canvasHeight);

          p.background(255);
          let tileSize = 30 * generalRatio;

          for (let col = 0; col < img.width - tileSize; col += tileSize) {
               for (let row = 0; row < img.height - tileSize; row += tileSize) {

                    let c = img.get(col, row);
                    let b = p.brightness(c);

                    // Map brightness to color
                    let polyColor = p.map(b, 0, 255, 0, 360);

                    // Draw polygons
                    p.noStroke();
                    p.fill(polyColor, 80, 70);
                    p.beginShape();
                    p.vertex(col, row);
                    p.vertex(col + tileSize, row);
                    p.vertex(col + tileSize, row + tileSize);
                    p.vertex(col, row + tileSize);
                    p.endShape(p.CLOSE);

                    // Draw connecting lines
                    p.strokeWeight(1);
                    p.stroke('black');
                    if (col + tileSize < img.width - tileSize) {
                         p.line(col + tileSize, row, col + 2 * tileSize, row + tileSize);
                    }
                    if (row + tileSize < img.height - tileSize) {
                         p.line(col, row + tileSize, col + tileSize, row + 2 * tileSize);
                    }
               }
          }
     };
};

// Sketch 4
const sketch4 = (p) => {
     let img;
     p.preload = () => {
         img = p.loadImage('../../assets/glass_portrait.jpg');
     }
 
     p.setup = () => {
         canvasWidth = 450 * generalRatio;
         canvasHeight = (canvasWidth / img.width) * img.height;
 
         p.createCanvas(canvasWidth, canvasHeight);
 
         img.resize(canvasWidth, canvasHeight);
 
         p.background(255);
         let tileSize = 15 * generalRatio;
 
         for (let col = 0; col < img.width - tileSize; col += tileSize) {
             for (let row = 0; row < img.height - tileSize; row += tileSize) {
 
                 let c = img.get(col, row);
                 let b = p.brightness(c);
 
                 // Map brightness to rotation angle
                 let rotationAngle = p.map(b, 0, 255, -p.PI / 4, p.PI / 4);
 
                 // Draw rotated rectangles
                 p.push();
                 p.translate(col + tileSize / 2, row + tileSize / 2);
                 p.rotate(rotationAngle);
                 p.noStroke();
                 p.fill(c);
                 p.rect(0, 0, tileSize, tileSize / 2);
                 p.pop();
 
                 // Draw connecting lines
                 p.strokeWeight(1);
                 p.stroke('black');
                 if (col + tileSize < img.width - tileSize) {
                     p.line(col + tileSize, row, col + 2 * tileSize, row);
                 }
                 if (row + tileSize < img.height - tileSize) {
                     p.line(col, row + tileSize, col, row + 2 * tileSize);
                 }
             }
         }
     };
 };
 


new p5(sketch1, 'cnvs1');
new p5(sketch2, 'cnvs2');
new p5(sketch3, 'cnvs3');
new p5(sketch4, 'cnvs4');
