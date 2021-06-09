import Countdown from "/controller/Countdown/Countdown.js";

export default class Timer extends Countdown {
    constructor(minutos = 0, segundos = 0, timer = null) {
        if(timer === null) {
            timer = document.querySelector('.timer');
        }
        
        let contador = document.createElement('div');

        ['timer-clock', 'w-100', 'd-flex', 'justify-content-center'].forEach(classe => {
            contador.classList.add(classe);
        });
        
        timer.appendChild(contador);

        super(minutos, segundos, contador);

        this.minutosInicial = parseInt(minutos);
        this.segundosInicial = parseInt(segundos);

        this.iniciar = this.iniciar.bind(this);
        this.parar = this.parar.bind(this);
        this.restaurar = this.restaurar.bind(this);

        this.criarBotao(timer);

        if (!("Notification" in window)) {
            console.log("Esse navegador não suporta notificações de desktop");
        }
        else {
            Notification.requestPermission();
        }

        this.audioTerminou = new Audio('/assets/sounds/alarm-clock.mp3');
        this.timerAudio = new Audio('/assets/sounds/clock-ticking.mp3');
        this.timerAudio.loop = true;
    }

    criarBotao(timer) {
        let timerButtonParent = document.createElement('div');
        
        ['timer-button', 'd-flex', 'flex-row', 'justify-content-around', 'w-100'].forEach(classe => {
            timerButtonParent.classList.add(classe);
        });

        this.timerButton = document.createElement("button");
        this.timerButton.innerHTML = 'Iniciar';
        this.timerButton.addEventListener("click", this.iniciar, false);
        
        this.timerButtonRestore = document.createElement("button");
        this.timerButtonRestore.innerHTML = 'Restaurar';
        this.timerButtonRestore.addEventListener("click", this.restaurar, false);

        ['btn', 'd-flex', 'flex-row', 'justify-content-center', 'align-items-center'].forEach(classe => {
            this.timerButton.classList.add(classe);
            this.timerButtonRestore.classList.add(classe);
        });
        
        this.timerButton.classList.add('btn-primary');
        this.timerButtonRestore.classList.add('btn-secondary');
        this.timerButtonRestore.disabled = true;

        timerButtonParent.appendChild(this.timerButton);
        timerButtonParent.appendChild(this.timerButtonRestore);
        timer.appendChild(timerButtonParent);
    }

    async iniciar() {
        this.timerButton.innerHTML = "Parar";
        this.timerButton.classList.remove("btn-primary");
        this.timerButton.classList.add("btn-danger");
        this.timerButton.removeEventListener("click", this.iniciar, false);
        this.timerButton.addEventListener("click", this.parar, false);
        this.timerButtonRestore.disabled = true;

        this.timerAudio.play();

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
        this.timerButtonRestore.removeAttribute('disabled');

        this.timerAudio.pause();

        if(this.segundos === 0 && this.minutos === 0) {
            if(Notification.permission === 'granted') {
                let notificacao = new Notification(
                    "Terminou!", {
                        body: 'O Timer expirou.',
                        icon: '../../assets/icons/timer.png'});
                this.audioTerminou.play();
            }
        }
    }

    restaurar() {
        this.minutos = this.minutosInicial;
        this.segundos = this.segundosInicial;

        super.escreverMinutos();
        super.escreverSegundos();

        this.timerButtonRestore.disabled = true;
    }
}