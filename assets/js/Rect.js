
class Rect {
    constructor(x, y, w, h, c){
        //x, y => position 
        //w, h => size
        //c => color
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    render(ctx){
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

export default Rect;