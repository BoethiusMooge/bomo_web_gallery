function setup() {     
     let myCanvas = createCanvas(748, 748);
     myCanvas.parent('cnvs');
   }


const linesSettings = [
     {
          flowXY: function(t) {
               x = 5 * Math.sin(1 * t) + 3 * Math.sin(2 * t + Math.PI/3);
               y = 5 * Math.cos(1 * t) + 3 * Math.cos(3 * t + Math.PI/4);
               return [x, y];
          },

          linesColor: 'grey',
          numLines: 6,
          lineGapSize: 0.25,
          movementSpeed: 0.014,
          t: 0,
          flowDirection: 1,

          lowScaleFactor: 7,
          lowCenterX: 400,
          lowCenterY: 600,

          upScaleFactor: 16,
          upCenterX: 400,
          upCenterY: 200,
          upPhase: 0.27
     },
     {
          flowXY: function(t) {
               x = 5 + 2 * Math.sin(.7 * t);
               x = x * Math.sin(t);
               y = 3 + 2 * Math.sin(1.2 * t);
               y = y * Math.cos(t);
               return [x, y];
          },

          linesColor: 'white',
          numLines: 6,
          lineGapSize: 0.3,
          movementSpeed: 0.02,
          t: 0,
          flowDirection: -1,

          lowScaleFactor: 16,
          lowCenterX: 400,
          lowCenterY: 650,

          upScaleFactor: 48,
          upCenterX: 400,
          upCenterY: 250,
          upPhase: 0.27
     }
];

const glitchGap = 1;
const glitchGap2 = 2;
let isFlash = false;

function draw() {
  background(0);

  for (lineNum = 0; lineNum < linesSettings.length; lineNum++) {

     l = linesSettings[lineNum];

     for (i = 0; i < l.lineGapSize * l.numLines; i += l.lineGapSize) {

          isFlash = guessIfFlass(mouseIsPressed)

          if (!isFlash) {
               tLow = l.t + i;
               [lowX, lowY] = l.flowXY(tLow);
               lowX = lowX * l.lowScaleFactor + l.lowCenterX;
               lowY = lowY * l.lowScaleFactor + l.lowCenterY;

               tUp = l.t + l.upPhase + i;
               [upX, upY] = l.flowXY(tUp);
               upX = upX * l.upScaleFactor + l.upCenterX;
               upY = upY * l.upScaleFactor + l.upCenterY;
               
               // Main line
               strokeWeight(2)
               stroke(l.linesColor);
               line(lowX, lowY, upX, upY);
          }          
     }

     linesSettings[lineNum].t += l.movementSpeed * l.flowDirection
  }
}

function guessIfFlass(mouseIsPressed) {
     
     output = false;

     if (mouseIsPressed) {
          result = true;
     } else {
          result = false;
     }
     
     if (Math.random() > .05) {
          return result;
     } else {
          return !result;
     }
}