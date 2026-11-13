const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tamanho = 20;
const total = canvas.width / tamanho;

let cobra;
let direcaoX;
let direcaoY;
let comida;
let pontos;
let jogo;
let velocidade;

let jogoIniciado = false;

let ranking = [];

let tipoComida = "🍎";
let valorComida = 1;

function iniciarJogo(){

    cobra = [
        {x:10, y:10}
    ];

    direcaoX = 1;
    direcaoY = 0;

    gerarComida();

    pontos = 0;
    velocidade = 150;

    document.getElementById("pontuacao").innerHTML =
        "Pontuação: " + pontos;

    clearInterval(jogo);
    jogo = setInterval(atualizar, velocidade);

    desenhar();
}

function gerarComida(){

    comida = {
        x: Math.floor(Math.random() * total),
        y: Math.floor(Math.random() * total)
    };

    let sorteio = Math.random();

    if(sorteio < 0.70){

        tipoComida = "🍎";
        valorComida = 1;

    }else if(sorteio < 0.95){

        tipoComida = "⭐";
        valorComida = 5;

    }else{

        tipoComida = "💎";
        valorComida = 10;
    }
}

function comecarJogo(){

    let nome =
        document.getElementById("nomeJogador").value.trim();

    if(nome === ""){

        alert("Digite seu nome para começar!");
        return;
    }

    jogoIniciado = true;

    iniciarJogo();
}

function atualizarRanking(){

    ranking.sort((a,b) => b.pontos - a.pontos);

    let html = "";

    ranking.forEach((jogador, indice) => {

        html += `
            <div class="item-ranking">
                <strong>${indice + 1}º Lugar</strong><br>
                ${jogador.nome}<br>
                ${jogador.pontos} pontos
            </div>
        `;
    });

    if(ranking.length === 0){
        html = "Nenhum jogador ainda";
    }

    document.getElementById("ranking").innerHTML =
        html;
}

function desenhar(){

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.font = "20px Arial";

    ctx.fillText(
        tipoComida,
        comida.x * tamanho,
        comida.y * tamanho + 18
    );

    cobra.forEach((parte, indice)=>{

        if(indice === 0){

            ctx.font = "20px Arial";

            ctx.fillText(
                "🐍",
                parte.x * tamanho,
                parte.y * tamanho + 18
            );

        }else{

            ctx.fillStyle = "#00FF00";

            ctx.fillRect(
                parte.x * tamanho,
                parte.y * tamanho,
                tamanho,
                tamanho
            );
        }

    });

}

function atualizar(){

    let cabeca = {
        x: cobra[0].x + direcaoX,
        y: cobra[0].y + direcaoY
    };

    if(
        cabeca.x < 0 ||
        cabeca.y < 0 ||
        cabeca.x >= total ||
        cabeca.y >= total
    ){
        finalizarJogo();
        return;
    }

    for(let i = 0; i < cobra.length; i++){

        if(
            cobra[i].x === cabeca.x &&
            cobra[i].y === cabeca.y
        ){
            finalizarJogo();
            return;
        }
    }

    cobra.unshift(cabeca);

    if(
        cabeca.x === comida.x &&
        cabeca.y === comida.y
    ){

        pontos += valorComida;

        document.getElementById("pontuacao").innerHTML =
            "Pontuação: " + pontos;

        if(
            pontos % 5 === 0 &&
            velocidade > 60
        ){

            velocidade -= 10;

            clearInterval(jogo);

            jogo = setInterval(
                atualizar,
                velocidade
            );
        }

        gerarComida();

    }else{

        cobra.pop();
    }

    desenhar();
}

function finalizarJogo(){

    clearInterval(jogo);

    let nome =
        document.getElementById("nomeJogador")
        .value
        .trim();

    ranking.push({
        nome: nome || "Sem Nome",
        pontos: pontos
    });

    atualizarRanking();

    alert("Game Over!");
}

document.addEventListener("keydown",(evento)=>{

    if(!jogoIniciado){
        return;
    }

    switch(evento.key){

        case "ArrowUp":
            if(direcaoY === 0){
                direcaoX = 0;
                direcaoY = -1;
            }
            break;

        case "ArrowDown":
            if(direcaoY === 0){
                direcaoX = 0;
                direcaoY = 1;
            }
            break;

        case "ArrowLeft":
            if(direcaoX === 0){
                direcaoX = -1;
                direcaoY = 0;
            }
            break;

        case "ArrowRight":
            if(direcaoX === 0){
                direcaoX = 1;
                direcaoY = 0;
            }
            break;
    }
});

function reiniciarJogo(){

    let nome =
        document.getElementById("nomeJogador").value.trim();

    if(nome === ""){

        alert("Digite seu nome para começar!");
        return;
    }

    iniciarJogo();
}