// Troca Dois Itens De Uma Lista Pelos Seus Índices
async function trocarItensDaLista(lista,primeiroIndice,segundoIndice,tempoDeDelay=10) {
    await delay(tempoDeDelay);

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
async function bubbleSort(listaDeAlturas,tempoDeDelay=50) {
    do {
        var algumItemFoiTrocado = false;

        for (let indice = 0; indice < listaDeAlturas.length - 1; indice++) {
            if (listaDeAlturas[indice] > listaDeAlturas[indice + 1]) {
                await trocarItensDaLista(listaDeAlturas,indice,indice+1,tempoDeDelay);
                algumItemFoiTrocado = true;
            }
        }
    } while(algumItemFoiTrocado);
}

async function quickSort(listaDeAlturas,indiceInicio=0,indiceFinal=null,tempoDeDelay=0) {
    if (!indiceFinal) {
        indiceFinal = listaDeAlturas.length - 1;
    }

    if (indiceInicio >= indiceFinal) {
        return;
    }

    let indiceDeParticao = await particionar(listaDeAlturas, indiceInicio, indiceFinal,tempoDeDelay);
    await Promise.all([
        quickSort(listaDeAlturas, indiceInicio, indiceDeParticao - 1, tempoDeDelay),
        quickSort(listaDeAlturas, indiceDeParticao + 1, indiceFinal, tempoDeDelay)
    ]);
}

async function particionar(listaDeAlturas,indiceInicio,indiceFinal, tempoDeDelay) {
    let pivo = listaDeAlturas[indiceFinal];
    let indicePivo = indiceInicio;

    for (let indiceAtual = indiceInicio; indiceAtual < indiceFinal; indiceAtual++) {
        if (listaDeAlturas[indiceAtual] < pivo) {
            await trocarItensDaLista(listaDeAlturas,indiceAtual,indicePivo,tempoDeDelay);
            indicePivo++;
        }
    }

    await trocarItensDaLista(listaDeAlturas,indicePivo,indiceFinal,tempoDeDelay);

    return indicePivo;
}