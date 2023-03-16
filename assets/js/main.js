
import Game from "./Game.js"

function start() {
  //get object of the canvas
  const canvas = document.getElementById("canvas")

  //test if canvas is running
  if (canvas.getContext) {
    const context = canvas.getContext("2d")
    const game = new Game()
    game.run()
  }

}

window.addEventListener("load", start)