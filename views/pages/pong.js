var CanvasWidth = 700;
var CanvasHeight = 400;
var PaddleHeight = 100;
var PaddleWidth = 10;
var gameBallHeight = 10;
var ballSpeed = 3;
var LeftPaddle, RightPaddle, GameBall, button;
var gameBallInCourt = false;
var LeftScore = 0,
    RightScore = 0;
var speedSlider;
var Speed = 2;

function setup() {
    createCanvas(CanvasWidth, CanvasHeight)
    button = createButton("Play");
    button.mousePressed(resetGame);
    speedSlider = createSlider(1, 9, 4);
}

function resetGame() {
    gameBallInCourt = false;
    initializeGame();
}

function initializeGame() {
    LeftPaddle = new Paddle(0);
    RightPaddle = new Paddle(CanvasWidth - PaddleWidth);
    GameBall = new gameBall();
}

function draw() {
    background(170);
    Speed = speedSlider.value();
    drawScore();
    if (gameBallInCourt == true) {
        if (keyIsPressed == true) {
            keyPressed();
        }
        LeftPaddle.Update();
        RightPaddle.Update();
        GameBall.Update();
        LeftPaddle.Show();
        RightPaddle.Show();
        GameBall.Show();
    } else {
        fill(0);
        textSize(30);
        text("Q - Z", 10, 30);
        text("Up - Down", 550, 30);
        text("Use the slider to change paddle-speed", 100, 90);
        text("Press Play when you are ready", 100, 130);
    }
}

function drawScore() {
    textSize(40);
    fill(0);
    var s = LeftScore.toString() + ' - ' + RightScore.toString();
    text(s, CanvasWidth / 2 - 50, 30);
}

function keyPressed() {
    if (keyIsDown(DOWN_ARROW)) {
        RightPaddle.ySpeed = Speed;
    } else if (keyIsDown(UP_ARROW)) {
        RightPaddle.ySpeed = -Speed;
    }
    if (keyIsDown(90)) { //Key: Z
        LeftPaddle.ySpeed = Speed;
    } else if (keyIsDown(81)) { //Key: Q
        LeftPaddle.ySpeed = -Speed;
    }
}

function Paddle(location) {
    this.x = location;
    this.y = (CanvasHeight - PaddleHeight) / 2;
    this.ySpeed = 0;
    this.Update = function() {
        if (this.y >= CanvasHeight - PaddleHeight) {
            if (this.ySpeed == -Speed) {
                this.y = this.y + this.ySpeed;
            }
        } else if (this.y <= 0) {
            if (this.ySpeed == Speed) {
                this.y = this.y + this.ySpeed;
            }
        } else {
            this.y = this.y + this.ySpeed;
        }
    }
    this.Show = function() {
        fill(0);
        rect(this.x, this.y, PaddleWidth, PaddleHeight);
    }
}

function gameBall() {
    gameBallInCourt = true;
    this.x = CanvasWidth / 2;
    this.y = (CanvasHeight) / 2;
    this.ySpeed = ballSpeed;
    this.xSpeed = ballSpeed;
    
    this.Update = function() {
        if (this.CollideWithWalls()) {
            this.ySpeed = -this.ySpeed;
        } else if (this.CollideWithPaddle()) {
            this.changeSpeed();
        } else if (this.OutOfBounds()) {
            gameBallInCourt = false;
        }
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
    }
    this.changeSpeed = function() {
        if (this.CollideLeft()) {
            this.ySpeed = this.ySpeed - (LeftPaddle.y + PaddleHeight / 2 - this.y) / 20;
            this.xSpeed = -this.xSpeed;
        }
        if (this.CollideRight()) {
            this.ySpeed = this.ySpeed - (RightPaddle.y + PaddleHeight / 2 - this.y) / 20;
            this.xSpeed = -this.xSpeed;
        }
    }
    this.OutOfBounds = function() {
        if (this.x > (CanvasWidth)) {
            LeftScore++;
            return true;
        } else if (this.x < 0 - gameBallHeight) {
            RightScore++;
            return true;
        }
        return false;
    }
    this.CollideWithWalls = function() {
        if (this.y >= CanvasHeight - gameBallHeight || this.y <= 0) {
            return true;
        } else {
            return false;
        }
    }
    this.CollideWithPaddle = function() {
        return (this.CollideLeft() == true || this.CollideRight() == true)
    }
    this.CollideLeft = function() {
        if (this.x - gameBallHeight == 0 || this.x - gameBallHeight == 1) {
            return (this.y >= LeftPaddle.y && this.y <= LeftPaddle.y + PaddleHeight)
        }
    }
    this.CollideRight = function() {
        if (this.x == (CanvasWidth - gameBallHeight - PaddleWidth) || this.x == (CanvasWidth - gameBallHeight - PaddleWidth) + 1) {
            return (this.y >= RightPaddle.y && this.y <= RightPaddle.y + PaddleHeight)
        }
    }
    this.Show = function() {
        fill(255, 0, 0);
        rect(this.x, this.y, gameBallHeight, gameBallHeight);
    }
}