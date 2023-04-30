const generalRatio = window.innerWidth > 500 ? 0.5 : .7;
const canvasWidth = 450 * generalRatio;

// Calculate canvasHeight based on the loaded image
function calculateCanvasHeight(img) {
     return (canvasWidth / img.width) * img.height;
}

// Common function to resize image
function resizeImage(img, canvasWidth, canvasHeight) {
     img.resize(canvasWidth, canvasHeight);
}

// Sketch 1
const sketch1 = (p) => {
     let img;
     p.preload = () => {
          img = p.loadImage('../../assets/glass_portrait.jpg');
     }

     p.setup = () => {
          canvasHeight = calculateCanvasHeight(img);

          p.createCanvas(canvasWidth, canvasHeight);
          resizeImage(img, canvasWidth, canvasHeight);

          const pixelSize = 30 * generalRatio;

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
          canvasHeight = calculateCanvasHeight(img);

          p.createCanvas(canvasWidth, canvasHeight);
          resizeImage(img, canvasWidth, canvasHeight);

          p.background(255);
          let tileSize = 20 * generalRatio;

          for (let col = tileSize; col < img.width; col += tileSize) {
               for (let row = tileSize; row < img.height; row += tileSize) {

                    let c = img.get(col, row);
                    let b = p.brightness(c);

                    // Draw circles
                    let circleSize = p.map(b, 0, 255, tileSize, 0);
                    p.fill('black');
                    p.circle(col, row, circleSize);

                    // Draw lines connecting the circles
                    p.strokeWeight(1);
                    p.stroke('black');
                    if (col + tileSize < img.width) {
                         p.line(col, row, col + tileSize, row);
                    }
                    if (row + tileSize < img.height) {
                         p.line(col, row, col, row + tileSize);
                    }
               }
          }
     };
};

// Sketch 3
const sketch3 = (p) => {
     let img;
     p.preload = () => {
          img = p.loadImage('../../assets/glass_portrait.jpg');
     }

     p.setup = () => {
          canvasHeight = (canvasWidth / img.width) * img.height;

          p.createCanvas(canvasWidth, canvasHeight);

          img.resize(canvasWidth, canvasHeight);

          p.background(255);
          let tileSize = 15 * generalRatio;
          p.strokeWeight(1);

          for (let col = 0; col < img.width; col += tileSize) {
               for (let row = 0; row < img.height - tileSize; row += tileSize) {

                    let c = img.get(col, row);
                    let b = p.brightness(c);
                    let angle = p.map(b, 0, 255, 0, p.PI);

                    // Draw radial lines
                    let x1 = col + tileSize / 2;
                    let y1 = row + tileSize / 2;
                    let x2 = x1 + tileSize / 2 * p.cos(angle);
                    let y2 = y1 + tileSize / 2 * p.sin(angle);

                    p.stroke(c);
                    p.line(x1, y1, x2, y2);
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
          canvasHeight = calculateCanvasHeight(img);

          p.createCanvas(canvasWidth, canvasHeight);
          resizeImage(img, canvasWidth, canvasHeight);

          p.background(255);
          let tileSize = 35 * generalRatio;

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

function openModal(textIndex) {

     let hiddenText = chooseText(textIndex);

     let modal = document.getElementById("modal");
     let modalText = document.getElementById("modal-text");
     if (modalText) {
          modalText.innerHTML = hiddenText;
          modal.style.display = "block";
     } else {
          console.log("Error: modal-text div not found");
     }
}

function closeModal() {
     let modal = document.getElementById("modal");
     modal.style.display = "none";
}

function chooseText(textIndex) {
     switch (textIndex) {
          case 'txt-cnvs1':
               return `<p><span style="font-weight: bolder;">Fragmented Echoes</span>:
               This artwork deconstructs a portrait into a grid
               of squares with varying sizes, inviting viewers to consider the
               layers of our personalities and the balance between individuality
               and conformity.</p>`;
          case 'txt-cnvs2':
               return `<p><span style="font-weight: bolder;">Connecting Threads</span>:
               Building on the structure of the original artwork, this piece adds
               lines to connect the circles, representing the connections between
               individuals and the diverse experiences and backgrounds we all
               share.</p>`;
          case 'txt-cnvs3':
               return `<p><span style="font-weight: bolder;">Whispers of Identity</span>:
               An organic, flowing pattern created by applying Perlin noise
               represents the portrait, symbolizing the ever-changing, fluid nature
               of our identities and the intricate interplay of forces that shape
               our sense of self.</p>`;
          case 'txt-cnvs4':
               return `<p><span style="font-weight: bolder;">Shifting Perspectives</span>:
               A portrait reinterpretation through a series of rotated rectangles,
               symbolizing the ever-changing nature of our identities as we
               navigate the complexities of life.The connecting lines between the
               rectangles represent the unbroken thread of our experiences,
               reminding us that while our perspectives may shift and evolve, the
               essence of who we are remains constant.</p>`;
          default:
               return 'ERROR: No text found';
     }
}


