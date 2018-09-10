// Variables
var canvaswidth = 500;
var canvasheight = 800;
var RowArray, HintArray, SecretRowArray;

var posBArray = [];
var GuessArray = [];
var PatternArray = [];
var CheckHintArray = [];
var textArray = ["s", "r", "v", "g", "b", "w"];


var MaxGuessLine = 0, MaxLine = 5, MaxGuess = 10, MaxGuessArray = 0;
var posGx = 195, posGy = 126-30, posGd = 20;
var won = false, lost = false;

const colors = {
        "s": [0, 0, 0],
        "r": [255, 0, 0],
        "v": [255, 0, 255],
        "g": [0, 255, 0],
        "b": [0, 0, 255],
        "w": [255,255,255],
      };

// Setup
function setup() {
  createCanvas(canvaswidth, canvasheight);
  init();

  var button = createButton("Start New Game");
  button.position(200, 400);
  button.mousePressed(function(){
        resetSketch();
        button.remove();
    });
}

// Draw
function draw() {
}

function init(){
  fill(200,200,200,127);
  background(100,0,0);
  textSize(40);
  text("MasterMind",145,45);
}


// Functions
function keyPressed(){
  if (key === 'S'){
    value = colors.s;
    GuessLine(posGx,posGy,posGd,value);
  }
  else if (key === 'R'){
    value = colors.r;
    GuessLine(posGx,posGy,posGd,value);
  }
  else if (key == 'V'){
    value = colors.v;
    GuessLine(posGx,posGy,posGd,value);
  }
  else if (key == 'G'){
    value = colors.g;
    GuessLine(posGx,posGy,posGd,value);
  }
  else if (key == 'B'){
    value = colors.b;
    GuessLine(posGx,posGy,posGd,value);
  }
  else if (key == 'W'){
    value = colors.w;
    GuessLine(posGx,posGy,posGd,value);
  }
  else {
    return false;
  }
}


function DrawBall(x,y,d,v){
  this.x = x; 
  this.y = y; 
  this.d = d; 
  this.v = v; 

  this.display = function() {
    push();
    fill(this.v);
    ellipse(this.x, this.y, this.d, this.d);
    pop();
  };
}


function GuessLine(x,y,d,v){
  this.x = x;
  this.y = y;
  this.d = d;
  this.v = v;

  if ((GuessArray.length == 0) && (MaxGuessArray < MaxGuess)){
    GuessArray[0] = new DrawBall(this.x,this.y,this.d,this.v);
    GuessArray[0].display();
  } 
  if ((GuessArray.length < MaxLine) && (MaxGuessArray < MaxGuess)){
    GuessArray[MaxGuessLine] = new DrawBall(this.x,this.y,this.d,this.v);
    GuessArray[MaxGuessLine].display();
  } 
  if (GuessArray.length >= MaxLine){
    if (MaxGuessArray >= 0){
      CheckGuess(GuessArray,PatternArray);
    }
    MaxGuessArray +=1;
    posGy += 50;
    posGx = 195-25;
    MaxGuessLine = -1;
    GuessArray = [];
  }
  MaxGuessLine += 1;
  posGx += 25;
  if ((MaxGuessArray >= MaxGuess)){
    text("You lost",200,700);
    endGame(lost);
  }
}


function SecretRow(x,y,dx,dy,posx,posy,d){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.posx = posx;
  this.posy = posy;
  this.d = d;
  this.col = colors.w;

  this.display = function() {
    rect(this.x, this.y, this.dx, this.dy);
    for (var i = 0; i < 5; i ++) {
      push();
      fill(this.col);
      ellipse(this.posx,this.posy,this.d,this.d);
      this.posx = this.posx + 25;
      pop();
    }
  };
}

function Row(x,y,dx,dy,posx,posy,d,nr){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.posx = posx;
  this.posy = posy;
  this.d = d; 
  this.nr = nr;
  this.col = colors.w;
  
  this.display = function() {
    for (var i = 0; i < this.nr; i++) {
    rect(this.x,this.y,this.dx,this.dy);
      for (var j = 0; j < 5; j ++) {
        push();
        fill(this.col);
        ellipse(this.posx,this.posy,this.d,this.d);
        this.posx = this.posx + 25;
        pop();
      }
      this.y = this.y + 50;
      this.posy = this.posy + 50;
      this.posx = posx;
    }
  };
}

//var textArray = ["s", "r", "v", "g", "b", "w"];
function CreatePattern(x,y,d){
  this.x = x;
  this.y = y;
  this.d = d;
  
  for (var i = 0; i < MaxLine; i++){
    this.v = colors[textArray[int(random(0,5))]];
    PatternArray[i] = new DrawBall(this.x,this.y,this.d,this.v);
    PatternArray[i].display();
    this.x += 25;
  }
}

function createBalls() {
  posBy = 140-40;
  posBx = 40;
  r = [0, 255, 255, 0, 0, 255];
  g = [0, 0, 0, 255, 0, 255];
  b = [0, 0, 255, 0, 255, 255];
  
  for (var i = 0; i < 6; i++) {
    fill(r[i], g[i], b[i], 127);
    for  (var j = 0; j < 20; j++) {
      ellipse(posBx, posBy, 20, 20);
      textSize(25);
      text(textArray[i],posBx+40,posBy+7);
    }
    posBArray.push(posBy);
    posBy = posBy + 40;
  }
}

function CheckGuess(GArray, PArray){
  CheckHintArray = [];
  Count = 0;
  CheckX = 365;
  CheckY = (MaxGuessArray*50) + (126-30);

  if ((GArray.length != PArray.length)){
    text("Error: Unequal length",200,600);
  }
  if ((GArray.length == PArray.length)){
    //var nrequal = 0;
    //text("Equal length",180,600);
    for (var i = 0; i <= 4; i++){
      var nrequal = 0;
      if ((GArray[i].v == PArray[i].v)){
        //text("Equal element nr." + 1,200,650);
        CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.g);
        CheckHintArray[i].display();
        CheckX += 25;
        Count += 1;
      }
      else {
        for (var j = 0; j <= 4; j++){
          if (((GArray[i].v == PArray[j].v)) && (nrequal == 0)){
            CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.v);
            CheckHintArray[i].display();
            nrequal += 1;
          }
        }
      CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
      //CheckHintArray[i].display();
      CheckX += 25;
      }
    }
    if (Count == 5){
      won = true;
      push();
      textSize(50);
      text("You Won!", 140, 700);
      pop();
      endGame(won);
    }
  }
}


function endGame(wonGame){
    gameOver = true;
    posGx = 196;
    posGy = 126-30-50;
    MaxGuessLine = 0, MaxLine = 5, MaxGuess = 10;
    MaxGuessArray = -1;
    CheckHintArray = [];
    Count = 0;
    CheckX = 365;
    CheckY = 126-30;

    //replay button
    var button = createButton((wonGame ? "You Won!" : "You Lost") + " Click to play again.");
    button.position(166, 710);
    button.mousePressed(function(){
        button.remove();
        resetSketch();
    });
}


function resetSketch(){
  // Draw Board;
  background(100,0,0);
  textSize(40);
  text("MasterMind",145,45);
  var MaxGuessLine = 0, MaxLine = 5, MaxGuess = 10, MaxGuessArray = 0;
  var posGx = 195, posGy = 126-30, posGd = 20;

  // Draw Rows
  SecretRowArray = new SecretRow(180,760,130,30,195,776,20);
  SecretRowArray.display();

  RowArray = new Row(180,110-30,130,30,195,126-30,20,MaxGuess);
  RowArray.display();

  HintArray = new Row(350,115-30,130,20,365,126-30,10,MaxGuess);
  HintArray.display();

  // Create Pattern
  CreatePattern(195,776,20);

  //Draw Illustrative Balls
  Balls = createBalls();

  //Present Guesses
  for (var i = 0; i = GuessArray.length; i++){
    GuessArray[i].display();
  }

  if (keyIsPressed === true){
    keyPressed();
  }
}


