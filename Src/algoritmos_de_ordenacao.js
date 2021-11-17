// Para A Continuidade De Alguma Função
function delay(delayEmMilisegundos) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayEmMilisegundos);
    });
}

// Troca Dois Itens De Uma Lista Pelos Seus Índices
async function trocarItensDaLista(lista,primeiroIndice,segundoIndice,tempoDeDelay=10) {
    await delay(tempoDeDelay);

    let itemASerTrocado = lista[segundoIndice];

    lista[segundoIndice] = lista[primeiroIndice];
    lista[primeiroIndice] = itemASerTrocado;
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

// Divide A Lista
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

// Implementa O Algoritmo Quick Sort
async function quickSort(listaDeAlturas,indiceInicio=0,indiceFinal=null,tempoDeDelay=50) {
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

async function readicionarALista(listaDeAlturas,listasDeValores,tempoDeDelay=10) {
    let listaDeAlturasOrdenadas = []

    for (let indiceDasListasDeValor = 0; indiceDasListasDeValor < listasDeValores.length; indiceDasListasDeValor++) {
        for (let indiceDaListaDeValor = 0; indiceDaListaDeValor < listasDeValores[indiceDasListasDeValor].length; indiceDaListaDeValor++) {
            listaDeAlturasOrdenadas.push(listasDeValores[indiceDasListasDeValor][indiceDaListaDeValor]);
        }
    }

    for (let indice = 0; indice < listaDeAlturasOrdenadas.length; indice++) {
        await delay(tempoDeDelay);
        listaDeAlturas[indice] = listaDeAlturasOrdenadas[indice];
    }
}

async function radixSort(listaDeAlturas,tempoDeDelay=50) {
    let numeroMaisAltoDaLista = Math.max.apply(null, listaDeAlturas);

    let numeroDeDigitosMaximo = numeroMaisAltoDaLista.toString().length;

    for (let digito = 0; digito < numeroDeDigitosMaximo; digito++) {
        let listasDeValores = [[],[],[],[],[],[],[],[],[],[]];

        for (let indiceDaLista = 0; indiceDaLista < listaDeAlturas.length; indiceDaLista++) {

            let valorDoDigitoASerConsiderado = Math.floor(listaDeAlturas[indiceDaLista] / 10 ** (digito)) % 10;

            listasDeValores[valorDoDigitoASerConsiderado].push(listaDeAlturas[indiceDaLista]);
        }

        await readicionarALista(listaDeAlturas,listasDeValores,tempoDeDelay);
    }
}