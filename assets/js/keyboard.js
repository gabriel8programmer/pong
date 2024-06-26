
class Keyboard{

    constructor(){
        this.keyPressed = null;
    }

    setKeyPressed = function(keyPressed) {
        this.keyPressed = keyPressed;
    }

    getKeyPressed = function(){
        return this.keyPressed;
    }

    keydown = function(e){
        const key = e.key;
        this.setKeyPressed(key);
    }.bind(this);

    keyup = function(e){
        this.setKeyPressed(null);
    }.bind(this);

    init = function(){
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

}

export default Keyboard;