
//instanciate new object game
const gameInstance = new Game(game);
gameInstance.init();

//key's events
document.addEventListener("keydown", gameInstance.controlKeyDown);
document.addEventListener("keyup", gameInstance.controlKeyUp);

//button's events
const { start } = game;
start.addEventListener("click", gameInstance.controlClick);

