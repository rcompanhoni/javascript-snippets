module.exports = class Sensor {
    constructor(controlador) {
        this.controlador = controlador;
        this.habilitado = false;
        this.alertado = false;
    }

    // bool setH() – habilita o sensor. Se o sensor já está habilitado, não altera nada e retorna false, caso contrário retorna true.
    setH() {
        if (this.habilitado)
            return false;

        this.habilitado = true;
        return true;
    }

    // bool resetH() – desabilita o sensor. Se o sensor já está desabilitado, não altera nada e retorna false.
    resetH() {
        if (!this.habilitado)
            return false;

        this.habilitado = false;
        return true;
    }

    // bool getH() – retorna true se o sensor está habilitado e false caso contrário.
    getH() {
        return this.habilitado;
    }

    // bool setAlerta() - se o sensor está habilitado, passa o sensor para o estado de alerta, notifica o controlador e retorna true. Se o sensor já está em alerta ou está
    // desabilitado, não altera nada e retorna false.
    setAlerta() {
        if (this.alertado || !this.getH())
            return false; 

        this.alertado = true;
        // TODO -- notificar o controlador
        return true;
    }

    // bool resetAlerta() - se o sensor está alerta, passa o sensor para o estado habilitado, notifica o controlador e retorna true. Se o sensor não está em alerta,
    // não altera nada e retorna false.
    resetAlerta() {
        if (!this.alertado) 
            return false;

        this.alertado = false;
        // TODO -- notificar o controlador
        return true;
    }

    // bool getAlerta() – retorna true se o sensor está alerta e false caso contrário.
    getAlerta() {
        return this.alertado;
    }
}

