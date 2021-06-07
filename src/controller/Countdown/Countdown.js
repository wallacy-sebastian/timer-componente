export default class Countdown {
    constructor(minutos = 0, segundos = 0, contador = null) {
        this.minutos = parseInt(minutos);
        this.segundos = parseInt(segundos);

        this.criarContador(contador);

        this.escreverMinutos();
        this.escreverSegundos();
    }

    criarContador(contador = null) {
        if(contador === null) {
            contador = document.getElementsByClassName("timer-clock")[0];
        }
        let digito = document.createElement("span");

        this.tempo = {
            minutos: [contador.appendChild(digito.cloneNode()),
                        contador.appendChild(digito.cloneNode())],
            segundos: [contador.appendChild(digito.cloneNode()),
                        contador.appendChild(digito.cloneNode())],
        }
    }

    escreverMinutos() {
        let minutos = this.minutos.toLocaleString('pt-BR', { minimumIntegerDigits: 2, useGrouping: false });

        this.tempo.minutos[0].innerHTML = minutos[0];
        this.tempo.minutos[1].innerHTML = minutos[1];
    }

    escreverSegundos() {
        let segundos = this.segundos.toLocaleString('pt-BR', { minimumIntegerDigits: 2, useGrouping: false });

        this.tempo.segundos[0].innerHTML = segundos[0];
        this.tempo.segundos[1].innerHTML = segundos[1];
    }

    async iniciar() {
        if(this.minutos === 0 && this.segundos === 0) {
            return true;
        }

        return await new Promise(resolve => {
            this.executando = setInterval(() => {
                if(this.segundos <= 0 && this.minutos > 0) {
                    this.segundos = 59;
                    this.minutos--;
    
                    this.escreverMinutos();
                }
                else {
                    this.segundos--;
                };

                this.escreverSegundos();

                if(this.segundos <= 0 && this.minutos <= 0) {
                    resolve(true);
                    clearInterval(this.executando);
                }
            }, 1000);
        });
    }

    parar() {
        clearInterval(this.executando);
    }
}