import { Pays } from "./pays";
import { Profile } from "./profile";
import { Session } from "./session";

export class ParticipantInternational {
    constructor (
    public nom : string,
    public prenom:string,
    public email:string,
    public tel:number,
    public profil:Profile,
    public pays:Pays,
    public sessions ?:Session[] |undefined,
    public  id? : number
    ) {}
}