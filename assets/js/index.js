
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

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
        velocity: 1
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

}

const updateMovementBall = () => {
    //movement
    ball.x += (ball.velocity * ball.dx);
    ball.y += (ball.velocity * ball.dy);
}

const checkColisionBallWithLimit = () => {

    //test colision of the ball in y
    if (ball.y < 0 || ball.y > HEIGHT - ball.height){
        ball.dy *= -1;
    }

    //test colision of the ball in x
    if (ball.x < 0 || ball.x > WIDTH - ball.width){
        ball.dx *= -1;
    }

}

const checkColisionBallWithPlayer = () => {

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
    if (key.toString().toUpperCase() === p.keys[0].toUpperCase()){
        p.up = state;
    }
    //move down
    if (key.toString().toUpperCase() === p.keys[1].toUpperCase()){
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