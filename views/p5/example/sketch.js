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

  var diff = 0;
  var testvar_s = 0;
  var testvar_r = 0;
  var testvar_v = 0;
  var testvar_g = 0;
  var testvar_b = 0;
  var testvar_w = 0;

  var nrGreen_G_s = 0;
  var nrGreen_P_s = 0;
  var nrGreen_G_r = 0;
  var nrGreen_P_r = 0;
  var nrGreen_G_v = 0;
  var nrGreen_P_v = 0;
  var nrGreen_G_g = 0;
  var nrGreen_P_g = 0;
  var nrGreen_G_b = 0;
  var nrGreen_P_b = 0;
  var nrGreen_G_w = 0;
  var nrGreen_P_w = 0;

  GtruefalseArray_s = [0,0,0,0,0];
  PtruefalseArray_s = [0,0,0,0,0];
  GtruefalseArray_r = [0,0,0,0,0];
  PtruefalseArray_r = [0,0,0,0,0];
  GtruefalseArray_v = [0,0,0,0,0];
  PtruefalseArray_v = [0,0,0,0,0];
  GtruefalseArray_g = [0,0,0,0,0];
  PtruefalseArray_g = [0,0,0,0,0];
  GtruefalseArray_b = [0,0,0,0,0];
  PtruefalseArray_b = [0,0,0,0,0];
  GtruefalseArray_w = [0,0,0,0,0];
  PtruefalseArray_w = [0,0,0,0,0];
  

  testArray_s =  [0,0,0,0,0];
  testArray_r =  [0,0,0,0,0];
  testArray_v =  [0,0,0,0,0];
  testArray_g =  [0,0,0,0,0];
  testArray_b =  [0,0,0,0,0];
  testArray_w =  [0,0,0,0,0];

  if ((GArray.length != PArray.length)){
    text("Error: Unequal length",200,600);
  }
  if ((GArray.length == PArray.length)){
    var nrequal = 0;
    //text("Success: Equal length",180,600);
    for (var i = 0; i <= 4; i++){
      //var nrequal = 0;
      // Default color: red
      CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
      CheckHintArray[i].display();

      // If correct place and color: green
      if ((GArray[i].v == PArray[i].v)){
        //text("Equal element nr." + 1,200,650);
        CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.g);
        CheckHintArray[i].display();
        CheckX += 25;
        Count += 1;
      }

      // If correct color, but wrong place: violet
      else {
        // some function checking number of wrong and correct placements for each color etc:
        switch (GArray[i].v){
          case colors.s:
          vs = colors.s;
          nrGreen_G_s = 0;
          nrGreen_P_s = 0;
          diff_s = 0;
          //text("Color S",200,600);
          // Create truefalsearrays:
          for (var k = 0; k <= 4; k++){
            if (vs === PArray[k].v){
              PtruefalseArray_s[k] = 1;
              nrGreen_P_s += 1;
            }
            if (vs === GArray[k].v){
              GtruefalseArray_s[k] = 1;
              nrGreen_G_s += 1;
            }
          }
          
          // Use/compare the truefalsearrays
          if ((nrGreen_G_s <= nrGreen_P_s)&&(nrGreen_P_s>=1)){
           // text("nrG smaller than nrP",200,600);
            for (var j = 0; j <= 4; j++){
              if (((GArray[i].v == PArray[j].v))){// && (nrequal === 0)){
                CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.v);
                //CheckHintArray[i].display();
                nrequal += 1;
              }
            }
          }
          else {
            //text("nrG larger than nrP",200,650);
            for (var o = 0; o <= 4; o++){
              testArray_s[o] = PtruefalseArray_s[o];
              if (((PtruefalseArray_s[o] === GtruefalseArray_s[o])&&(PtruefalseArray_s[o]===1))){
                testArray_s[o]=0;
                //text("1:testArray_s[o]"+testArray_s[0],200,700);
              }
              else {
                testArray_s[o] = PtruefalseArray_s[o];
                //text("2:testArray_s[o]"+testArray_s[0],200,700);
              }
            }
            testvar_s = testArray_s[0]+testArray_s[1]+testArray_s[2]+testArray_s[3]+testArray_s[4];
            //text("testvar_s:"+testvar_s,50,650);
            if (testvar_s == 0){
              //CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
              //CheckHintArray[i].display();
            }
            else {
              //text("testvar_s:"+testvar_s,50,650);
              //text("nrGreen_G_s:"+nrGreen_G_s,50,750);
              var ypos = 400;

              diff_s = testvar_s;
              
              for (var l = 0; l <= 4; l++){
                
                //text("1:diff_s:"+diff_s,50,ypos);
                if ((GtruefalseArray_s[l] === 1) && (diff_s > 0)){
                  //text("2:diff_s:"+diff_s,50,ypos+15);
                  CheckHintArray[l] = new DrawBall(CheckX,CheckY,10,colors.v);
                  //CheckHintArray[i].display();
                  diff_s = diff_s - 1;
                  ypos += 25;
                }
              }
              break;
            }
          }
          


          
          case colors.r:
          vs = colors.r;
          nrGreen_G_r = 0;
          nrGreen_P_r = 0;
          diff_r = 0;
          for (var k = 0; k <= 4; k++){
            if (vs === PArray[k].v){
              PtruefalseArray_r[k] = 1;
              nrGreen_P_r += 1;
            }
            if (vs === GArray[k].v){
              GtruefalseArray_r[k] = 1;
              nrGreen_G_r += 1;
            }
          }
          
          // Use/compare the truefalsearrays
          if ((nrGreen_G_r <= nrGreen_P_r)&&(nrGreen_P_r>=1)){
            //text("nrG smaller than nrP",200,600);
            for (var j = 0; j <= 4; j++){
              if (((GArray[i].v == PArray[j].v))){// && (nrequal === 0)){
                CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.v);
                //CheckHintArray[i].display();
                nrequal += 1;
              }
            }
          }
          else {
            //text("nrG larger than nrP",200,650);
            for (var o = 0; o <= 4; o++){
              testArray_r[o] = PtruefalseArray_r[o];
              if (((PtruefalseArray_r[o] === GtruefalseArray_r[o])&&(PtruefalseArray_r[o]===1))){
                testArray_r[o]=0;
                //text("1:testArray_r[o]"+testArray_r[0],200,700);
              }
              else {
                testArray_r[o] = PtruefalseArray_r[o];
                //text("2:testArray_r[o]"+testArray_r[0],200,700);
              }
            }
            testvar_r = testArray_r[0]+testArray_r[1]+testArray_r[2]+testArray_r[3]+testArray_r[4];
            //text("testvar_r:"+testvar_r,50,650);
            if (testvar_r == 0){
              //CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
              //CheckHintArray[i].display();
            }
            else {
              //text("testvar_r:"+testvar_r,50,650);
              //text("nrGreen_G_r:"+nrGreen_G_r,50,750);
              var ypos = 400;

              diff_r = testvar_r;
              
              for (var l = 0; l <= 4; l++){
                
                //text("1:diff_r:"+diff_r,50,ypos);
                if ((GtruefalseArray_r[l] === 1) && (diff_r > 0)){
                  //text("2:diff_r:"+diff_r,50,ypos+15);
                  CheckHintArray[l] = new DrawBall(CheckX,CheckY,10,colors.v);
                  //CheckHintArray[i].display();
                  diff_r = diff_r - 1;
                  ypos += 25;
                }
              }
              break;
            }
          }



          case colors.v:
          vs = colors.v;
          nrGreen_G_v = 0;
          nrGreen_P_v = 0;
          diff_v = 0;
          for (var k = 0; k <= 4; k++){
            if (vs === PArray[k].v){
              PtruefalseArray_v[k] = 1;
              nrGreen_P_v += 1;
            }
            if (vs === GArray[k].v){
              GtruefalseArray_v[k] = 1;
              nrGreen_G_v += 1;
            }
          }
          
          // Use/compare the truefalsearrays
          if ((nrGreen_G_v <= nrGreen_P_v)&&(nrGreen_P_v>=1)){
            //text("nrG smaller than nrP",200,600);
            for (var j = 0; j <= 4; j++){
              if (((GArray[i].v == PArray[j].v))){// && (nrequal === 0)){
                //CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.v);
                //CheckHintArray[i].display();
                nrequal += 1;
              }
            }
          }
          else {
            //text("nrG larger than nrP",200,650);
            for (var o = 0; o <= 4; o++){
              testArray_v[o] = PtruefalseArray_v[o];
              if (((PtruefalseArray_v[o] === GtruefalseArray_v[o])&&(PtruefalseArray_v[o]===1))){
                testArray_v[o]=0;
                //text("1:testArray_v[o]"+testArray_v[0],200,700);
              }
              else {
                testArray_v[o] = PtruefalseArray_v[o];
                //text("2:testArray_v[o]"+testArray_v[0],200,700);
              }
            }
            testvar_v = testArray_v[0]+testArray_v[1]+testArray_v[2]+testArray_v[3]+testArray_v[4];
            //text("testvar_v:"+testvar_v,50,650);
            if (testvar_v == 0){
              //CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
              //CheckHintArray[i].display();
            }
            else {
              //text("testvar_v:"+testvar_v,50,650);
              //text("nrGreen_G_v:"+nrGreen_G_v,50,750);
              var ypos = 400;

              diff_v = testvar_v;
              
              for (var l = 0; l <= 4; l++){
                
                //text("1:diff_v:"+diff_v,50,ypos);
                if ((GtruefalseArray_v[l] === 1) && (diff_v > 0)){
                  //text("2:diff_v:"+diff_v,50,ypos+15);
                  CheckHintArray[l] = new DrawBall(CheckX,CheckY,10,colors.v);
                  //CheckHintArray[i].display();
                  diff_v = diff_v - 1;
                  ypos += 25;
                }
              }
              break;
            }
          }



          case colors.g:
          vs = colors.g;
          nrGreen_G_g = 0;
          nrGreen_P_g = 0;
          diff_g = 0;
          for (var k = 0; k <= 4; k++){
            if (vs === PArray[k].v){
              PtruefalseArray_g[k] = 1;
              nrGreen_P_g += 1;
            }
            if (vs === GArray[k].v){
              GtruefalseArray_g[k] = 1;
              nrGreen_G_g += 1;
            }
          }
          
          // Use/compare the truefalsearrays
          if ((nrGreen_G_g <= nrGreen_P_g)&&(nrGreen_P_g>=1)){
            //text("nrG smaller than nrP",200,600);
            for (var j = 0; j <= 4; j++){
              if (((GArray[i].v == PArray[j].v))){// && (nrequal === 0)){
                CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.v);
                //CheckHintArray[i].display();
                nrequal += 1;
              }
            }
          }
          else {
            //text("nrG larger than nrP",200,650);
            for (var o = 0; o <= 4; o++){
              testArray_g[o] = PtruefalseArray_g[o];
              if (((PtruefalseArray_g[o] === GtruefalseArray_g[o])&&(PtruefalseArray_g[o]===1))){
                testArray_g[o]=0;
                //text("1:testArray_g[o]"+testArray_g[0],200,700);
              }
              else {
                testArray_g[o] = PtruefalseArray_g[o];
                //text("2:testArray_g[o]"+testArray_g[0],200,700);
              }
            }
            testvar_g = testArray_g[0]+testArray_g[1]+testArray_g[2]+testArray_g[3]+testArray_g[4];
            //text("testvar_g:"+testvar_g,50,650);
            if (testvar_g == 0){
              //CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
              //CheckHintArray[i].display();
            }
            else {
              //text("testvar_g:"+testvar_g,50,650);
              //text("nrGreen_G_g:"+nrGreen_G_g,50,750);
              var ypos = 400;

              diff_g = testvar_g;
              
              for (var l = 0; l <= 4; l++){
                
                //text("1:diff_g:"+diff_g,50,ypos);
                if ((GtruefalseArray_g[l] === 1) && (diff_g > 0)){
                  //text("2:diff_g:"+diff_g,50,ypos+15);
                  CheckHintArray[l] = new DrawBall(CheckX,CheckY,10,colors.v);
                  //CheckHintArray[i].display();
                  diff_g = diff_g - 1;
                  ypos += 25;
                }
              }
              break;
            }
          }



          case colors.b:
          vs = colors.b;
          nrGreen_G_b = 0;
          nrGreen_P_b = 0;
          diff_b = 0;
          for (var k = 0; k <= 4; k++){
            if (vs === PArray[k].v){
              PtruefalseArray_b[k] = 1;
              nrGreen_P_b += 1;
            }
            if (vs === GArray[k].v){
              GtruefalseArray_b[k] = 1;
              nrGreen_G_b += 1;
            }
          }
          
          // Use/compare the truefalsearrays
          if ((nrGreen_G_b <= nrGreen_P_b)&&(nrGreen_P_b>=1)){
            //text("nrG smaller than nrP",200,600);
            for (var j = 0; j <= 4; j++){
              if (((GArray[i].v == PArray[j].v))){// && (nrequal === 0)){
                CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.v);
                //CheckHintArray[i].display();
                nrequal += 1;
              }
            }
          }
          else {
            //text("nrG larger than nrP",200,650);
            for (var o = 0; o <= 4; o++){
              testArray_b[o] = PtruefalseArray_b[o];
              if (((PtruefalseArray_b[o] === GtruefalseArray_b[o])&&(PtruefalseArray_b[o]===1))){
                testArray_b[o]=0;
                //text("1:testArray_b[o]"+testArray_b[0],200,700);
              }
              else {
                testArray_b[o] = PtruefalseArray_b[o];
                //text("2:testArray_b[o]"+testArray_b[0],200,700);
              }
            }
            testvar_b = testArray_b[0]+testArray_b[1]+testArray_b[2]+testArray_b[3]+testArray_b[4];
            //text("testvar_b:"+testvar_b,50,650);
            if (testvar_b == 0){
              //CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
              //CheckHintArray[i].display();
            }
            else {
             // text("testvar_b:"+testvar_b,50,650);
              //text("nrGreen_G_b:"+nrGreen_G_b,50,750);
              var ypos = 400;

              diff_b = testvar_b;
              
              for (var l = 0; l <= 4; l++){
                
                //text("1:diff_b:"+diff_b,50,ypos);
                if ((GtruefalseArray_b[l] === 1) && (diff_b > 0)){
                  //text("2:diff_b:"+diff_b,50,ypos+15);
                  CheckHintArray[l] = new DrawBall(CheckX,CheckY,10,colors.v);
                  //CheckHintArray[i].display();
                  diff_b = diff_b - 1;
                  ypos += 25;
                }
              }
              break;
            }
          }



          case colors.w:
          vs = colors.w;
          nrGreen_G_w = 0;
          nrGreen_P_w = 0;
          diff_b = 0;
          for (var k = 0; k <= 4; k++){
            if (vs === PArray[k].v){
              PtruefalseArray_w[k] = 1;
              nrGreen_P_w += 1;
            }
            if (vs === GArray[k].v){
              GtruefalseArray_w[k] = 1;
              nrGreen_G_w += 1;
            }
          }
          
          // Use/compare the truefalsearrays
          if ((nrGreen_G_w <= nrGreen_P_w)&&(nrGreen_P_w>=1)){
            //text("nrG smaller than nrP",200,600);
            for (var j = 0; j <= 4; j++){
              if (((GArray[i].v == PArray[j].v))){// && (nrequal === 0)){
                CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.v);
                //CheckHintArray[i].display();
                nrequal += 1;
              }
            }
          }
          else {
            //text("nrG larger than nrP",200,650);
            for (var o = 0; o <= 4; o++){
              testArray_w[o] = PtruefalseArray_w[o];
              if (((PtruefalseArray_w[o] === GtruefalseArray_w[o])&&(PtruefalseArray_w[o]===1))){
                testArray_w[o]=0;
                //text("1:testArray_w[o]"+testArray_w[0],200,700);
              }
              else {
                testArray_w[o] = PtruefalseArray_w[o];
                //text("2:testArray_w[o]"+testArray_w[0],200,700);
              }
            }
            testvar_w = testArray_w[0]+testArray_w[1]+testArray_w[2]+testArray_w[3]+testArray_w[4];
            //text("testvar_w:"+testvar_w,50,650);
            if (testvar_w == 0){
              //CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
              //CheckHintArray[i].display();
            }
            else {
              //text("testvar_w:"+testvar_w,50,650);
              //text("nrGreen_G_w:"+nrGreen_G_w,50,750);
              var ypos = 400;

              diff_w = testvar_w;
              
              for (var l = 0; l <= 4; l++){
                
                //text("1:diff_w:"+diff_w,50,ypos);
                if ((GtruefalseArray_w[l] === 1) && (diff_w > 0)){
                  //text("2:diff_w:"+diff_w,50,ypos+15);
                  CheckHintArray[l] = new DrawBall(CheckX,CheckY,10,colors.v);
                  //CheckHintArray[i].display();
                  diff_w = diff_w - 1;
                  ypos += 25;
                }
              }
              break;
            }
          }
        }
      CheckX += 25;
      CheckHintArray[i].display();
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
    posGy = 126-30;
    MaxGuessLine = 0, MaxLine = 5, MaxGuess = 10;
    MaxGuessArray = 0;
    CheckHintArray = [];
    Count = 0;
    CheckX = 365;
    CheckY = (126-30);

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





// function CheckGuess(GArray, PArray){
//   CheckHintArray = [];
//   Count = 0;
//   CheckX = 365;
//   CheckY = (MaxGuessArray*50) + (126-30);

//   if ((GArray.length != PArray.length)){
//     text("Error: Unequal length",200,600);
//   }
//   if ((GArray.length == PArray.length)){
//     var nrequal = 0;
//     //text("Success: Equal length",180,600);
//     for (var i = 0; i <= 4; i++){
//       //var nrequal = 0;
//       if ((GArray[i].v == PArray[i].v)){
//         //text("Equal element nr." + 1,200,650);
//         CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.g);
//         CheckHintArray[i].display();
//         CheckX += 25;
//         Count += 1;
//       }
//       else {
//         for (var j = 0; j <= 4; j++){
//           if (((GArray[i].v == PArray[j].v))){// && (nrequal === 0)){
//             CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.v);
//             //CheckHintArray[i].display();
//             nrequal += 1;
//           }
//         }
//       CheckHintArray[i] = new DrawBall(CheckX,CheckY,10,colors.r);
//       //CheckHintArray[i].display();
//       CheckX += 25;
//       }
//     }
//     if (Count == 5){
//       won = true;
//       push();
//       textSize(50);
//       text("You Won!", 140, 700);
//       pop();
//       endGame(won);
//     }
//   }
// }



