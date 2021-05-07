import { Pays } from "./pays";
import { Profile } from "./profile";
import { Session } from "./session";

export class ParticipantInternational {
    id : number ;
    nom : string;
    prenom:string;
    email:string;
    tel:number;
    profil:Profile;
    pays:Pays;
    sessions:Session[] |undefined;
}