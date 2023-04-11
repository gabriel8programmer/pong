
//variables, consts and elements's dom

//canvas element
const canvas = document.getElementById("canvas");
//player1's buttons
const btn_up_p1 = document.getElementById("btn-up-p1");
const btn_down_p1 = document.getElementById("btn-down-p1");
//player2's buttons
const btn_up_p2 = document.getElementById("btn-up-p2");
const btn_down_p2 = document.getElementById("btn-down-p2");

//game
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

//create context for to draw in game's screen
const context = canvas.getContext("2d");

//array with the game's players
const players = [];

//literal object
const ball = {
  x: 0,
  y: 0,
  init_x: 0,
  init_y: 0,
  dir_x: 0,
  dir_y: 0,
  speed: 1,
  width: 0,
  height: 0,
  color: "white"
}

//player's class
function Player(x, y) {
  this.x = x;
  this.y = y;
  this.width = 0;
  this.height = 0;
}

//render the game
const render_game = (context) => {
  //clear game's screen
  context.clearRect(0, 0, WIDTH, HEIGHT);
  //render ball
  context.beginPath();
  context.fillStyle = ball.color;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);
  context.closePath();
}

//move ball
const update_position_ball = () => {
  //test ball's position in x
  if (ball.x >= (WIDTH - ball.width)) {
    ball.dir_x = -1;
  }
  else if (ball.x < 0) {
    ball.dir_x = 1;
  }
  //test ball's position in y
  if (ball.y > (HEIGHT - ball.height)) {
    ball.dir_y = -1;
  }
  else if (ball.y < 0) {
    ball.dir_y = 1;
  }
}

//update the game
const update_game = () => {

  //update ball
  ball.move();
  update_position_ball();
}

//run the game
const run_game = () => {
  render_game(context);
  update_game();
  requestAnimationFrame(run_game);
}

//start the game
const start = () => {

  //init ball
  ball.width = 15;
  ball.height = 15;
  ball.init_x = Math.round((WIDTH / 2) - (ball.width / 2));
  ball.init_y = Math.round((HEIGHT / 2) - (ball.height / 2));
  ball.x = ball.init_x;
  ball.y = ball.init_y;
  ball.dir_x = 1;
  ball.dir_y = -1;

  //function for to move the ball
  ball.move = () => {
    ball.x += (ball.speed * ball.dir_x);
    ball.y += (ball.speed * ball.dir_y);
  }

  //run game
  run_game();
}

window.addEventListener("load", start);