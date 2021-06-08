import Timer from "/controller/Timer/Timer.js";

window.onload = function() {
    var elementos = document.getElementsByClassName("timer");
    
    Array.from(elementos).forEach(timer => {
        new Timer("0", "3", timer);
    });
}