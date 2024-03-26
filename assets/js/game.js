function Game(canvas, keyboard) {
    // Getting canvas width and height
    this.keyboard = keyboard;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ts = 10; //tileSize
    this.lp = 4; //length player

    // Getting 2D context
    this.ctx = canvas.getContext("2d");

    // Game state
    this.running = true;

    //objects
    this.p1 = null;
    this.p2 = null;
    this.ball = null;
    this.players = null;

    // Initialization function
    this.init = function () {
        // init keyboard
        this.keyboard.init();

        // create and initializing the ball
        this.ball = new Ball(
            this.width / 2 - this.ts / 2,
            this.height / 2 - this.ts / 2,
            this.ts, this.ts, "#ff0"
        );

        this.ball.init(1, -1);

        //players
        this.p1 = new Player(
            0,
            this.height / 2 - (this.ts*this.lp) / 2,
            this.ts, this.ts*this.lp, "#00f"
        );

        this.p1.init("w", "s");

        this.p2 = new Player(
            this.width - this.ts,
            this.height / 2 - (this.ts*this.lp) / 2,
            this.ts, this.ts*this.lp, "#f00"
        );

        this.p2.init("ArrowUp", "ArrowDown");

        //players list
        this.players = [this.p1, this.p2];

        // Run the game
        this.run();
    };

    this.clearRect = function(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    // Function to render the game
    this.render = function () {
        // clear the screen
        this.clearRect();

        //render score
        // this.renderScore();

        // Render the ball
        this.ball.render(this.ctx);

        // Render the players
        this.players.map(p => p.render(this.ctx));
    };

    // Function to update the game
    this.update = function () {
        //udpate players
        this.players.map(p => p.updateDirection(this.keyboard.getKeyPressed()));
        this.players.map(p => p.updateMove(this.height));
        //update collision of the ball with the players
        this.players.map(p => this.ball.updateCollisionWithPlayer(p));

        //update ball
        this.ball.updateMove();
        this.ball.updateExitedScreen(this.width);
        this.ball.updateCollisionWithEdge(this.height);
        
    };

    // Function to run the game
    this.run = function () {
        if (!this.running) return;
        this.render();
        this.update();  
        // Ensure that the run function is called in the correct context
        requestAnimationFrame(this.run.bind(this)); 
    };
}
