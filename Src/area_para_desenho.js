class AreaParaDesenho {
    constructor(posicao, tamanho, numeroDeBarras, algoritmo, espacamentoDasBarras=2) {
        this.posicao = posicao;
        this.tamanho = tamanho;

        this.numeroDeBarras = numeroDeBarras;
        this.larguraDeCadaBarra = (this.tamanho.x - (this.numeroDeBarras - 1) * espacamentoDasBarras) / this.numeroDeBarras;
        this.alturaDeCadaBarra = this.tamanho.y / this.numeroDeBarras;

        this.algoritmo = algoritmo;

        this.espacamentoDasBarras = espacamentoDasBarras;

        this.alturasDosBlocos = this.embaralharAAulturaDosBlocos();

        console.log(this.alturasDosBlocos);

        this.algoritmo(this.alturasDosBlocos);
    }

    // Pega Um Número Inteiro Aleatório Entre Um Valor Minimo E Máximo
    pegarInteiroAleatorio(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Embaralha A Lista De Alturas Dos Blocos
    embaralharAAulturaDosBlocos() {
        let listaOrdenada = [];

        for (let indice = 0; indice < this.numeroDeBarras; indice++) {
            listaOrdenada[indice] = Math.ceil((indice + 1) * this.alturaDeCadaBarra);
        }

        let listaEmbaralhada = [];

        for (let indice = 0; indice < this.numeroDeBarras; indice++) {
            let indiceAleatorio = this.pegarInteiroAleatorio(0,listaOrdenada.length);
            let valorDaListaEscolhido = listaOrdenada.splice(indiceAleatorio, 1)[0];
            listaEmbaralhada.push(valorDaListaEscolhido);
        }

        return listaEmbaralhada;
    }

    // Desenha A Área Na Qual 
    desenharArea() {
        stroke(255);
        noFill();
        rect(this.posicao.x,this.posicao.y,this.tamanho.x,this.tamanho.y);
        let posicaoAtual = this.posicao.x;
        for(let indice = 0; indice < this.numeroDeBarras; indice++) {
            stroke(255);
            fill(255);
            rect(posicaoAtual,this.posicao.y + this.tamanho.y - this.alturasDosBlocos[indice],this.larguraDeCadaBarra,this.alturasDosBlocos[indice]);

            posicaoAtual += this.larguraDeCadaBarra;

            if (indice < this.numeroDeBarras - 1) {
                posicaoAtual += this.espacamentoDasBarras;
            }
        }
    }
}