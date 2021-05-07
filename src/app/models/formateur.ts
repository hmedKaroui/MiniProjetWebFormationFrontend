import { Organisme } from "./organisme";
import { Session } from "./session";

export class Formateur {
    id : number ;
    nom:string;
    prenom:string;
    email:String;
    tel:number;
    type:string;
    organisme:Organisme;
    sessions: Session[] |undefined;

}