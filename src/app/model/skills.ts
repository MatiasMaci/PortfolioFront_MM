export class Skills {

    id?: number;
    nombreSkill: string;
    percent: number;

    constructor(nombreSkill: string, percent: number) {

        this.nombreSkill = nombreSkill;
        this.percent = percent;
    }
}
