class AreaParaDesenho {
    constructor(posicao, tamanho, numeroDeBarras, algoritmo, espacamentoDasBarras=2) {
        this.posicao = posicao;
        this.tamanho = tamanho;

        this.numeroDeBarras = numeroDeBarras;
        this.larguraDeCadaBarra = (this.tamanho.x - (this.numeroDeBarras - 1) * espacamentoDasBarras) / this.numeroDeBarras;
        this.alturaDeCadaBarra = this.tamanho.y / this.numeroDeBarras;

        this.algoritmo = algoritmo;

        this.espacamentoDasBarras = espacamentoDasBarras;

        this.alturasDosBlocos = [this.numeroDeBarras];

        for (let indice = 0; indice < this.numeroDeBarras; indice++) {
            this.alturasDosBlocos[indice] = indice * this.alturaDeCadaBarra;
        }
    }

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