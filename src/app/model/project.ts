export class Project {

    id?: number;
    nombreProject: string;
    informacion: string;

    constructor(nombreProject: string, informacion: string) {
        this.nombreProject = nombreProject;
        this.informacion = informacion;
    }
}