let img;
function preload() {
     img = loadImage('../../assets/glass_portrait.jpg');
}

const minTileSize = 14;
const maxTileSize = 37;
let tileSize = minTileSize;
let fr = 3;
let asc = true;

function setup() {
     canvasWidth = 450;
     canvasHeight = (canvasWidth / img.width) * img.height; 

     let myCanvas = createCanvas(canvasWidth, canvasHeight);
     myCanvas.parent('cnvs');

     img.resize(canvasWidth, canvasHeight)

     frameRate(fr);

     // Calculate values for normalization
     let brightnessOfPixels = [];
     for (let col = tileSize; col < img.width - tileSize; col+=tileSize) {
          for (let row = tileSize; row < img.height - tileSize; row+=tileSize) {
               
               let c = img.get(col, row);
               brightnessOfPixels.push(brightness(c));
          }
     }

     brightnessOfPixels.sort((a, b) => a - b);
     len = brightnessOfPixels.length

     globalThis.lowPercentile = brightnessOfPixels[Math.round(len * 0.20)];
     globalThis.highPercentile = brightnessOfPixels[Math.round(len * 0.80)];
     globalThis.brightRange = highPercentile - lowPercentile;
}

function draw() {
     background(255);

     // access each pixel
     let topCircleSize = Math.round(tileSize * 0.80);

     for (let col = tileSize; col < img.width - tileSize; col+=tileSize) {
          for (let row = tileSize; row < img.height - tileSize; row+=tileSize) {
               
               let c = img.get(col, row);
               let b = ((brightness(c) - lowPercentile) / brightRange) * 255;
               let circleSize = map(b, 0, 255, topCircleSize, 0);
               fill('black');
               circle(col, row, circleSize);
          }
     }

     if (tileSize < maxTileSize && asc) {
          tileSize ++;
          fr += .2  ;
     } else if (tileSize > minTileSize && asc === false) {
          tileSize --;
          fr -= .2;
     }

     if (tileSize >= maxTileSize) {
          asc = false;
     } else if (tileSize <= minTileSize) {
          asc = true;
     }

     frameRate(fr);     
}

