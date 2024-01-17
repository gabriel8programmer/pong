
class Game {

    constructor(elements) {
        const { $canvas, $btnStart } = elements;
        this.canvas = $canvas;
        this.btnStart = $btnStart;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        //utils
        this.tileSize = 10;
        this.running = true;
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

        this.ball.speed = 1;
        this.ball.dx = 1;
        this.ball.dy = -1;

        //move ball
        this.ball.move = () => {
            this.ball.x += (this.ball.speed * this.ball.dx);
            this.ball.y += (this.ball.speed * this.ball.dy);
        }

        this.ball.changeDir = ()=> {
            this.ball.dy *= -1;
        }

        this.checkBallExited = ()=> {
            return (this.ball.x < -this.ball.w || this.ball.x > this.width);
        }

        //check if the ball exited on the limit of the screen
        this.ball.checkPosition = () => {

        }

        //check if there was a collision with a player
        this.ball.checkHitPlayer = (p)=> {
            return (
                this.ball.x < p.x + p.w &&
                this.ball.x + this.ball.w < p.x &&
                this.ball.y < p.y + p.h &&
                this.ball.y - this.ball.h > p.y
            );
        }

        //create the function for to update the ball
        this.ball.update = () => {
            this.ball.move();
            this.ball.checkPosition();
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
        this.players.map(p => {

            //control directions
            p.velocity = 5;
            p.up = false;
            p.down = false;

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

            p.update = () => {
                p.control();
                p.checkHitLimit();
            }
        })
    }

    pause = () => { 
        this.running = !this.running;
    }

    controlKeyDown = (e) => {

        //key
        const k = e.key;

        if (k === "Enter"){
            this.pause();
            this.btnStart.innerText = (this.running) ? "Start": "Continuar";          
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

    update = () => {

        //update the state of the ball
        this.ball.update();
        //update the players
        this.players.map(p => p.update());
    }

    run = () => {
        this.render();
        if (this.running) this.update();
        requestAnimationFrame(this.run.bind(this));
    }
}