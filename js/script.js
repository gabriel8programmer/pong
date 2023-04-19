
//get dom's elements
const canvas = document.getElementById("canvas");
//buttons
//player1
const player1_element = {
  up: document.querySelector("#player1 .up"),
  down: document.querySelector("#player1 .down")
}
//player2
const player2_element = {
  up: document.querySelector("#player2 .up"),
  down: document.querySelector("#player2 .down")
}

//class ball
class Ball {

  constructor(ctx, color) {
    this.size = 15;
    this.x = Math.round((WIDTH / 2) - (this.size / 2));
    this.y = Math.round((HEIGHT / 2) - (this.size / 2));
    this.dir_x = 1;
    this.dir_y = -1;
    this.vel_x = 1;
    this.vel_y = 1;
    this.ctx = ctx;
    this.color = color;
  }

  render = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.closePath();
  }

  exited_screen_x = () => {
    if ((this.x + this.size) >= WIDTH) {
      this.dir_x = -1;
    } else if (this.x <= 0) {
      this.dir_x = 1;
    }
  }

  exited_screen_y = () => {
    if ((this.y + this.size) >= HEIGHT) {
      this.dir_y = -1;
    } else if (this.y <= 0) {
      this.dir_y = 1;
    }
  }

  move = () => {
    this.x += (this.dir_x * this.vel_x);
    this.y += (this.dir_y * this.vel_y);
  }

  update = () => {
    this.move();
    this.exited_screen_x();
    this.exited_screen_y();
  }

}

//class for players
class Player {

  constructor(ctx, color) {
    this.width = 15;
    this.height = 15 * 4;
    this.x = 0;
    this.y = Math.round(HEIGHT / 2 - (this.height / 2));
    this.ctx = ctx;
    this.color = color;
    this.up = false;
    this.down = false;
    this.dir_y = 0;
    this.speed = 2;
  }

  render = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.closePath();
  }

  move = () => {
    this.dir_y = 0;

    if (this.up) {
      this.dir_y += -1;
    }
    if (this.down) {
      this.dir_y += 1;
    }

    this.y += (this.dir_y * this.speed);
  }

  reached_border_top = () => {
    return (this.x <= 0) ? true : false;
  }

  reached_border_bottom = () => {
    return (this.y + this.height >= HEIGHT) ? true : false;
  }

  update = () => {
    this.move();
  }

}

//variables ands consts
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const ctx = canvas.getContext("2d");

//test if game is running
let running = true;

//ball
const ball = new Ball(ctx, "yellow");

//players
const players = [];
players[0] = new Player(ctx, "blue");
players[1] = new Player(ctx, "red");

//define positions x of the players and colors too
players[0].x = 0;
players[1].x = WIDTH - players[1].width;

//functions
const render_game = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  //render ball
  ball.render();
  //render players
  players.map(player => {
    player.render();
  });
}

const update_game = () => {
  //update ball
  ball.update();
  //update players
  players.map(player => {
    player.update();
  });
}

const run_game = () => {
  if (running) {
    render_game();
    update_game();
  }
  requestAnimationFrame(run_game);
}

//events
addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "ArrowUp") {
    players[0].up = true;
  }
  if (key === "ArrowDown") {
    players[0].down = true;
  }
});

addEventListener("keyup", (e) => {
  const key = e.key;
  if (key === "ArrowUp") {
    players[0].up = false;
  }
  if (key === "ArrowDown") {
    players[0].down = false;
  }
});

//call methods
run_game();
