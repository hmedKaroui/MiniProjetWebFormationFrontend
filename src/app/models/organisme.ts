
import { Formateur } from "./formateur";
import { ParticipantNational } from "./participantNational";
import { Session } from "./session";

export class Organisme {
    constructor(
        public libelle:string,
        public id? : number,
        public formateurs? : Formateur[],
        public participantsNational? : ParticipantNational[],
        public sessions? : Session[]
    ) {}
}