import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppGlobals } from 'src/app/globals/gloabls';
import { Formation } from 'src/app/models/formation';
import { Session } from 'src/app/models/session';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-session-of-formation',
  templateUrl: './session-of-formation.component.html',
  styleUrls: ['./session-of-formation.component.css']
})
export class SessionOfFormationComponent implements OnInit {
  public formation : Formation;
  public formationId : any;

  public participantId : number;
  public sessions : Session[];
  constructor(private userSerivce : UserService ,private _Activatedroute:ActivatedRoute,private globals :AppGlobals) { }

  ngOnInit(): void {
    this.getFormation();
    this.getParticipant();
  }

  public getParticipant():void {
    this.participantId=this.globals.getUserId();
  }
  public getFormation():void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.formationId = params.get('formatonId'); 
      this.userSerivce.getFormationById(this.formationId).subscribe(
        (response : Formation) => {
          this.formation=response;
          this.sessions=this.formation.sessions;
        }
      );
    });
}
public onEnrollSession(session:Session):void {
  this.userSerivce.updateParticipantSessions(this.participantId,session).subscribe(
    (response:any) => {
      this.getFormation();
      this.getParticipant();
    },
    (error:HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public searchSessions(key : string): void {
  const results: Session[] = [] ;
  for (const session of this.sessions) {
    let index : String = session.id.toString();
    let nbParticipant : string = session.nbParticipant.toString();
    let dateDebut: string = session.dateDebut.toString();
    let dateFin: string = session.dateFin.toString();
    if (index.toLowerCase().indexOf(key.toLowerCase()) !== -1 
    ||session.lieu.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ||dateDebut.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ||dateFin.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ||nbParticipant.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ||session.formateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ||session.formateur.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ||session.organisme.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
    
    ) {
      results.push(session);
    }
  }
  this.sessions=results;
  if(results.length === 0 || !key) {
    this.getFormation();
  }
  
}
}
