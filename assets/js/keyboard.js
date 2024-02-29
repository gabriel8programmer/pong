
function Keyboard(){

    this.keydown = function(callback){
        document.addEventListener("keydown", callback);
    }

    this.keyup = function(callback){
        document.addEventListener("keyup", callback);
    }

}

export default Keyboard;