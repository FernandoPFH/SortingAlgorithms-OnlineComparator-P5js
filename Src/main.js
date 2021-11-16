// Variavel Para Reajustar Os Ponto Baseado Na Posição Da Tela
var tamanhoAtualCanvas;

var areaParaDesenho;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    areaParaDesenho = new AreaParaDesenho(createVector(0,0),createVector(windowWidth, windowHeight-5),300,"TODO");
}

function draw() {
    background(51);

    areaParaDesenho.desenharArea();
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}