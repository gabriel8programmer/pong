
import Keyboard from "./Keyboard.js";
import Game from "./Game.js";

//get canvas
const canvas = document.querySelector("#canvas");

//create object for the game
const keyboard = new Keyboard();
const game = new Game(canvas, keyboard);

//init game
game.init();