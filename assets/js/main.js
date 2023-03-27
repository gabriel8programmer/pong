
//variables

//game
const WIDTH = 350;
const HEIGHT = 270;
const FPS = 30;
const SPEED = 5;
const SIZE_OBJECT = 15;
const LENGHT_PLAYER = 4;

//objects of the game
const players = new Array(2);
let ball = new Object();

//this function create a player in game
function Player(x, y, size, mult, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.mult = mult;
  this.color = color;
  this.height = Math.round(this.size * this.mult);

  this.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.height);
  }
}

//this function create a ball in game
function Ball(x, y, size, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;

  this.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

//define the center screen
const get_center = () => {
  return [Math.round(WIDTH / 2),
  Math.round(HEIGHT / 2)];
}

//define from the position center in player
const get_center_player = ()=> {
  return get_center()[1] - ((SIZE_OBJECT*LENGHT_PLAYER)/2);
}

//define from the position center in player
const get_center_ball = ()=> {
  return [get_center()[0] - SIZE_OBJECT/2,
          get_center()[1] - SIZE_OBJECT/2];
}

//method start
const start = () => {
  //canvas
  const canvas = document.getElementById("canvas");
  //control players
  const btns_player1 = [...document.querySelectorAll("#control-player1 button")];
  const btns_player2 = [...document.querySelectorAll("#control-player2 button")];

  //create objects of the game

  //players
  players[0] = new Player(0, get_center_player(), SIZE_OBJECT, LENGHT_PLAYER, "blue");
  players[1] = new Player(WIDTH - SIZE_OBJECT, get_center_player(), SIZE_OBJECT, LENGHT_PLAYER, "red");

  //ball
  ball = new Ball(get_center_ball()[0], get_center_ball()[1], SIZE_OBJECT, "yellow");

  if (canvas.getContext) {
    const context = canvas.getContext("2d");
    render_game(context);
  }
}

//render the players in screen of the game
const render_players = (players, ctx) => {
  players.map(player => {
    ctx.beginPath();
    player.draw(ctx);
    ctx.closePath();
  })
}

//render the ball in screen of the game
const render_ball = (ball, ctx) => {
  ctx.beginPath();
  ball.draw(ctx);
  ctx.closePath();
}

//render game
const render_game = (ctx) => {

  //render
  render_players(players, ctx);
  render_ball(ball, ctx);

}

window.addEventListener("load", start)