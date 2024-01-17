
//get all elements of the document for to manipulate
const $canvas = document.querySelector("#canvas");
const $p1Score = document.querySelector("#player1Score");
const $p2Score = document.querySelector("#player2Score");
const $btnStart = document.querySelector("#btnStart");

const elementsGame = {
    $canvas, $p1Score, $p2Score, $btnStart
}

//game
const game = new Game(elementsGame);
//get events
document.addEventListener("keydown", game.controlKeyDown);
document.addEventListener("keyup", game.controlKeyUp);

game.init();
game.run();