// Variavel Para Reajustar Os Ponto Baseado Na Posição Da Tela
var tamanhoAtualCanvas;

var areasParaDesenho;
var botao = null;

var opcoesDeAlgoritmosParaTestar = {
    "Bubble Sort": bubbleSort,
    "Quick Sort": quickSort,
    "Radix Sort": radixSort
}

// Pega Um Número Inteiro Aleatório Entre Um Valor Minimo E Máximo
function pegarInteiroAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Cria Uma Lista Ordenada Para Fazer Uma Comparação
function criarListaOrdenadaParaComparacao(numeroDeBarras) {
    let listaOrdenada = [];

    for (let indice = 0; indice < numeroDeBarras; indice++) {
        listaOrdenada[indice] = Math.ceil((indice + 1));
    }

    return listaOrdenada;
}

// Embaralha A Lista De Alturas Dos Blocos
function embaralharAAulturaDosBlocos(listaOrdenada) {
    let listaOrdenadaCopiada = [...listaOrdenada]

    let indiceAtual = listaOrdenadaCopiada.length,  indiceAleatorio;

    while (indiceAtual != 0) {
        indiceAleatorio = Math.floor(Math.random() * indiceAtual);
        indiceAtual--;

        [listaOrdenadaCopiada[indiceAtual], listaOrdenadaCopiada[indiceAleatorio]] = [
            listaOrdenadaCopiada[indiceAleatorio], listaOrdenadaCopiada[indiceAtual]];
    }

    return listaOrdenadaCopiada;
}

function preload() {
    let opcoesDeUmAlgoritmo_select = document.getElementById("Um_Algoritmo_Opcoes");
    let opcoesDeDoisAlgoritmosUm_select = document.getElementById("Dois_Algoritmos_Opcoes_Um");
    let opcoesDeDoisAlgoritmosDois_select = document.getElementById("Dois_Algoritmos_Opcoes_Dois");

    for (let chave in opcoesDeAlgoritmosParaTestar) {
        let elementoDeOpcaoDeUmAlgoritmo = document.createElement("option");
        elementoDeOpcaoDeUmAlgoritmo.value = chave;
        elementoDeOpcaoDeUmAlgoritmo.text = chave;
        
        let elementoDeOpcaoDeDoisAlgoritmosUm = document.createElement("option");
        elementoDeOpcaoDeDoisAlgoritmosUm.value = chave;
        elementoDeOpcaoDeDoisAlgoritmosUm.text = chave;
        
        let elementoDeOpcaoDeDoisAlgoritmosDois = document.createElement("option");
        elementoDeOpcaoDeDoisAlgoritmosDois.value = chave;
        elementoDeOpcaoDeDoisAlgoritmosDois.text = chave;

        opcoesDeUmAlgoritmo_select.appendChild(elementoDeOpcaoDeUmAlgoritmo);
        opcoesDeDoisAlgoritmosUm_select.appendChild(elementoDeOpcaoDeDoisAlgoritmosUm);
        opcoesDeDoisAlgoritmosDois_select.appendChild(elementoDeOpcaoDeDoisAlgoritmosDois);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    let areaParaDesenho = new AreaParaDesenho(createVector(0,0),createVector(windowWidth, windowHeight-5),150);

    let alturasOrdenadas = criarListaOrdenadaParaComparacao(150);
    let alturasEmbaralhadas = shuffle(alturasOrdenadas);

    areaParaDesenho.sincronizarAlturasDosBlocos(alturasEmbaralhadas,alturasOrdenadas);

    areasParaDesenho = [areaParaDesenho];
}

function draw() {
    background(51);

    areasParaDesenho.forEach(areaParaDesenho => {
        areaParaDesenho.desenharArea();
    });

    if (areasParaDesenho.length > 1) {
        if (areasParaDesenho.every(areaParaDesenho => {return areaParaDesenho.terminou})) {
            botao.desenhar();
        }
    }
}

function reiniciarMenuPrincipal() {
    let areaParaDesenho = new AreaParaDesenho(createVector(0,0),createVector(windowWidth, windowHeight-5),150);

    let alturasOrdenadas = criarListaOrdenadaParaComparacao(150);
    let alturasEmbaralhadas = shuffle(alturasOrdenadas);

    areaParaDesenho.sincronizarAlturasDosBlocos(alturasEmbaralhadas,alturasOrdenadas);

    areasParaDesenho = [areaParaDesenho];

    document.getElementById("Menu_Principal").style.display = "flex";
}

function mouseClicked() {
    let posicaoDoMouse = createVector(mouseX,mouseY);
    if (areasParaDesenho.length == 1) {
        for (let indice = 0; indice < areasParaDesenho.length; indice++) {
            if (areasParaDesenho[indice].botao) {
                if (areasParaDesenho[indice].botao.mouseEstaEmCima(posicaoDoMouse)) {
                    if (areasParaDesenho[indice].botao.funcaoAoClicar) {
                        areasParaDesenho[indice].botao.funcaoAoClicar();
                    }
                }
            }
        }
    } else {
        if (botao) {
            if (botao.mouseEstaEmCima(posicaoDoMouse)) {
                if (botao.funcaoAoClicar) {
                    botao.funcaoAoClicar();
                }
            }
        }
    }
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    for (let indice = 0; indice < areasParaDesenho.length; indice++) {
        let novaPosicaoXDaArea = (areasParaDesenho[indice].posicao.x) * (windowWidth) / (tamanhoAtualCanvas.x);
        let novaPosicaoYDaArea = (areasParaDesenho[indice].posicao.y) * (windowHeight) / (tamanhoAtualCanvas.y);

        let novoTamanhoXDaArea = (areasParaDesenho[indice].tamanho.x) * (windowWidth) / (tamanhoAtualCanvas.x);
        let novoTamanhoYDaArea = (areasParaDesenho[indice].tamanho.y) * (windowHeight) / (tamanhoAtualCanvas.y);

        areasParaDesenho[indice].atualizarPosicaoETamanho(createVector(novaPosicaoXDaArea,novaPosicaoYDaArea),createVector(novoTamanhoXDaArea,novoTamanhoYDaArea));
    }
    
    if (areasParaDesenho.length > 1) {
        if (areasParaDesenho.every(areaParaDesenho => {return areaParaDesenho.terminou})) {
            let novaPosicaoXDoBotao = (botao.posicao.x) * (windowWidth) / (tamanhoAtualCanvas.x);
            let novaPosicaoYDoBotao = (botao.posicao.y) * (windowHeight) / (tamanhoAtualCanvas.y);
    
            let novoTamanhoXDoBotao = (botao.tamanho.x) * (windowWidth) / (tamanhoAtualCanvas.x);
            let novoTamanhoYDoBotao = (botao.tamanho.y) * (windowHeight) / (tamanhoAtualCanvas.y);
            botao.atualizarPosicaoETamanho(createVector(novaPosicaoXDoBotao,novaPosicaoYDoBotao),createVector(novoTamanhoXDoBotao,novoTamanhoYDoBotao));
        }
    }
    
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}