import Countdown from "/controller/Countdown/Countdown.js";

export default class Timer extends Countdown {
    constructor(minutos = 0, segundos = 0) {
        let timer = document.querySelector('.timer');
        
        let contador = document.createElement('div');
        contador.classList.add('timer-clock');
        
        timer.appendChild(contador);

        super(minutos, segundos, contador);

        this.iniciar = this.iniciar.bind(this);
        this.parar = this.parar.bind(this);

        this.criarBotao(timer);

        if (!("Notification" in window)) {
            console.log("Esse navegador não suporta notificações de desktop");
        }
        else {
            Notification.requestPermission();
        }
    }

    criarBotao(timer) {
        let timerButtonParent = document.createElement('div');
        let timerButtonClasses = ['btn', 'btn-primary', 'd-flex', 'flex-row', 'justify-content-center', 'align-items-center'];
        
        timerButtonParent.classList.add('timer-button');

        this.timerButton = document.createElement("button");
        this.timerButton.innerHTML = 'Iniciar';
        this.timerButton.addEventListener("click", this.iniciar, false);
        timerButtonClasses.forEach(classe => {
            this.timerButton.classList.add(classe);
        });

        timerButtonParent.appendChild(this.timerButton);
        timer.appendChild(timerButtonParent);
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

        

        if(this.segundos === 0 && this.minutos === 0) {
            if(Notification.permission === 'granted') {
                let notificacao = new Notification(
                    "Terminou!", {
                        body: 'O Timer expirou.',
                        icon: '../../assets/icons/timer.png'});

                let audio = new Audio('/assets/sounds/alarm-clock.mp3');
                audio.play();
            }
        }
    }
}