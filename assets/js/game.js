class Game {
    constructor(canvas) {
        // Obtendo largura e altura do canvas
        this.width = canvas.width;
        this.height = canvas.height;
        this.tileSize = 20;

        // Obtendo contexto 2D
        this.ctx = canvas.getContext("2d");

        // Estado do jogo
        this.running = true;
    }

    init() {
        // Inicializando a bola
        this.ball = {
            x: this.width / 2 - this.tileSize / 2,
            y: this.height / 2 - this.tileSize / 2,
            w: this.tileSize,
            h: this.tileSize,
            c: "#ff0", // Cor amarela

            draw: () => {
                // Atualizando cor do contexto
                this.ctx.fillStyle = this.ball.c; // Ajuste aqui
                this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.w, this.ball.h); // Ajuste aqui
            }
        };

        this.run();
    }

    drawRect(x, y, w, h, c) {
        // Atualizando cor do contexto
        this.ctx.fillStyle = c;
        this.ctx.fillRect(x, y, w, h);
    }

    render() {
        // Atualizando cor do contexto
        this.drawRect(0, 0, this.width, this.height, "#000"); // Cor de fundo preta

        // Desenhando a bola
        this.ball.draw(); // Não é necessário passar o contexto aqui, pois já está definido no método draw da bola
    }

    update() {
        console.log("Atualizando");
    }

    run() {
        this.render();
        if (this.running) {
            this.update();
        }
        requestAnimationFrame(this.run.bind(this)); // Garante que a função run seja chamada no contexto adequado
    }
}

export default Game;
