class Botao {
    constructor(posicao,tamanho,borda=0,cor,texto,funcaoAoClicar,tamanhoDoTexto=5,corDoTexto=color(0,0,0)) {
        this.posicao = posicao;
        this.tamanho = tamanho;
        this.tamanhoBorda = borda;
        this.cor = cor;
        this.texto = texto;
        this.funcaoAoClicar = funcaoAoClicar;
        this.tamanhoDoTexto = tamanhoDoTexto;
        this.corDoTexto = corDoTexto;

        this.verticesDoBotao = [
            createVector(this.posicao.x,this.posicao.y),
            createVector(this.posicao.x + this.tamanho.x,this.posicao.y),
            createVector(this.posicao.x + this.tamanho.x,this.posicao.y + this.tamanho.y),
            createVector(this.posicao.x,this.posicao.y + this.tamanho.y)
        ];

        this.areaDoBotao = Math.sqrt((this.verticesDoBotao[0].x - this.verticesDoBotao[1].x)**2 + (this.verticesDoBotao[0].y - this.verticesDoBotao[1].y)**2) * Math.sqrt((this.verticesDoBotao[1].x - this.verticesDoBotao[2].x)**2 + (this.verticesDoBotao[1].y - this.verticesDoBotao[2].y)**2);
    }

    calcularAreaDeTriangulo(verticeUm,verticeDois,verticeTres) {
        return Math.abs((verticeUm.x*verticeDois.y + verticeUm.y*verticeTres.x + verticeDois.x*verticeTres.y - (verticeUm.y*verticeDois.x + verticeUm.x*verticeTres.y + verticeDois.y*verticeTres.x))) / 2;
    }

    mouseEstaEmCima(posicaoDoMouse) {
        let areasEmRelacaoAoPontoDoMouse = [];

        for (let indice = 0; indice < this.verticesDoBotao.length; indice++) {
            if (indice != this.verticesDoBotao.length - 1) {
                areasEmRelacaoAoPontoDoMouse.push(this.calcularAreaDeTriangulo(this.verticesDoBotao[indice],this.verticesDoBotao[indice+1],posicaoDoMouse));
            } else {
                areasEmRelacaoAoPontoDoMouse.push(this.calcularAreaDeTriangulo(this.verticesDoBotao[indice],this.verticesDoBotao[0],posicaoDoMouse));
            }
        }

        return areasEmRelacaoAoPontoDoMouse.reduce((a, b) => a + b, 0).toFixed(2) == this.areaDoBotao.toFixed(2);
    }

    atualizarPosicaoETamanho(novaPosicao,novotamanho) {
        this.posicao = novaPosicao;
        this.tamanho = novotamanho;

        this.verticesDoBotao = [
            createVector(this.posicao.x,this.posicao.y),
            createVector(this.posicao.x + this.tamanho.x,this.posicao.y),
            createVector(this.posicao.x + this.tamanho.x,this.posicao.y + this.tamanho.y),
            createVector(this.posicao.x,this.posicao.y + this.tamanho.y)
        ];

        this.areaDoBotao = Math.sqrt((this.verticesDoBotao[0].x - this.verticesDoBotao[1].x)**2 + (this.verticesDoBotao[0].y - this.verticesDoBotao[1].y)**2) * Math.sqrt((this.verticesDoBotao[1].x - this.verticesDoBotao[2].x)**2 + (this.verticesDoBotao[1].y - this.verticesDoBotao[2].y)**2);
    }

    desenhar() {
        stroke(this.cor);
        fill(this.cor);
        rect(this.posicao.x,this.posicao.y,this.tamanho.x,this.tamanho.y,this.tamanhoBorda);

        let posicaoDoTexto = createVector(
            this.posicao.x,
            this.posicao.y + 25
        );


        stroke(this.corDoTexto);
        fill(this.corDoTexto);
        textSize(this.tamanhoDoTexto);

        if (textWidth(this.texto) > this.tamanho.x) {
            let tamanhoDoTexto = (this.tamanho.x * 0.9) * this.tamanhoDoTexto / textWidth(this.texto);

            textSize(tamanhoDoTexto);
        }

        textAlign(CENTER);
        text(this.texto,posicaoDoTexto.x,posicaoDoTexto.y,this.tamanho.x,this.tamanho.y);
    }
}