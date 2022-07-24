
const WIDTH = 640;
const HEIGHT = 480;
const SPEED = 2;


let posBall, dirBall, sizeBall, speedBall, rightBall, leftBall, downBall, upBall;
let posPlayer, dirPlayer, sizePlayer, upPlayer, downPlayer, speedPlayer;
let posCPU, dirCPU, sizeCPU, upCPU, downCPU, speedCPU;

//SCORES OF PLAYERS
let score = [0, 0];

let ball, player, CPU, screen, scorePlayer, scoreCPU;

function run(){
    addControlsForBall();
    addControlsForPlayer();
    addControlsForIA();
    moveBall();
    movePlayer();
    moveIA();
    update();
    let frame = requestAnimationFrame(run);
    return;
}

function definePropsOfObject(obj, size, color){
    obj.style.width = size[0]+"px";
    obj.style.height = size[1]+"px";
    obj.style.backgroundColor = color;
    return;
}

function addControlsForBall(){
    if ((posBall[0]+sizeBall[0] >= posCPU[0])
    && (posBall[1] < (posCPU[1] + sizeCPU[1]))
    && ((posBall[1] + sizeBall[1]) > posCPU[1])){
        rightBall = false;
        leftBall = true;
        speedBall+=0.2;
        speedCPU+=0.2;
    }
    else if ((posBall[0]-sizeBall[0] <= posPlayer[0])
    && (posBall[1] < (posPlayer[1] + sizePlayer[1]))
    && ((posBall[1] + sizeBall[1]) > posPlayer[1])){
        leftBall = false;
        rightBall = true;
        speedBall+=0.2;
        speedPlayer+=0.2;
    }
    else {
        if (posBall[0] > WIDTH){
            rightBall = false;
            leftBall = true;
            score[0]++;
            restart();
            
        }
        else if (posBall[0] < 0){
            rightBall = true;
            leftBall = false;
            score[1]++;
            restart();
        }
    }

    if (posBall[1] >= HEIGHT-sizeBall[1]){
        downBall = false;
        upBall = true;
    }
    if (posBall[1] <= 0){
        upBall = false;
        downBall = true;
    }
    return;
}

function addControlsForPlayer(){
    document.addEventListener("keydown", (function(event){
        let key = event.key;
        
        //TRY POSITION Y OF PLAYER
        switch (key){
            case "ArrowUp":
                upPlayer = true;
                break;
            case "ArrowDown":
                downPlayer = true;
                break;
        }
    }));
    document.addEventListener("keyup", (function(event){
        let key = event.key;

        if (key === "ArrowUp"){
            upPlayer = false;
        }
        if (key === "ArrowDown"){
            downPlayer = false;
        }
    }));
    return;
}

function addControlsForIA(){
    if (dirBall[0] >= 1){
        if ((posBall[1] + (sizeBall[1]/2) <= posCPU[1]+(sizeCPU[1]/2))
        && (posBall[0] + (sizeBall[0]/2) > WIDTH/2)){
            upCPU = true;
            downCPU = false;
        }
        if ((posBall[1] + (sizeBall[1]/2) >= posCPU[1]+(sizeCPU[1]/2))
        && (posBall[0] + (sizeBall[0]/2) > WIDTH/2)){
            downCPU = true;
            upCPU = false;
        }
    }
    else {
        if (posCPU[1] + (sizeCPU[1]/2) === HEIGHT/2){
            upCPU = false;
            downCPU = false;
        }
        else {
            if (posCPU[1] + (sizeCPU[1]/2) <= HEIGHT/2){
                upCPU = false;
                downCPU = true;
            }
            else if (posCPU[1] + (sizeCPU[1]/2) >= HEIGHT/2){
                downCPU = false;
                upCPU = true;
            }
        }
    }
    return;
}

function moveBall(){
    dirBall = [0, 0];
    if (rightBall){
        dirBall[0] += 1;
    }
    else if (leftBall){
        dirBall[0] += -1;
    }
    if (downBall){
        dirBall[1] += 1;
    }
    else if (upBall){
        dirBall[1] += -1;
    }
}

function movePlayer(){
    dirPlayer = [0, 0];
    if (upPlayer && posPlayer[1] > 1){
        dirPlayer[1] += -1;
    }
    if (downPlayer && posPlayer[1] <= HEIGHT-sizePlayer[1]-5){
        dirPlayer[1] += 1;
    }
    return;
}

function moveIA(){
    dirCPU = [0, 0];
    if (upCPU && posCPU[1] > 1){
        dirCPU[1] += -1;
    }
    else if (downCPU && posCPU[1] <= HEIGHT-sizeCPU[1]-5){
        dirCPU[1] += 1;
    }
    return;
}

function restart(){
    posBall = [Math.round(WIDTH/2) - sizeBall[0], Math.round(HEIGHT/2)];
    speedBall = SPEED;
    speedPlayer = SPEED;
    speedCPU = SPEED;
    return;
}

function update(){
    //DEFINE POSITIONS OF THE BALL
    ball.style.left = posBall[0]+"px";
    ball.style.top = posBall[1]+"px";
    //DEFINE POSITIONS OF THE PLAYER1
    player.style.left = posPlayer[0]+"px";
    player.style.top = posPlayer[1]+"px";
    //DEFINE POSITIONS OF THE PLAYER2
    CPU.style.left = posCPU[0]+"px";
    CPU.style.top = posCPU[1]+"px";
    //DEFINE SCORES
    scorePlayer.innerHTML = score[0];
    scoreCPU.innerHTML = score[1];
    //UPDATE STATE OF POSITIONS
    posBall[0] += Math.round(dirBall[0] * speedBall);
    posBall[1] += Math.round(dirBall[1] * speedBall);
    posPlayer[1] += Math.round(dirPlayer[1] * speedPlayer);
    posCPU[1] += Math.round(dirCPU[1] * speedCPU);
    return;
}

function start(){
    //INITIALIZE VARIABLES AND COMPONENTS
    speedBall = SPEED;
    speedPlayer = SPEED;
    speedCPU = SPEED;
    dirBall = [1, 1];
    dirPlayer = [0, 0];
    dirCPU = [0, 0];
    sizeBall = [14, 14];
    sizePlayer = [14, (14*4)];
    sizeCPU = [14, (14*4)];
    upPlayer = false;
    downPlayer = false;
    upCPU = false;
    downCPU = false;
    rightBall = true;
    downBall = true;
    leftBall = false;
    upBall = false;
    //INITIALIZE POSITIONS OF BALL, PLAYER1 AND CPU
    posBall = [Math.round(WIDTH/2) - sizeBall[0], Math.round(HEIGHT/2)];
    posPlayer = [5, Math.round(HEIGHT/2) - Math.round(sizePlayer[1]/2)];
    posCPU = [WIDTH-20, Math.round(HEIGHT/2) - Math.round(sizeCPU[1]/2)];
    //INITIALIZE COMPONENTS
    screen = document.getElementById("screen");
    ball = document.getElementById("ball");
    player = document.getElementById("player1");
    CPU = document.getElementById("player2");
    scorePlayer = document.getElementById("scorePlayer1");
    scoreCPU = document.getElementById("scorePlayer2");
    //FUNCTIONS
    definePropsOfObject(screen, [WIDTH, HEIGHT], "black");
    definePropsOfObject(ball, [sizeBall[0], sizeBall[1]], "yellow");
    definePropsOfObject(player, [sizePlayer[0], sizePlayer[1]], "blue");
    definePropsOfObject(CPU, [sizeCPU[0], sizeCPU[1]], "red");
    run();
    return;
}

window.addEventListener("load", start);
