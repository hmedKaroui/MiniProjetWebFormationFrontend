import { Formation } from "./formation";

export class Domaine {
    constructor(
    public libelle:string,
    public id? : number,
    public formations?:Formation[]  )
    {}
}