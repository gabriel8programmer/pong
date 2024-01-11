
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

//consts
const WIDTH = $canvas.width;
const HEIGHT = $canvas.height;
const widthRect = 10;

//object
const ball = createRect(
    WIDTH / 2,
    HEIGHT / 2,
    widthRect,
    "yellow" 
);

const player1 = createRect(
    0, 
    HEIGHT / 2, 
    widthRect * 4, 
    "red"
);

const player2 = createRect(
    WIDTH - widthRect, 
    HEIGHT / 2, 
    widthRect * 4, 
    "blue"
);

//functions
function createRect(x, y, height, color) {
    return {
        x: x,
        y: y,
        width: widthRect,
        height: height,
        color: color
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

const drawGame = ()=> {
   
    clearScreen();
    //draw the ball
    drawRect(ball.x, ball.y, ball.width, ball.height, ball.color);

    //draw player 1
    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);

    //draw player 2
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);

}

const updateMovementBall = ()=> {

}

const checkColisionBallWithLimit = () => {

}

const checkColisionBallWithPlayer = () => {
    
}

const updateBall = () => {
    updateMovementBall();
    checkColisionBallWithLimit();
    checkColisionBallWithPlayer();
}

const updatePlayer1 = ()=> {

}

const updatePlayer2 = () => {

} 

const updateGame = () => {

    //update position of the ball
    updateBall();

    //update position of the player1
    updatePlayer1();

    //update position of the player2
    updatePlayer2();
}

const runGame = ()=> {
    drawGame();
    updateGame();
    //update the game
    requestAnimationFrame(runGame);
}

runGame();