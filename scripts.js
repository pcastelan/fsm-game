var canvas;
var context;
var barraW = 75;
var barraH = 25;
var score = 0;
var numeros = [];
var timer = 30;
var barraX, barraY;
var mouseX = 0, mouseY = 0;
var velocidade = 10;
var attTimer, escreveNum, attNum;
var limiteScore = 0;

window.onload = function () {
    //contexto
    canvas = document.getElementById('c');
    context = canvas.getContext('2d');

    barraX = (canvas.width / 2) - (barraW / 2);
    barraY = canvas.height - barraH;
    montaFase();

    
    
    //define o relogio

    timer = 30;
    
    //escreve numeros na tela            
    escreveNum = setInterval(escreveNumeros, 1000 / 30);

    //adiciona novos numeros a matriz de numeros
    attNum = setInterval(atualizaNumeros, 1000 / 1);

    //atualiza o relogio

    // if (timer > 0) {
    attTimer = setInterval(atualizaTimer, 1000);
    // }
    limiteScore = geraNumero()[0];


}
function moveBarra(e) {
    barraX = e.clientX;
    // barraX += e.clientX-mouseX;
    // mouseX = e.clientX;
    if((barraX+barraW)>canvas.width){
        barraX=barraX-barraW;
    }
    if ((barraX - barraW) < 0) {
        barraX = 0;
    }
    console.log('mousex: '+ mouseX + ', mousey: ' + mouseY);
}

function limpaTela() {
    // background
    context.fillStyle = '#aac0cf';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function montaFase() {
    limpaTela();


    //barrinha 

    context.fillStyle = '#674172';
    context.fillRect(barraX, barraY, barraW, barraH);


}

//gera um numero randomico inteiro dentre um intervalo
function limitaValor(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//gera um número randomico e sua posição
function geraNumero() {
    //numero, posicao y, posicao x
    var numero = [limitaValor(-50, 50), limitaValor(0, canvas.width), 120];
    return numero;
}

//escreve os números na tela e atualiza a sua posição
function escreveNumeros() {
    montaFase();
    atualizaScore(score);
    escreveLimiteScore();
    escreveTimer();
    context.font = "25px Segoe UI";
    context.fillStyle = "#446CB3";
    for (let i = 0; i < numeros.length; i++) {
        numeros[i][2] += velocidade;
        context.fillText(numeros[i][0], numeros[i][1], numeros[i][2]);
        if (numeros[i][2] >= barraY && (numeros[i][1] >= barraX && numeros[i][1] <= barraX + barraW)) {
            score += numeros[i][0];
            numeros.splice(i, 1);
        }
        if (numeros[i][2] > canvas.height+25) {
            numeros.splice(i, 1);
        }
        
    }
    canvas.addEventListener("mousemove", moveBarra, false);


}

//adiciona números a matriz de números
function atualizaNumeros() {
    numeros.push(geraNumero());

}

//descresce o relogio
function atualizaTimer() {
    if (timer == 0) {
        clearInterval(attTimer);
        clearInterval(escreveNum);
        clearInterval(attNum);
        return false;
    }
    timer--;
    
}
function escreveTimer() {
    context.font = "15px Segoe UI";
    context.fillStyle = "#333";
    context.fillText("Timer:", 200, 35);
    context.font = "20px Segoe UI";
    context.fillText(timer, 200, 55);

}
function atualizaScore(s) {

    context.font = "15px Segoe UI";
    context.fillStyle = "#333";
    context.fillText("Score:", 35, 35);
    context.font = "20px Segoe UI";
    context.fillText(s, 35, 55);
}

function escreveLimiteScore() {
    context.font = "15px Segoe UI";
    context.fillStyle = "#333";
    context.fillText("Limite:", 35, 75);
    context.font = "20px Segoe UI";
    context.fillText(limiteScore, 35, 95); 
}

// function ganhou() {
//     if (limiteScore == gn) {
        
//     }
// }