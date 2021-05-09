import { Formateur } from "./formateur";
import { Formation } from "./formation";
import { Organisme } from "./organisme";
import { ParticipantInternational } from "./participantInternational";
import { ParticipantNational } from "./participantNational";

export class Session {
    constructor(
    public lieu:string,
    public dateDebut:Date,
    public dateFin:Date,
    public nbParticipant:number,
    public formateur:Formateur,
    public organisme:Organisme,
    public id? : number,
    public formations?:Formation[] | undefined,
    public participantsN?:ParticipantNational[] | undefined,
    public participantsI?:ParticipantInternational[] | undefined,
   
    ) {}

}