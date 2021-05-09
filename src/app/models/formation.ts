
import { Domaine } from "./domaine";
import { Session } from "./session";

export class Formation {
    constructor(
    public titre : string,
    public typeFormation : string,
    public nbSession : number,
    public dateDebut : Date,
    public dateFin : Date,
    public budget : number,
    public domaine : Domaine,
    public id? : number,
    public sessions? : Session[] |undefined
   )
    {}
}