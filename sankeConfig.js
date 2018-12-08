var s;
var scl = 20;
var food;
var count = 1;
var touch = 1;
var prevX = [];
var prevY = [];
var obstX = [];
var obstY = [];
var image1;
var image2;
const ctx = cvs.getContext("2d");

let imageName = new Image();
imageName.src= "diagram.png";

let foodImg = new Image();
foodImg.scr = "food.png";


//function preload()

image1 = loadImage ("diagram.png");



function setup() {
  
  createCanvas(400, 400)
  s = new Snake();
  frameRate(10);
  //food  = createVector(random(width), random(height));
  pickLocation();
  // console.log(food);
 // txt = createDiv('This is an HTML string!');
  //txt.position(50,50);
  
}

function pickLocation() {
  var col = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(col)), floor(random(rows)));
  food.mult(scl);
  for (var m = 0; m < obstX.length; m++) {
    if(obstX[m]==food.x && obstY[m]==food.y)
    {
      pickLocation();
    }
  } 
  // console.log(food);
}

function obstLocation() {
  var col = floor(width / scl);
  var rows = floor(height / scl);
  obst = createVector(floor(random(col)), floor(random(rows)));
  obst.mult(scl);
  for (var i = (s.x)-1; i <= (s.x)+1; i++) {
    for (var j = (s.y)-1; j <= (s.y)+1; j++) {
      if(obst.x==i && obst.y==j)
      {
        obstLocation();
      }
  }
  }
  for (var m = 0; m < obstX.length; m++) {
    if(obstX[m]==obst.x && obstY[m]==obst.y)
    {
      obstLocation();
    }
  }  
  // console.log(food);
}

function foodTouch() {

  if (s.x == food.x && s.y == food.y) {    
    obstLocation();
    obstX.push(obst.x);
    obstY.push(obst.y);
    return 1;    
  } else {
    return 0;
  }
}

function gameOver() {
  alert("Your game is over and score is : "+ obstX.length);
  document.location.reload();
}

function feed() {
  prevX.push(s.x);
  prevY.push(s.y);
  if (prevX.length > touch + 1) {
    prevX.shift(); //pop
    prevY.shift(); //pop  for MCBC game
  }
}


function draw() {
  var c = 0;
  background(111)
  //ctx.drawImage(imageName,0,0);
  s.update();

  fill(211, 60, 100);
  //ctx.drawImg(foodImg,500,500);
  rect(food.x, food.y, scl, scl);
  for (var m = 0; m < obstX.length; m++) {
    fill(255, 255, 0);
    rect(obstX[m], obstY[m], scl, scl);
  }
  var z = foodTouch();
  if (z == 1) {
    pickLocation();
    touch = touch + 1;
  }
  feed();
  s.showIt();
  fill

  /*if ((prevX.includes(s.x)) && (prevY.includes(s.y))) {
    for (var t = 3; t < prevX.length; t++) {
      if (prevX[t] == s.x) {
        if (prevY[t] == s.y) {
         // console.log(prevX[t] + " " + s.x + " " + prevY[t] + " " + s.y);

          c = c + 1;
          //console.log(c);
        }
          if (c > 1) {
          gameOver();
        }
      }

    }

  }*/
  if((obstX.includes(s.x)) && (obstY.includes(s.y)))
  {
    for (var m = 0; m < obstX.length; m++) {
      if(obstX[m]==s.x && obstY[m]==s.y)
      {
        gameOver();
      }
    } 
  }
}


function keyPressed() {
  var direction = s.getDir();
    
  if (keyCode === UP_ARROW) {
    //if(direction.ySpeed != 1){
    s.dir(0, -1);
    //}
  } else if (keyCode === DOWN_ARROW) {
    //if(direction.ySpeed != -1){
    s.dir(0, 1);
    //}
  } else if (keyCode === RIGHT_ARROW) {
    //if(direction.xSpeed !=-1){
    s.dir(1, 0);
    //}
  } else if (keyCode === LEFT_ARROW) {
    //if(direction.xSpeed !=1){
    s.dir(-1, 0);
    //}
  }
}

