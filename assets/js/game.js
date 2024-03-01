function Game(canvas, keyboard) {
    // Getting canvas width and height
    this.keyboard = keyboard;
    this.width = canvas.width;
    this.height = canvas.height;
    this.tileSize = 10;
    this.lenPlayer = 4;

    // Getting 2D context
    this.ctx = canvas.getContext("2d");

    // Game state
    this.running = true;

    //players
    this.p1_controls = ["w", "s"];
    this.p2_controls = ["ArrowUp", "ArrowDown"];
    this.p_controls = [this.p1_controls, this.p2_controls];

    // Function to create a rectangle
    this.createRect = function (x, y, w, h, c) {
        return {
            x: x,
            y: y,
            w: w,
            h: h,
            c: c
        };
    };

    // Initialization function
    this.init = function () {
        // Initializing the ball
        this.ball = this.createRect(
            this.width / 2 - this.tileSize / 2,
            this.height / 2 - this.tileSize / 2,
            this.tileSize,
            this.tileSize,
            "#ff0"
        );

        // Ball properties
        this.ball.speed = 1;
        this.ball.maxSpeed = 3;
        this.ball.incSpeed = .2; 
        this.ball.dx = 1;
        this.ball.dy = -1;

        // Function to render the ball
        this.ball.render = function (ctx) {
            // Update context color
            this.ctx.fillStyle = this.ball.c;
            this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.w, this.ball.h);
        }.bind(this);

        this.ball.changeDirX = function(){
            this.ball.dx *= -1;
        }.bind(this);

        this.ball.changeDirY = function(){
            this.ball.dy *= -1;
        }.bind(this);

        this.ball.increaseSpeed = function(){
            if (this.ball.speed >= this.ball.maxSpeed) return;
            this.ball.speed+=this.ball.incSpeed;
        }.bind(this);

        this.ball.reset = function(){
            this.ball.x = this.width / 2 - this.tileSize / 2;
            this.ball.y = this.height / 2 - this.tileSize / 2;
            this.ball.speed = 1;
        }.bind(this);

        this.ball.exitedScreen = function(){
            return (this.ball.x - this.ball.w > this.width || 
                this.ball.x + this.ball.w < 0);
        }.bind(this);

        this.ball.updateCollision = function(){
            //collision y
            if (this.ball.y > this.height - this.ball.h
                || this.ball.y < 0) {
                this.ball.changeDirY();
            }
            //exit screen
            if (this.ball.exitedScreen()){
                this.ball.reset();
            }
        }.bind(this);

        this.ball.collidedWithPlayer = function(p){
            return (
              this.ball.x < p.x + p.w &&
              this.ball.x + this.ball.w > p.x &&
              this.ball.y < p.y + p.h &&
              this.ball.y + this.ball.h > p.y
            );
        }.bind(this);

        // Function to update the ball
        this.ball.update = function () {
            //collision y
            this.ball.updateCollision();
            this.ball.x += (this.ball.dx * this.ball.speed);
            this.ball.y += (this.ball.dy * this.ball.speed);
        }.bind(this);

        // Players
        this.p1 = this.createRect(
            0,
            this.height / 2 - (this.tileSize * this.lenPlayer) / 2,
            this.tileSize,
            this.tileSize * this.lenPlayer,
            "#00f"
        );

        this.p2 = this.createRect(
            this.width - this.tileSize,
            this.height / 2 - (this.tileSize * this.lenPlayer) / 2,
            this.tileSize,
            this.tileSize * this.lenPlayer,
            "#f00"
        );

        this.players = [this.p1, this.p2];

        this.players.forEach((p) => {
            // Player properties
            p.speed = 2;
            p.maxSpeed = 3;
            p.incSpeed = .5;
            p.dy = 0;
            p.up = false;
            p.down = false;
            p.score = 0;

            // Function to render the players
            p.render = function () {
                // Update context color
                this.ctx.fillStyle = p.c;
                this.ctx.fillRect(p.x, p.y, p.w, p.h);
            }.bind(this);

            p.setUp = function (state) {
                p.up = state;
            }

            p.setDown = function (state) {
                p.down = state;
            }

            p.move = function () {
                p.dy = 0;

                if (p.up && p.y >= 0) {
                    p.dy--;
                }

                if (p.down && p.y <= this.height - p.h) {
                    p.dy++;
                }

                p.y += (p.speed * p.dy);
            }.bind(this);

            p.increaseSpeed = function(){
                if (p.speed >= p.maxSpeed) return;
                p.speed += p.incSpeed;
            }

            p.collideWithBall = function(){
                if (this.ball.collidedWithPlayer(p)){
                    this.ball.changeDirX();
                    this.ball.increaseSpeed();
                    p.increaseSpeed();
                }
            }.bind(this);

            p.reset = function(){
                p.y = this.height / 2 - (this.tileSize * this.lenPlayer) / 2;
                p.speed = 2;
            }.bind(this);

            // Function to update the players
            p.update = function () {

                //if the ball exited screen
                if (this.ball.exitedScreen()){
                    p.reset();
                }

                p.collideWithBall();
                p.move();

            }.bind(this);
        });

        // Run the game
        this.run();
    };

    // Function to draw a rectangle
    this.drawRect = function (x, y, w, h, c) {
        // Update context color
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x, y, w, h);
    };

    this.renderScore = function() {
        //player1
        this.ctx.fillStyle = "white";
        this.ctx.font = "16px Monospace";
        this.ctx.fillText(this.p1.score, 20, 30);
        //player2
        this.ctx.fillStyle = "white";
        this.ctx.font = "16px Monospace";
        this.ctx.fillText(this.p2.score, this.width-30, 30);
    }.bind(this);

    // Function to render the game
    this.render = function () {
        // Update context color
        this.drawRect(0, 0, this.width, this.height, "#000"); // Black background

        //render score
        this.renderScore();

        // Render the ball
        this.ball.render();

        // Render the players
        this.players.forEach(p => p.render());
    };

    //update the keyboard
    this.updateKeyboard = function () {

        this.keyboard.keydown((e) => {

            const key = e.key;

            this.players.forEach((p, i) => {

                const up = this.p_controls[i][0];
                const down = this.p_controls[i][1];

                if (key == up) {
                    p.setUp(true);
                }
                if (key == down) {
                    p.setDown(true);
                }

            });

        });

        this.keyboard.keyup((e) => {

            const key = e.key;

            this.players.forEach((p, i) => {

                const up = this.p_controls[i][0];
                const down = this.p_controls[i][1];

                if (key == up) {
                    p.setUp(false);
                }
                if (key == down) {
                    p.setDown(false);
                }

            });

        });

    }.bind(this);

    this.updateScore = function() {

        //test position ball
        if (this.ball.x + this.ball.w < 0){
            this.p2.score++;
        }

        if (this.ball.x - this.ball.w > this.width) {
            this.p1.score++;
        }
    }

    // Function to update the game
    this.update = function () {
        //update keyboard
        this.updateKeyboard();
        // Update the ball
        this.ball.update();
        // Update the players
        this.players.forEach(p => p.update());
        //update the score
        this.updateScore();
    };

    // Function to run the game
    this.run = function () {
        this.render();
        if (this.running) {
            this.update();
        }
        requestAnimationFrame(this.run.bind(this)); // Ensure that the run function is called in the correct context
    };
}

export default Game;
