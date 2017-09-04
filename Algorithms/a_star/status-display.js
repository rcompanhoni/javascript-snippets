"use strict";

class StatusDisplay {
    constructor(worldSize) {
        this.displayStatus = document.getElementById('status-display');
        this.displayStatus.style.display = 'inline';
        this.displayStatus.style.width = '220px';
        this.displayStatus.style.height = ((worldSize * TILE_WIDTH) - 6).toString() + 'px';
        this.displayStatus.style.marginLeft = (worldSize * TILE_WIDTH + 5).toString() + 'px';
    }

    clear() {
        this.displayStatus.value = ""; 
    }

    print(message) {
        this.displayStatus.value += message + '\n';
        this.displayStatus.scrollTop = this.displayStatus.scrollHeight;
    }

    printStatus(status) {
        let message = "Status desconhecido";

        switch(status) {
            case STATUS_SPOT_CLEARED:
                message = "Localização limpa";
                break;
            
            case STATUS_STOPPED:
                message = "Agente parado";
                break;

            case STATUS_MOVED:
                message = "Agente movimentando-se";
                break;
        }

        this.displayStatus.value += message + '\n';
        this.displayStatus.scrollTop = this.displayStatus.scrollHeight;
    }
}