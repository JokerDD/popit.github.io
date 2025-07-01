var s;
var scl = 20;
var food;
var touch = 1;
var prevX = [];
var prevY = [];
var obstX = [];
var obstY = [];

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzY_vWm4sLQjJnwFoKEP32hiWdDY8ins5acTErD0mFCo5ZiNAw273gMsCfDBw3qdo71vA/exec";

function setup() {
  createCanvas(400, 400);
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  var col = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(col)), floor(random(rows)));
  food.mult(scl);
  for (var m = 0; m < obstX.length; m++) {
    if (obstX[m] == food.x && obstY[m] == food.y) {
      pickLocation();
    }
  }
}

function obstLocation() {
  var col = floor(width / scl);
  var rows = floor(height / scl);
  obst = createVector(floor(random(col)), floor(random(rows)));
  obst.mult(scl);

  for (var m = 0; m < obstX.length; m++) {
    if (obstX[m] == obst.x && obstY[m] == obst.y) {
      obstLocation();
      return;
    }
  }

  for (var i = s.x - scl; i <= s.x + scl; i += scl) {
    for (var j = s.y - scl; j <= s.y + scl; j += scl) {
      if (obst.x == i && obst.y == j) {
        obstLocation();
        return;
      }
    }
  }
}

function foodTouch() {
  if (s.x == food.x && s.y == food.y) {
    obstLocation();
    obstX.push(obst.x);
    obstY.push(obst.y);
    return true;
  }
  return false;
}

function gameOver() {
  let score = obstX.length;

  // ✅ Show score on canvas will remain
  // ✅ Also send to Google Sheets
  postScoreToGoogleSheets("Player1", score);

  // Show alert too if you want (optional)
  alert("Game Over! Your score: " + score);

  document.location.reload();
}

function feed() {
  prevX.push(s.x);
  prevY.push(s.y);
  if (prevX.length > touch + 1) {
    prevX.shift();
    prevY.shift();
  }
}

function draw() {
  background(111);

  s.update();

  fill(211, 60, 100);
  rect(food.x, food.y, scl, scl);

  fill(255, 255, 0);
  for (var m = 0; m < obstX.length; m++) {
    rect(obstX[m], obstY[m], scl, scl);
  }

  if (foodTouch()) {
    pickLocation();
    touch++;
  }

  feed();
  s.showIt();

  for (var m = 0; m < obstX.length; m++) {
    if (obstX[m] == s.x && obstY[m] == s.y) {
      gameOver();
    }
  }

  // ✅ Live score display inside canvas
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  document.getElementById("score-panel").innerText = "Score: " + obstX.length; //new changes : now it will display the result in new <div>
}

function keyPressed() {
  var direction = s.getDir();
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

// ✅ Send score to Google Sheets
function postScoreToGoogleSheets(name, score) {
  fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    body: new URLSearchParams({
      name: name,
      score: score
    })
  })
  .then(response => response.json())
  .then(data => console.log("Score saved:", data))
  .catch(error => console.error("Error:", error));
}
