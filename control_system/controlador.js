var Sensor = require('./sensor');

module.exports = class Controlador {
    constructor() {
        const sensorTemperatura = new Sensor(this);
        const sensorPressao = new Sensor(this);
        this.sensores = [sensorTemperatura, sensorPressao];
        this.valvulas = [false, false];
    }

    // bool setH(n) – habilita o sensor “n” (1- temperatura; 2- pressão) e retorna true.Se o sensor já está habilitado, não altera nada e retorna false.
    setH(n) {
        return this.sensores[n].setH();
    }

    // bool resetH(n) – desabilita o sensor “n” e retorna true. Se o sensor já está desabilitado, não altera nada e retorna false.
    resetH(n) {
        return this.sensores[n].resetH();
    }

    // void alerta(n) - usado pelo sensor para avisar o controlador de que está em alerta. O controlador deve abrir a válvula correspondente.
    alerta(n) {
        this.open(n);
    }

    // void resetAlerta() - usado pelo sensor para avisar que não está mais em alerta. O controlador deve fechar a válvula correspondente.
    resetAlerta(n) {
        this.fecha(n);
    }

    // void open(n) – abre a válvula “n”.
    open(n) {
        this.valvulas[n] = true;
    }

    // void fecha(n) – fecha a válvula “n”.
    fecha(n) {
        this.valvulas[n] = false;
    }

    // bool getV(n) – retorna o status da válvula “n” – true se está aberta e false caso esteja fechada
    getV(n) {
        return this.valvulas[n];
    }
}


