
import { Domaine } from "./domaine";
import { Session } from "./session";

export class Formation {
    id : number;
    titre : string;
    typeFormation : string;
    nbSession : number;
    dateDebut : Date;
    dateFin : Date;
    budget : number;
    domaine : Domaine;
    sessions : Session[] |undefined;
}