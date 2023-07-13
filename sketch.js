const c = {X:0,Y:0}, cx = {X:0,Y:0};
const initalEscapeVal = 5;
const escapeSteps = 2;
const escapeMaxVal = 35
let r,g,b,escapeRuns,randColor,vec = 1;
let factor,rfactor,gfactor,bfactor;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  frameRate(10);
  cnv.mousePressed(OnMousePress);
  reSetValues();
  escapeRuns = initalEscapeVal;  //start from 5 
  drawMandelbrot(-0.5,0,1);
}

function OnMousePress() {
  reSetValues();
}

function reSetValues() {  //color randomization for each new cycle. 
  randColor = random(0,1);
  factor = 1 / random(0.1,1);
    if (randColor >= 0.75) {
      rfactor = random(1,10);
      gfactor = random(1,10);
      bfactor = random(1,10);
    }
}

function draw() {
  background(0);
  escapeRuns += escapeSteps * vec; //increase by 2, max value of 35 then reduce by 2
  
  if (escapeRuns === initalEscapeVal) {
    reSetValues();
      vec = 1;
  } else if (escapeRuns === escapeMaxVal) vec = -1; //reverse the escapeRuns counter    
  drawMandelbrot(-0.5,0,1);
}

let eValue, pix;
function drawMandelbrot(xc,yc,zoom) {
  mDX = width; mDY = height;
  mStep = 2.0 / mDY / zoom;
  mX1 = xc - mStep * mDX / 2; 
  mY1 = yc + mStep * mDY / 2;
  
   loadPixels();
  for(var y = 0; y < mDY; y++)
    for(var x = 0; x < mDX; x++){  
      cx.X = mX1 + x * mStep;
      cx.Y = mY1 - y * mStep;     
      eValue = Escape(cx);
      pix = (x + y * width) * 4;      
      setColor();      
      pixels[pix + 0] = r;
      pixels[pix + 1] = g;
      pixels[pix + 2] = b;
      pixels[pix + 3] = 255;
    }
   updatePixels();
}

function setColor() {
  x = randColor;
  r = 0; g = 0; b = 0;
  switch(true) {
    case (x > 0 && x < 0.25):
      r = eValue * factor; 
      break;
    case (x > 0.25 && x < 0.5):
      g = eValue * factor; 
      break;
    case (x > 0.5 && x < 0.75):
      b = eValue * factor; 
      break;
    default:
      r = eValue * rfactor;
      g = eValue * gfactor;
      b = eValue * bfactor;
      break;      
  }
}

const z = {X:0,Y:0};
const z1 = {X:0,Y:0};
let normSq;

function Escape(c) {
  z.X = 0; z.Y = 0;
  for(var i = 1; i < escapeRuns; i++) {
    normSq = z.X * z.X + z.Y * z.Y;
    if (normSq > 4) return i*4;
    //z = z * z;
    z1.X = z.X; z1.Y = z.Y;
    
    z.X = z1.X * z1.X - z1.Y * z1.Y;
    z.Y = z1.X * z1.Y + z1.Y * z1.X;
    
    //z = z + c
    z.X = z.X + c.X;
    z.Y = z.Y + c.Y;    
  }
  return 0;
}