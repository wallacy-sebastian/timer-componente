import Countdown from "../Countdown/Countdown.js";

export default class Timer extends Countdown {
    constructor(minutos, segundos) {
        super(minutos, segundos);

        this.iniciar = this.iniciar.bind(this);
        this.parar = this.parar.bind(this);

        this.timerButton = document.querySelector('.timer-button button');
        this.timerButton.addEventListener("click", this.iniciar, false);
    }

    async iniciar() {
        this.timerButton.innerHTML = "Parar";
        this.timerButton.classList.remove("btn-primary");
        this.timerButton.classList.add("btn-danger");
        this.timerButton.removeEventListener("click", this.iniciar, false);
        this.timerButton.addEventListener("click", this.parar, false);

        let terminou = await super.iniciar();

        if(terminou) {
            this.parar();
        }
    }

    parar() {
        super.parar();

        this.minutos = parseInt(
            this.tempo.minutos[0].innerHTML
            +this.tempo.minutos[1].innerHTML);

        this.segundos = parseInt(
            this.tempo.segundos[0].innerHTML
            +this.tempo.segundos[1].innerHTML);

        this.timerButton.innerHTML = "Iniciar";
        this.timerButton.classList.remove("btn-danger");
        this.timerButton.classList.add("btn-primary");
        this.timerButton.removeEventListener("click", this.parar, false);
        this.timerButton.addEventListener("click", this.iniciar, false);
    }

}