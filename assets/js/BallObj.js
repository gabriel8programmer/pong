
import Rect from "./Rect.js";

class Ball extends Rect {

    constructor(x, y, w, h, c="#ff0"){
        super(x, y, w, h, c);
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
    }

    //init ball
    init = function(dx, dy){
        this.dx = dx;
        this.dy = dy;
    }

    // Function to render the ball
   render = function (ctx) {
        // Update context color
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    changeDirX = function(){
        this.dx *= -1;
    }

    changeDirY = function(){
        this.dy *= -1;
    }

    increaseSpeed = function(){
        if (this.speed >= this.maxSpeed) return;
        this.speed+=this.incSpeed;
    }

    reset = function(){
        this.x = this.initX;
        this.y = this.initY;
        this.speed = this.initSpeed;
    }

    exitedScreen = function(sw){
        //sw => screeb width
        return (
            this.x < 0 || this.x > sw - this.w
        );
    }

    collidedWithEdge = function(sh){
        //sh => screen height
        return (
            this.y < 0 || this.y > sh - this.h
        );
    }

    collidedWithPlayer = function(p){
        //p => player
        return (
          this.x < p.x + p.w &&
          this.x + this.w > p.x &&
          this.y < p.y + p.h &&
          this.y + this.h > p.y
        );
    }

    updateExitedScreen = function(sw){
        //sw => screen width
        if (this.exitedScreen(sw)){
            this.reset();
        }
    }

    updateCollisionWithEdge = function(sh){
        //sh => screen height
        if (this.collidedWithEdge(sh)){
            this.changeDirY();
        }
    }

    updateCollisionWithPlayer = function(p){
        //p => player
        if (this.collidedWithPlayer(p)){
            this.changeDirX();
            this.increaseSpeed();
        }
    }

    // Function to update the ball
    updateMove = function () {
        this.x += (this.dx * this.speed);
        this.y += (this.dy * this.speed);
    }
}

export default Ball;