import { Organisme } from "./organisme";
import { Profile } from "./profile";
import { Session } from "./session";

export class ParticipantNational {
    constructor(
        public nom : string,
        public prenom:string,
        public email:string,
        public tel:number,
        public profil:Profile,
        public organisme:Organisme| undefined,
        public sessions?:Session[] |undefined,
        public  id? : number
    ) {}
}