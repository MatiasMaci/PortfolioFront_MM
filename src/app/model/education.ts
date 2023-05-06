export class Education {

    id?: number;
    nombreCurso: string;
    infoCurso: string;

    constructor(nombreCurso: string, infoCurso: string) {
        this.nombreCurso = nombreCurso;
        this.infoCurso = infoCurso;
    }
}
