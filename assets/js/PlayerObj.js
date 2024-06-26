import Rect from "./Rect.js";

class Player extends Rect{

    constructor(x, y, w, h, c){
        super(x, y, w, h, c);    
        //position
        this.initY = this.y;
    
        //move
        this.speed = 2;
        this.initSpeed = this.speed;
        this.incSpeed = .5;
        this.maxSpeed = 4;
        this.dy = 0;
        this.down = false;
        this.up = false;
    
        //commands
        this.cDown = null; //command down 
        this.cUp = null; // command up
        this.ia = true;
    }


    init = function(cUp, cDown){
        this.cUp = cUp;
        this.cDown = cDown;
    }

    changeDir = function(up, down){
        this.up = up;
        this.down = down;
    }

    increaseSpeed = function(){
        if (this.speed >= this.maxSpeed) return;
        this.speed+=this.incSpeed;
    }

    updateDirection = function(command){
        switch(command){
            case this.cUp:
                this.changeDir(true, false);
                break;
            case this.cDown:
                this.changeDir(false, true);
                break;
            case null:
                this.changeDir(false, false);
                break;
        }
    }

    //update the player
    updateMove = function(sh){
        //sh => screen height
        this.dy = 0;

        if (this.up && this.y > 0){
            this.dy = -1;
        }
        if (this.down && this.y + this.h < sh){
            this.dy = 1;
        }

        this.y += (this.dy * this.speed);
    }
}

export default Player;