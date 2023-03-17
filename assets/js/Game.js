import Ball from "./Ball.js"
import Player from "./Player.js"

class Game {

  contructor() {

    this.WIDTH = 480
    this.HEIGHT = 400
    this.FPS = 60

    this.start()
  }

  start(context) {

    //create ball
    this.ball = new Ball(this.WIDTH / 2, this.HEIGHT / 2, 20, 20)

    //create players and IA cpu
    this.player1 = new Player(0, this.HEIGHT / 2 - 30, 20, 60)
    this.player2 = new Player(this.WIDTH - 20, this.HEIGHT / 2 - 30, 20, 60)
    this.cpu = this.player2

    //define colors 
    this.ball.color = "yellow"
    this.player1.color = "blue"
    this.player2.color = "green"
    this.cpu.color = "red"

    console.log(this.ball)
    console.log(this.player1)
    console.log(this.player2)

    //run game
    this.run(context)

  }

  render(context) {

    //draw the ball
    context.fillStyle = this.ball.color
    context.fillRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height)

    //draw the player1
    context.fillStyle = this.player1.color
    context.fillRect(this.player1.x, this.player1.y, this.player1.width, this.player1.height)

    //draw the player2
    context.fillStyle = this.player2.color
    context.fillRect(this.player2.x, this.player2.y, this.player2.width, this.player2.height)
  }

  update() {
    return
  }

  events() {
    return
  }

  run(context) {

    setInterval(() => {
      this.render(context)
      this.update()
      this.events()
    }, 1000 / this.FPS)
  }
}

export default Game