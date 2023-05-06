export class Experiencia {
    id? : number;
    nombreEmpresa : string;
    infoPuesto : string;

    constructor(nombreEmpresa: string, infoPuesto: string) {
        this.nombreEmpresa = nombreEmpresa;
        this.infoPuesto = infoPuesto;
    }
}
