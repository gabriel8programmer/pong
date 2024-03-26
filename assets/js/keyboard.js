
function Keyboard(){
    this.keyPressed = null;

    this.setKeyPressed = function(keyPressed) {
        this.keyPressed = keyPressed;
    }

    this.getKeyPressed = function(){
        return this.keyPressed;
    }

    this.keydown = function(e){
        const key = e.key;
        this.setKeyPressed(key);
    }.bind(this);

    this.keyup = function(e){
        this.setKeyPressed(null);
    }.bind(this);

    this.init = function(){
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

}