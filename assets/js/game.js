
class Game {

    constructor(game) {
        const { canvas, start, p1Score, p2Score } = game;
        this.canvas = canvas;
        this.btnStart = start;
        this.score = [p1Score, p2Score];
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        //utils
        this.tileSize = 10;
        this.running = false;
    }

    createRect = (x, y, w, h, c) => {
        return {
            x, y, w, h, c,

            render(ctx) {
                ctx.fillStyle = this.c;
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        }
    }

    init = () => {
        
        this.ctx = this.canvas.getContext("2d");

        //create objects of the game

        //ball
        this.ball = this.createRect(
            this.width / 2,
            this.height / 2,
            this.tileSize,
            this.tileSize,
            "#ff0"
        );

        this.ball.velocity = 1;
        this.ball.dx = 1;
        this.ball.dy = -1;
        this.ball.maxVel = 3;

        //init positions and speed
        this.ball.initX = this.ball.x;
        this.ball.initY = this.ball.y;
        this.ball.initVelocity = this.ball.velocity;

        //move ball
        this.ball.move = () => {
            this.ball.x += (this.ball.velocity * this.ball.dx);
            this.ball.y += (this.ball.velocity * this.ball.dy);
        }

        this.ball.changeDirY = ()=> {
            this.ball.dy *= -1;
        }

        this.ball.changeDirX = ()=> {
            this.ball.dx *= -1;
        }

        this.ball.isInLimit = ()=> {
            return this.ball.y < 0 || this.ball.y > this.height - this.ball.h;
        }

        this.ball.exitedScreen = ()=> {
            return this.ball.x > this.width || this.ball.x < -this.ball.w;
        }

        this.ball.checkPosition = () => {
            if (this.ball.isInLimit()){
                this.ball.changeDirY();
            }
        } 

        //check if there was a collision with a player
        this.ball.hitPlayer = (p)=> {
            return (
                this.ball.x < p.x + p.w &&
                this.ball.x + this.ball.w > p.x &&
                this.ball.y <= p.y + p.h &&
                this.ball.y + this.ball.h >= p.y
            );
        }

        //reset for ball
        this.ball.reset = ()=> {
            this.ball.x = this.ball.initX;
            this.ball.y = this.ball.initY;
            this.ball.velocity = this.ball.initVelocity;
        }

        //create the function for to update the ball
        this.ball.update = () => {
            this.ball.move();
            this.ball.checkPosition();
        }

        //function for to implement velocity of the ball
        this.ball.implementVel = ()=> {
            if (this.ball.velocity > this.ball.maxVel) return;
            this.ball.velocity += .2;
        }

        //players
        this.p1 = this.createRect(
            0, this.height / 2,
            this.tileSize, (this.tileSize * 3),
            "#00f"
        );

        this.p2 = this.createRect(
            this.width - this.tileSize,
            this.height / 2,
            this.tileSize, (this.tileSize * 3),
            "#f00"
        );

        this.players = [this.p1, this.p2];

        //define additional params
        this.players.map((p, i) => {

            //control directions
            p.velocity = 3;
            p.up = false;
            p.down = false;
            p.score = 0;

            //init positions
            p.initY = p.y;

            //to move player
            p.move = (vy) => {
                p.y += (p.velocity * vy);
            }

            //to control player
            p.control = () => {
                if (p.up) {
                    p.move(-1);
                }
                if (p.down) {
                    p.move(1);
                }
            }

            //check if the player is on limit of the screen
            p.checkHitLimit = () => {
                if (p.y <= 0) {
                    p.up = false;
                } else if (p.y >= this.height - p.h) {
                    p.down = false;
                }
            }

            //check if the player is colliding with a ball
            p.checkHitball = () => {
                if (this.ball.hitPlayer(p)){
                    this.ball.changeDirX();
                    this.ball.implementVel();
                }
            }

            p.reset = ()=> {
                this.y = p.initY;
            }

            p.update = () => {
                p.control();
                p.checkHitLimit();
                p.checkHitball();
            }
        });

        //run
        this.run();
    }

    changeTextButton = (text)=> {
        
        const textButton = this.btnStart.querySelector("span");
        console.log(text);
        textButton.innerText = text;
    }

    pause = () => { 
        this.running = !this.running;
        this.changeTextButton(this.running ? "Pausar": "Continuar");
    }

    controlKeyDown = (e) => {

        //key
        const k = e.key;

        if (k === "Enter"){
            this.pause();
        }

        const keys = [["w", "s"], ["ArrowUp", "ArrowDown"]];

        //test players
        this.players.map((p, i) => {

            if (String(k).toUpperCase() === keys[i][0].toUpperCase() && p.y > 0){
                p.up = true;
            }

            if (String(k).toUpperCase() === keys[i][1].toUpperCase() && p.y < this.height - p.h){
                p.down = true;
            }

        });

        
    }

    controlKeyUp = (e) => {

        //key
        const k = e.key;

        const keys = [["w", "s"], ["ArrowUp", "ArrowDown"]];

        //test players
        this.players.map((p, i) => {

            if (String(k).toUpperCase() === keys[i][0].toUpperCase() && p.y > 0){
                p.up = false;
            }

            if (String(k).toUpperCase() === keys[i][1].toUpperCase() && p.y < this.height - p.h){
                p.down = false;
            }

        });
    }

    controlClick = (e)=> {
    
        const id = e.target.id;
        if (id === "btnStart"){
            this.pause();
        }

    }

    clearScreen = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    render = () => {
        //clear screen
        this.clearScreen();
        //draw ball
        this.ball.render(this.ctx);
        //draw players
        this.players.map(p => p.render(this.ctx));
    }

    updateScore = ()=> {
        if (this.ball.dx == 1){
            this.p1.score++;
        } else {
            this.p2.score++;
        }

        const newScore = [this.p1.score, this.p2.score];
        //update in the score elements
        this.score.map((e, i) => {
            e.innerText = newScore[i];
        });
    }

    checkBallExitedScreen = () => {
        if (this.ball.exitedScreen()){
            this.ball.reset();
            this.players.map(p => p.reset);
            this.updateScore();
        }
    }

    update = () => {
        //update the state of the ball
        this.ball.update();
        //update the players
        this.players.map(p => p.update());
        //reset the ball and players
        this.checkBallExitedScreen();
    }

    run = () => {
        this.render();
        if (this.running) this.update();
        requestAnimationFrame(this.run.bind(this));
    }
}