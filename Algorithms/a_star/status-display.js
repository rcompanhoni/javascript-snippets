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
            
            case STATUS_NO_CHANGES:
                message = "Agente parado";
                break;

            case STATUS_MOVED:
                message = "Agente movimentando-se";
                break;

            case STATUS_ROUTE_DEFINED:
                message = "Rota definida (A*)";
                break;

            case STATUS_FOWARD_ROUTE:
                message = "Percorrendo rota (indo)";
                break;

            case STATUS_BACKWARDS_ROUTE:
                message = "Percorrendo rota (voltando)";
                break;

            case STATUS_DESTINATION_REACHED:
                message = "Destino encontrado";
                break;

            case STATUS_REFUELING:
                message = "Agente recarregando...";
                break;
        }

        this.displayStatus.value += message + '\n';
        this.displayStatus.scrollTop = this.displayStatus.scrollHeight;
    }
}