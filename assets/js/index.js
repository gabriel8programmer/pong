
//import game
import Game from "./game.js";

//get canvas
const canvas = document.querySelector("#canvas");

//create object for the game
const game = new Game(canvas);

//init game
game.init();