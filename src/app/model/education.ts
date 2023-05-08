export class Education {

    id?: number;
    nombreCurso: string;
    infoCurso: string;
    fechaInicio: string;
    fechaFin: string;
    imagen: string;

    constructor(nombreCurso: string, infoCurso: string, fechaInicio: string, fechaFin: string, imagen: string) {
        this.nombreCurso = nombreCurso;
        this.infoCurso = infoCurso;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.imagen = imagen;
    }
}
