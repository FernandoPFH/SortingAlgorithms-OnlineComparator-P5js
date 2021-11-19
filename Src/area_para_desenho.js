class AreaParaDesenho {
    constructor(nome,posicao, tamanho, numeroDeBarras, espacamentoDasBarras=2) {
        this.nome = nome;

        this.posicao = posicao;
        this.tamanho = tamanho;

        this.numeroDeBarras = numeroDeBarras;
        this.larguraDeCadaBarra = (this.tamanho.x - (this.numeroDeBarras - 1) * espacamentoDasBarras) / this.numeroDeBarras;
        this.alturaDeCadaBarra = this.tamanho.y / this.numeroDeBarras;

        this.espacamentoDasBarras = espacamentoDasBarras;

        this.algoritmo = null;

        this.terminou = false;
        this.deveMostrarBotaoAoFinal = false;

        this.tempoQuandoComecou = null;
        this.tempoQuandoTerminou = null;

        this.botao = null;
    }

    // Sincroniza As Listas Das Alturas Dos Blocos
    sincronizarAlturasDosBlocos(alturasDosBlocos_Embaralhados,alturasDosBlocos_Gabaritos) {
        this.alturasDosBlocos = [...alturasDosBlocos_Embaralhados];

        this.alturasDosBlocos_Gabaritos = alturasDosBlocos_Gabaritos;
    }

    // Atualiza O Tamanho
    atualizarPosicaoETamanho(novaPosicao,novoTamanho) {
        this.posicao = novaPosicao;
        this.tamanho = novoTamanho;

        this.larguraDeCadaBarra = (this.tamanho.x - (this.numeroDeBarras - 1) * this.espacamentoDasBarras) / this.numeroDeBarras;
        this.alturaDeCadaBarra = this.tamanho.y / this.numeroDeBarras;
    }

    // Começa A Ordenar
    async comecarAOrdenar(deveMostrarBotaoAoFinal) {
        this.tempoQuandoComecou = Date.now();

        await this.algoritmo(this.alturasDosBlocos);

        this.tempoQuandoTerminou = Date.now();

        this.terminou = true;

        if (deveMostrarBotaoAoFinal) {
            if (areasParaDesenho.indexOf(this) == 0) {
                this.botao = new Botao(this.posicao,this.tamanho,10,color(0,150,0),"Reiniciar",reiniciarMenuPrincipal,30);
            }
        }
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

        stroke(0,255,255);
        fill(0,255,255);
        textSize(this.tamanho.x*0.05);
        textAlign(LEFT);
        text(this.nome,this.posicao.x + 20,this.posicao.y + this.tamanho.x*0.05);

        if (this.terminou) {
            stroke(color(64,64,64,230));
            fill(color(64,64,64,230));
            rect(this.posicao.x,this.posicao.y,this.tamanho.x,this.tamanho.y);

            let novaPosicaoDoMenu = createVector(
                this.posicao.x + 3 * this.tamanho.x/8,
                this.posicao.y + 3 * this.tamanho.y/8
            );

            let novoTamanhoDoMenu = createVector(
                this.tamanho.x/4,
                this.tamanho.y/4
            );

            stroke(color(200,200,200,230));
            fill(color(200,200,200,230));
            rect(novaPosicaoDoMenu.x,novaPosicaoDoMenu.y,novoTamanhoDoMenu.x,novoTamanhoDoMenu.y);

            stroke(color(0,0,0));
            fill(color(0,0,0));
            textSize(30);
            textAlign(CENTER);
            text("Teminou!",novaPosicaoDoMenu.x,novaPosicaoDoMenu.y + 20,novoTamanhoDoMenu.x,novoTamanhoDoMenu.y);
            text(`Tempo: ${(this.tempoQuandoTerminou - this.tempoQuandoComecou) / 1000}s`,novaPosicaoDoMenu.x,novaPosicaoDoMenu.y + 100,novoTamanhoDoMenu.x,novoTamanhoDoMenu.y)
        
            if (this.botao) {

                let novaPosicaoDoBotao = createVector(
                    novaPosicaoDoMenu.x + 3 * novoTamanhoDoMenu.x/8,
                    novaPosicaoDoMenu.y + 3 * novoTamanhoDoMenu.y/8 + 60
                );
    
                let novoTamanhoDoBotao = createVector(
                    novoTamanhoDoMenu.x/4,
                    novoTamanhoDoMenu.y/4
                );
                this.botao.atualizarPosicaoETamanho(novaPosicaoDoBotao,novoTamanhoDoBotao);
                this.botao.desenhar();
            }
        }
    }
}