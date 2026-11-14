
/* CHUVA NEON SUAVE - COBRA KAI */

// Seleciona o fundo da página
const fundo = document.getElementById("chuva-neon");
const ctxChuva = fundo.getContext("2d");

// Guarda as luzes
let luzes = [];

// Ajusta o fundo ao tamanho da tela
function ajustarTela() {
    fundo.width = window.innerWidth;
    fundo.height = window.innerHeight;
}

// Cria as luzes verdes
function criarLuzes() {

    luzes = [];

    for (let i = 0; i < 200; i++) {

        luzes.push({
            x: Math.random() * fundo.width,
            y: Math.random() * fundo.height,
            tamanho: Math.random() * 40 + 15,
            velocidade: Math.random() * 0.4 + 0.2,
            brilho: Math.random() * 0.15 + 0.05
        });

    }
}

// Faz as luzes caírem
function animarChuva() {

    ctxChuva.clearRect(
        0, 0, fundo.width, fundo.height
    );

    luzes.forEach(function(luz) {

        // Cria o brilho verde suave
        const degrade = ctxChuva.createLinearGradient(
            luz.x,
            luz.y - luz.tamanho,
            luz.x,
            luz.y
        );

        degrade.addColorStop(
            0,
            "rgba(0,255,100,0)"
        );

        degrade.addColorStop(
            1,
            `rgba(0,255,100,${luz.brilho})`
        );

        ctxChuva.strokeStyle = degrade;
        ctxChuva.lineWidth = 1;

        // Desenha o risco de luz
        ctxChuva.beginPath();
        ctxChuva.moveTo(
            luz.x,
            luz.y - luz.tamanho
        );

        ctxChuva.lineTo(
            luz.x,
            luz.y
        );

        ctxChuva.stroke();

        // Movimenta a luz para baixo
        luz.y += luz.velocidade;

        // Quando sair da tela, volta ao topo
        if (luz.y > fundo.height + luz.tamanho) {
            luz.y = -luz.tamanho;
            luz.x = Math.random() * fundo.width;
        }

    });

    requestAnimationFrame(animarChuva);
}

// Inicia o efeito
ajustarTela();
criarLuzes();
animarChuva();

// Ajusta quando a janela mudar de tamanho
window.addEventListener("resize", function() {
    ajustarTela();
    criarLuzes();
});
