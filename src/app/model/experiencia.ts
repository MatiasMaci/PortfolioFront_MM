export class Experiencia {
    id? : number;
    nombreEmpresa : string;
    infoPuesto: string;
    fechaInicio: string;
    fechaFin: string;
    imagen: string;

    constructor(nombreEmpresa: string, infoPuesto: string, fechaInicio: string, fechaFin: string, imagen: string) {
        this.nombreEmpresa = nombreEmpresa;
        this.infoPuesto = infoPuesto;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.imagen = imagen;
    }
}
