import { Formateur } from "./formateur";
import { Organisme } from "./organisme";
import { ParticipantInternational } from "./participantInternational";
import { ParticipantNational } from "./participantNational";

export class Session {
    id : number ;
    lieu:string;
    dateDebut:Date;
    dateFin:Date;
    nbParticipant:number;
    formateur:Formateur
    organisme:Organisme
    formations:Formateur[] | undefined;
    participants: ParticipantInternational[] | ParticipantNational[] | undefined;

}