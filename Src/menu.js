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

function mudarDisplay(elemento) {
    elemento.parentElement.children[1].innerHTML = elemento.value;
}