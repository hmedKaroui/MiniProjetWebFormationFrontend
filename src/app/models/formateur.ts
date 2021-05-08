import { Organisme } from "./organisme";
import { Session } from "./session";

export class Formateur {
    constructor( 
    public nom:string,
    public prenom:string,
    public email:String,
    public tel:number,
    public type:string,
    public organisme :Organisme,
    public sessions? : Session[] |undefined,
    public id? : number
    ) {}
}