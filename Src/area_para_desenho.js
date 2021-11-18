class AreaParaDesenho {
    constructor(posicao, tamanho, numeroDeBarras, espacamentoDasBarras=2) {
        this.posicao = posicao;
        this.tamanho = tamanho;

        this.numeroDeBarras = numeroDeBarras;
        this.larguraDeCadaBarra = (this.tamanho.x - (this.numeroDeBarras - 1) * espacamentoDasBarras) / this.numeroDeBarras;
        this.alturaDeCadaBarra = this.tamanho.y / this.numeroDeBarras;

        this.espacamentoDasBarras = espacamentoDasBarras;

        this.algoritmo = null;
    }

    // Sincroniza As Listas Das Alturas Dos Blocos
    sincronizarAlturasDosBlocos(alturasDosBlocos_Embaralhados,alturasDosBlocos_Gabaritos) {
        this.alturasDosBlocos = [...alturasDosBlocos_Embaralhados];

        this.alturasDosBlocos_Gabaritos = alturasDosBlocos_Gabaritos;
    }

    atualizarPosicaoETamanho(novaPosicao,novoTamanho) {
        this.posicao = novaPosicao;
        this.tamanho = novoTamanho;

        this.larguraDeCadaBarra = (this.tamanho.x - (this.numeroDeBarras - 1) * this.espacamentoDasBarras) / this.numeroDeBarras;
        this.alturaDeCadaBarra = this.tamanho.y / this.numeroDeBarras;
    }

    // Começa A Ordenar
    comecarAOrdenar() {
        this.algoritmo(this.alturasDosBlocos);
    }

    // Desenha A Área Na Qual Os Blocos Serão Desenhados
    desenharArea() {
        stroke(255);
        noFill();
        rect(this.posicao.x,this.posicao.y,this.tamanho.x,this.tamanho.y);
        let posicaoAtual = this.posicao.x;
        for(let indice = 0; indice < this.numeroDeBarras; indice++) {
            if (this.alturasDosBlocos[indice] == this.alturasDosBlocos_Gabaritos[indice]) {
                stroke(0,255,0);
                fill(0,255,0);
            } else {
                stroke(255);
                fill(255);
            }
            rect(posicaoAtual,this.posicao.y + this.tamanho.y - this.alturasDosBlocos[indice] * this.alturaDeCadaBarra,this.larguraDeCadaBarra,this.alturasDosBlocos[indice] * this.alturaDeCadaBarra);

            posicaoAtual += this.larguraDeCadaBarra;

            if (indice < this.numeroDeBarras - 1) {
                posicaoAtual += this.espacamentoDasBarras;
            }
        }
    }
}