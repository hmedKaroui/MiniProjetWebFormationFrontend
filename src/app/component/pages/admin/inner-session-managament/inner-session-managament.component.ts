import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/models/formation';
import { ParticipantInternational } from 'src/app/models/participantInternational';
import { ParticipantNational } from 'src/app/models/participantNational';
import { Session } from 'src/app/models/session';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-inner-session-managament',
  templateUrl: './inner-session-managament.component.html',
  styleUrls: ['./inner-session-managament.component.css']
})
export class InnerSessionManagamentComponent implements OnInit {
  public session : Session;
  public sessionId : any;
  public formations : Formation[];
  public pInternationals : ParticipantInternational[];
  public pNationals : ParticipantNational[];

  public deleteFormation : Formation;
  public deleteParticipantNational : ParticipantNational;
  public deleteParticipantInternational :ParticipantInternational;

  public allFormations : Formation[];
  public allParticipantNational: ParticipantNational[];
  public allParticipantInternational : ParticipantInternational[];
  constructor(private adminService : AdminService ,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getSession();
    this.getFormations();
    this.getParticipantsNational()
    this.getParticipantsInternational()
  }

  public getSession():void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.sessionId = params.get('sessionId'); 
      this.adminService.getSessionById(this.sessionId).subscribe(
        (response : Session) => {
          this.session=response;
          this.formations=this.session.formations;
          this.pInternationals=this.session.participantsI
          this.pNationals=this.session.participantsN
        }
      );
    });
}

public getFormations():void {
  this.adminService.getAllFormation().subscribe(
    (response : Formation[]) => {
      this.allFormations=response;    
    },
    (error : HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public getParticipantsNational():void {
  this.adminService.getAllParticipantNational().subscribe(
    (response : ParticipantNational[]) => {
      this.allParticipantNational=response;
    },
    (error : HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public getParticipantsInternational():void {
  this.adminService.getAllParticipantInternational().subscribe(
    (response : ParticipantInternational[]) => {
      this.allParticipantInternational=response;
    },
    (error : HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public searchFormations(key1 : string): void {
  const results: Formation[] = [] ;
  for (const formation of this.session.formations) {
    let index : String = formation.id.toString();
    let nbSession : string = formation.nbSession.toString();
    let budget : string = formation.budget.toString();
    let dateDebut: string = formation.dateDebut.toString();
    let dateFin: string = formation.dateFin.toString();
    if (index.toLowerCase().indexOf(key1.toLowerCase()) !== -1 
    ||formation.titre.toLowerCase().indexOf(key1.toLowerCase()) !== -1
    ||formation.typeFormation.toLowerCase().indexOf(key1.toLowerCase()) !== -1
    ||nbSession.toLowerCase().indexOf(key1.toLowerCase()) !== -1
    ||dateDebut.toLowerCase().indexOf(key1.toLowerCase()) !== -1
    ||dateFin.toLowerCase().indexOf(key1.toLowerCase()) !== -1
    ||budget.toLowerCase().indexOf(key1.toLowerCase()) !== -1
    ||formation.domaine.libelle.toLowerCase().indexOf(key1.toLowerCase()) !== -1
    ) {
      results.push(formation);
    }
  }
  this.formations=results;
  if(results.length === 0 || !key1) {
    this.getSession();
  }
  
}

public searchParticipantNational(key2 : string): void {
  const results: ParticipantNational[] = [] ;
  for (const paritipant of this.session.participantsN) {
    let index : String = paritipant.id.toString();
    let tel : string = paritipant.tel.toString();
    if (index.toLowerCase().indexOf(key2.toLowerCase()) !== -1 
    ||paritipant.nom.toLowerCase().indexOf(key2.toLowerCase()) !== -1
    ||paritipant.prenom.toLowerCase().indexOf(key2.toLowerCase()) !== -1
    ||paritipant.email.toLowerCase().indexOf(key2.toLowerCase()) !== -1
    ||tel.toLowerCase().indexOf(key2.toLowerCase()) !== -1
    ||paritipant.profil.libelle.toLowerCase().indexOf(key2.toLowerCase()) !== -1
    ||paritipant.organisme.libelle.toLowerCase().indexOf(key2.toLowerCase()) !== -1
    ) {
      results.push(paritipant);
    }
  }
  this.pNationals=results;
  if(results.length === 0 || !key2) {
    this.getSession();
  }
  
}

public searchParticipantInternational(key3 : string): void {
  const results: ParticipantInternational[] = [] ;
  for (const paritipant of this.session.participantsI) {
    let index : String = paritipant.id.toString();
    let tel : string = paritipant.tel.toString();
    if (index.toLowerCase().indexOf(key3.toLowerCase()) !== -1 
    ||paritipant.nom.toLowerCase().indexOf(key3.toLowerCase()) !== -1
    ||paritipant.prenom.toLowerCase().indexOf(key3.toLowerCase()) !== -1
    ||paritipant.email.toLowerCase().indexOf(key3.toLowerCase()) !== -1
    ||tel.toLowerCase().indexOf(key3.toLowerCase()) !== -1
    ||paritipant.profil.libelle.toLowerCase().indexOf(key3.toLowerCase()) !== -1
    ||paritipant.pays.libelle.toLowerCase().indexOf(key3.toLowerCase()) !== -1
    ) {
      results.push(paritipant);
    }
  }
  this.pInternationals=results;
  if(results.length === 0 || !key3) {
    this.getSession();
  }
}
  public onOpenModalOne(formation: Formation , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addFormationModal');
    }
    if(mode === 'delete') {
      this.deleteFormation=formation;
      button.setAttribute('data-target','#deleteFormationModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onOpenModalTwo(partitipant: ParticipantNational , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addParticipantNationalModal');
    }
    if(mode === 'delete') {
      this.deleteParticipantNational=partitipant;
      button.setAttribute('data-target','#deleteParticipantNationalModal');
    }
    container.appendChild(button);
    button.click();
  }

    public onOpenModalThree(partitipant: ParticipantInternational , mode : string) : void {
      const container = document.getElementById('main-container');
      
      const button = document.createElement('button');
      button.type= 'button' ;
      button.style.display = 'none' ;
      button.setAttribute('data-toggle' , 'modal');
      if(mode === 'add') {
        button.setAttribute('data-target','#addParticipantInternationalModal');
      }
      if(mode === 'delete') {
        this.deleteParticipantInternational=partitipant;
        button.setAttribute('data-target','#deleteParticipantInternationalModal');
      }
      container.appendChild(button);
      button.click();
    }

    public onUpdateSessionsFormations(editForm : NgForm) : void {
      this.adminService.updateSessionFormations(this.sessionId,editForm.value.formation).subscribe(
        (response:Session) => {
          this.getSession();
          this.getFormations();
          this.getParticipantsNational()
          this.getParticipantsInternational()
          editForm.reset();
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
          editForm.reset();
        }
      );
    }

    public onDeleteSessionFormations(formationId: number):void {
      this.adminService.deleteSessionFormations(this.sessionId,formationId).subscribe(
        (response:Session) => {
          this.getSession();
          this.getFormations();
          this.getParticipantsNational()
          this.getParticipantsInternational()
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onUpdateSessionsPN(editForm2 : NgForm) : void {
      this.adminService.updateSessionPN(this.sessionId,editForm2.value.participantNational).subscribe(
        (response:Session) => {
          this.getSession();
          this.getFormations();
          this.getParticipantsNational()
          this.getParticipantsInternational()
          editForm2.reset();
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
          editForm2.reset();
        }
      );
    }

    public onDeleteSessionPN(pnId: number):void {
      this.adminService.deleteSessionPN(this.sessionId,pnId).subscribe(
        (response:Session) => {
          this.getSession();
          this.getFormations();
          this.getParticipantsNational()
          this.getParticipantsInternational()
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onUpdateSessionsPI(editForm3 : NgForm) : void {
      this.adminService.updateSessionPI(this.sessionId,editForm3.value.participantInternational).subscribe(
        (response:Session) => {
          this.getSession();
          this.getFormations();
          this.getParticipantsNational()
          this.getParticipantsInternational()
          editForm3.reset();
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
          editForm3.reset();
        }
      );
    }

    public onDeleteSessionPI(piId: number):void {
      this.adminService.deleteSessionPI(this.sessionId,piId).subscribe(
        (response:Session) => {
          this.getSession();
          this.getFormations();
          this.getParticipantsNational()
          this.getParticipantsInternational()
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
}

