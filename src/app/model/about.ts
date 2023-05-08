export class About {

    id?: number;
    informacion: string;
    ciudad: string;
    provincia: string;
    edad: number;

    constructor(informacion: string, ciudad: string, provincia: string, edad: number) {
        this.informacion = informacion;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.edad = edad;
    }

}
