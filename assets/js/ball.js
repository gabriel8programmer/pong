function Ball(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    //position
    this.initX = this.x;
    this.initY = this.y;

    //move
    this.speed = 1;
    this.initSpeed = this.speed;
    this.maxSpeed = 3;
    this.incSpeed = .2;
    this.dx = 0;
    this.dy = 0;

    //init ball
    this.init = function(dx, dy){
        this.dx = dx;
        this.dy = dy;
    }

    // Function to render the ball
    this.render = function (ctx) {
        // Update context color
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    this.changeDirX = function(){
        this.dx *= -1;
    }

    this.changeDirY = function(){
        this.dy *= -1;
    }

    this.increaseSpeed = function(){
        if (this.speed >= this.maxSpeed) return;
        this.speed+=this.incSpeed;
    }

    this.reset = function(){
        this.x = this.initX;
        this.y = this.initY;
        this.speed = this.initSpeed;
    }

    this.exitedScreen = function(sw){
        //sw => screeb width
        return (
            this.x < 0 || this.x > sw - this.w
        );
    }

    this.collidedWithEdge = function(sh){
        //sh => screen height
        return (
            this.y < 0 || this.y > sh - this.h
        );
    }

    this.collidedWithPlayer = function(p){
        //p => player
        return (
          this.x < p.x + p.w &&
          this.x + this.w > p.x &&
          this.y < p.y + p.h &&
          this.y + this.h > p.y
        );
    }

    this.updateExitedScreen = function(sw){
        //sw => screen width
        if (this.exitedScreen(sw)){
            this.reset();
        }
    }

    this.updateCollisionWithEdge = function(sh){
        //sh => screen height
        if (this.collidedWithEdge(sh)){
            this.changeDirY();
        }
    }

    this.updateCollisionWithPlayer = function(p){
        //p => player
        if (this.collidedWithPlayer(p)){
            this.changeDirX();
            this.increaseSpeed();
        }
    }

    // Function to update the ball
    this.updateMove = function () {
        this.x += (this.dx * this.speed);
        this.y += (this.dy * this.speed);
    }
}