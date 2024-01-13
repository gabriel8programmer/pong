
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

//objects for score
const player1Score = document.querySelector("#player1Score");
const player2Score = document.querySelector("#player2Score");

//consts
const WIDTH = $canvas.width;
const HEIGHT = $canvas.height;
const widthRect = 10;

//objects (ball, players)
let ball, p1, p2;

const initGame = () => {

    //init object ball
    ball = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        width: widthRect,
        height: widthRect,
        color: "yellow",
        dx: 1,
        dy: -1,
        velocity: .5
    }

    //players
    const velocityDefault = 1;

    //init object player1
    p1 = {
        x: 0,
        y: HEIGHT / 2,
        width: widthRect,
        height: widthRect * 4,
        color: "red",
        dy: 0,
        velocity: velocityDefault,
        up: false,
        down: false,
        keys: ["W", "S"],
        score: 0,
    }

    //init object player2
    p2 = {
        x: WIDTH - widthRect,
        y: HEIGHT / 2,
        width: widthRect,
        height: widthRect * 4,
        color: "blue",
        dy: 0,
        velocity: velocityDefault,
        up: false,
        down: false,
        keys: ["ArrowUp", "ArrowDown"],
        score: 0,
    }

}

const clearScreen = () => {
    //update the color of the game
    ctx.fillStyle = "000";
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

const drawRect = (x, y, width, height, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

const drawGame = () => {

    //clear the screen for to draw again
    clearScreen();

    //draw the ball
    drawRect(ball.x, ball.y, ball.width, ball.height, ball.color);

    //draw player 1
    drawRect(p1.x, p1.y, p1.width, p1.height, p1.color);

    //draw player 2
    drawRect(p2.x, p2.y, p2.width, p2.height, p2.color);

    //draw score
    player1Score.innerText = p1.score;
    player2Score.innerText = p2.score;

}

const updateMovementBall = () => {
    //movement
    ball.x += (ball.velocity * ball.dx);
    ball.y += (ball.velocity * ball.dy);
}

const restartAll = () => {
    //restart ball
    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    ball.velocity = .5;
    ball.dx *= -1;

    //player1
    p1.y = HEIGHT / 2;
    p1.velocity = 1;

    //player2
    p2.y = HEIGHT / 2;
    p2.velocity = 1;
}

const incrementScore = (p) => {
    p.score++;
}

const checkBallExited = ()=> {

    //increment score
    if (ball.x < p1.x){
        restartAll();
        incrementScore(p2);
    } else if (ball.x > p2.x + p2.width){
        restartAll();
        incrementScore(p1);
    }
}

const checkColisionBallWithLimit = () => {

    //test colision of the ball in y
    if (ball.y < 0 || ball.y > HEIGHT - ball.height){
        ball.dy *= -1;
    }

    //check if the ball is exited
   checkBallExited();

}

const collidedWithPlayerInY = (p) => {
    return ball.x < p.x + p.width &&
           ball.x + ball.width > p.x &&
           ball.y < p.y + p.height &&
           ball.y + ball.height > p.y
}

const incrementVelocity = (obj, inc, limit) => {
    if (obj.velocity >= limit) return;
    obj.velocity += inc;
}

const checkColisionBallWithPlayer = () => {
    
    if (collidedWithPlayerInY(p1)){
        ball.dx *= -1;
        incrementVelocity(ball, .1, 3);
        incrementVelocity(p1, .5, 5);
    } else if (collidedWithPlayerInY(p2)){
        ball.dx *= -1;
        incrementVelocity(ball, .1, 3);
        incrementVelocity(p2, .5, 5);
    }

}

const updateBall = () => {

    updateMovementBall();
    checkColisionBallWithLimit();
    checkColisionBallWithPlayer();

}

const updateMovementPlayer = (p) => {

    if (p.up){
        p.dy -= 1;
    }
    if (p.down){
        p.dy += 1;
    }

    p.y += (p.velocity * p.dy);
}

const checkIfPlayerisInLimit = (p) => {

    //don't move the player in the limit top
    if (p.y < 0){
        p.up = false;
    }

    //don't move the player in the limit bottom
    if (p.y > HEIGHT - p.height){
        p.down = false;
    }

}

const updatePlayer = (p) => {
    p.dy = 0;

    updateMovementPlayer(p);
    checkIfPlayerisInLimit(p);
}

const updateGame = () => {

    //update position of the ball
    updateBall();

    //update position of the player1
    updatePlayer(p1);

    //update position of the p2
    updatePlayer(p2);
}

const runGame = () => {
    drawGame();
    updateGame();
    //update the game
    requestAnimationFrame(runGame);
}

const checkKeyPressedInPlayer = (key, p, state) => {

    //test keys player
    //move up
    if (key.toString().toUpperCase() === p.keys[0].toUpperCase() && p.y >= 0){
        p.up = state;
    }
    //move down
    if (key.toString().toUpperCase() === p.keys[1].toUpperCase() && p.y <= HEIGHT - p.height){
        p.down = state;
    }

}

//movement of the players
const movePlayer = (e) => {

    //get the key pressed
    const key = e.key;

    //test keys player1
    checkKeyPressedInPlayer(key, p1, true);
    //test keys player1
    checkKeyPressedInPlayer(key, p2, true);
}

const unMovePlayer = (e) => {

    //get the key pressed
    const key = e.key;

    //test keys player1
    checkKeyPressedInPlayer(key, p1, false);
    //test keys player1
    checkKeyPressedInPlayer(key, p2, false);

}

//events
document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", unMovePlayer);

initGame();
runGame();