
const start = () => {
  //canvas
  const canvas = document.getElementById("canvas")
  //control players
  const btns_player1 = [...document.querySelectorAll("#control-player1 button")]
  const btns_player2 = [...document.querySelectorAll("#control-player2 button")]

  if (canvas.getContext) {
    const context = canvas.getContext("2d")
  }
}

window.addEventListener("load", start)