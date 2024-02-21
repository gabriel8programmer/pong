
class Game {

    constructor(canvas){
        //get width and height of the screen
        this.width = canvas.width;
        this.height = canvas.height;

        //get context 2d
        this.ctx = canvas.getContext("2d");

        //state of the game
        this.running = false;
    }

    init = ()=> {
        this.run();
    }

    drawRect = (x, y, w, h)=> {
        //update screen color
        this.ctx.fillRect(x, y, w, h);
    }

    render = ()=> {
        //update screen color
        this.drawRect(0, 0, this.width, this.height);
    }

    update = ()=> {
        console.log("Updating");
    }

    run = ()=> {
        this.render();
        if (this.running){
            this.update();
        }
        requestAnimationFrame(this.run.bind(this));
    }

}

export default Game;