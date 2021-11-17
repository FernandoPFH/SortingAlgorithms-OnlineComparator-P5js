function selecionarAreaUmAlgoritmo() {
    document.getElementById("Selecionar_Area_Um_Algoritmo").classList.add("Botao_Selecionado");
    document.getElementById("Selecionar_Area_Dois_Algoritmos").classList.remove("Botao_Selecionado");

    document.getElementById("Um_Algoritmo").classList.add("Input_Algoritmo_Selecionado");
    document.getElementById("Dois_Algoritmos").classList.remove("Input_Algoritmo_Selecionado");
}
function selecionarAreaDoisAlgoritmos() {
    document.getElementById("Selecionar_Area_Dois_Algoritmos").classList.add("Botao_Selecionado");
    document.getElementById("Selecionar_Area_Um_Algoritmo").classList.remove("Botao_Selecionado");
    
    document.getElementById("Dois_Algoritmos").classList.add("Input_Algoritmo_Selecionado");
    document.getElementById("Um_Algoritmo").classList.remove("Input_Algoritmo_Selecionado");
}

function umAlgoritmoComecar() {
    let opcoesDeAlgoritmo_select = document.getElementById("Um_Algoritmo_Opcoes");

    let numeroDeBlocos = document.getElementById("Um_Algoritmo_Numero_De_Blocos").value;

    areasParaDesenho = [];

    let areaParaDesenhoUmAlgoritmo = new AreaParaDesenho(createVector(0,0),createVector(windowWidth, windowHeight-5),numeroDeBlocos);

    areaParaDesenhoUmAlgoritmo.algoritmo = opcoesDeAlgoritmosParaTestar[opcoesDeAlgoritmo_select.value];

    let alturasOrdenadas = criarListaOrdenadaParaComparacao(numeroDeBlocos,areaParaDesenhoUmAlgoritmo.alturaDeCadaBarra);
    let alturasEmbaralhadas = shuffle(alturasOrdenadas);

    areaParaDesenhoUmAlgoritmo.sincronizarAlturasDosBlocos(alturasEmbaralhadas,alturasOrdenadas);

    areasParaDesenho.push(areaParaDesenhoUmAlgoritmo);

    areaParaDesenhoUmAlgoritmo.comecarAOrdenar();

    document.getElementById("Menu_Principal").style.display = "none";
}

function doisAlgoritmosComecar() {
    let opcoesDeAlgoritmoUm_select = document.getElementById("Dois_Algoritmos_Opcoes_Um");
    let opcoesDeAlgoritmoDois_select = document.getElementById("Dois_Algoritmos_Opcoes_Dois");

    let numeroDeBlocos = document.getElementById("Dois_Algoritmos_Numero_De_Blocos").value;

    areasParaDesenho = [];

    let areaParaDesenhoAlgoritmoUm = new AreaParaDesenho(createVector(0,80),createVector(windowWidth/2, windowHeight-100),numeroDeBlocos);
    let areaParaDesenhoAlgoritmoDois = new AreaParaDesenho(createVector(windowWidth/2,80),createVector(windowWidth/2, windowHeight-100),numeroDeBlocos);

    areaParaDesenhoAlgoritmoUm.algoritmo = opcoesDeAlgoritmosParaTestar[opcoesDeAlgoritmoUm_select.value];
    areaParaDesenhoAlgoritmoDois.algoritmo = opcoesDeAlgoritmosParaTestar[opcoesDeAlgoritmoDois_select.value];

    let alturasOrdenadas = criarListaOrdenadaParaComparacao(numeroDeBlocos,areaParaDesenhoAlgoritmoUm.alturaDeCadaBarra);
    let alturasEmbaralhadas = shuffle(alturasOrdenadas);

    areaParaDesenhoAlgoritmoUm.sincronizarAlturasDosBlocos(alturasEmbaralhadas,alturasOrdenadas);
    areaParaDesenhoAlgoritmoDois.sincronizarAlturasDosBlocos(alturasEmbaralhadas,alturasOrdenadas);

    areasParaDesenho.push(areaParaDesenhoAlgoritmoUm);
    areasParaDesenho.push(areaParaDesenhoAlgoritmoDois);

    areaParaDesenhoAlgoritmoUm.comecarAOrdenar();
    areaParaDesenhoAlgoritmoDois.comecarAOrdenar();

    document.getElementById("Menu_Principal").style.display = "none";
}

function mudarDisplay(elemento) {
    elemento.parentElement.children[1].innerHTML = elemento.value;
}