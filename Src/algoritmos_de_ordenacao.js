// Troca Dois Itens De Uma Lista Pelos Seus Índices
function trocarItensDaLista(lista,primeiroIndice,segundoIndice) {
    let itemASerTrocado = lista[segundoIndice];

    lista[segundoIndice] = lista[primeiroIndice];
    lista[primeiroIndice] = itemASerTrocado;
}

// Para A Continuidade De Alguma Função
function delay(delayEmMilisegundos) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayEmMilisegundos);
    });
}

// Implementa O Algoritmo Bubble Sort
async function bubbleSort(listaDeAlturas,tempoDeDelay=10) {
    do {
        var algumItemFoiTrocado = false;

        for (let indice = 0; indice < listaDeAlturas.length - 1; indice++) {
            if (listaDeAlturas[indice] > listaDeAlturas[indice + 1]) {
                trocarItensDaLista(listaDeAlturas,indice,indice+1);
                algumItemFoiTrocado = true;
            }
            await delay(tempoDeDelay);
        }
    } while(algumItemFoiTrocado);
}