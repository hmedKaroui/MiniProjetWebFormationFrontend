import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Formateur } from 'src/app/models/formateur';
import { Formation } from 'src/app/models/formation';
import { Organisme } from 'src/app/models/organisme';
import { ParticipantInternational } from 'src/app/models/participantInternational';
import { ParticipantNational } from 'src/app/models/participantNational';
import { Session } from 'src/app/models/session';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.css']
})
export class SessionManagementComponent implements OnInit {
  public sessions: Session[];
  public editSession: Session ;
  public deleteSession : Session ;

  public organismes: Organisme[];
  public formateurs: Formateur[];
  public formations: Formation[];
  public participantsInternational: ParticipantInternational[];
  public participantsNational: ParticipantNational[];
  constructor(private router : Router,
    private adminService : AdminService) { }

  ngOnInit(): void {
    this.getSessions();
    this.getFormateurs();
    this.getFormations();
    this.getOrganismes();
    this.getParticipantsInternational();
    this.getParticipantsNational();
  }

  public onOpenModal(session: Session , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addSessionModal');
    }
    if(mode === 'edit') {
      this.editSession = session;
      button.setAttribute('data-target','#updateSessionModal');
    }
    if(mode === 'delete') {
      this.deleteSession=session;
      button.setAttribute('data-target','#deleteSessionModal');
    }
    container.appendChild(button);
    button.click();
  }

  public getSessions():void {
    this.adminService.getAllSessions().subscribe(
      (response : Session[]) => {
        this.sessions=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFormations():void {
    this.adminService.getAllFormation().subscribe(
      (response : Formation[]) => {
        this.formations=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getOrganismes():void {
    this.adminService.getAllOrganisme().subscribe(
      (response : Organisme[]) => {
        this.organismes=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFormateurs():void {
    this.adminService.getAllFormateur().subscribe(
      (response : Formateur[]) => {
        this.formateurs=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getParticipantsNational():void {
    this.adminService.getAllParticipantNational().subscribe(
      (response : ParticipantNational[]) => {
        this.participantsNational=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getParticipantsInternational():void {
    this.adminService.getAllParticipantInternational().subscribe(
      (response : ParticipantInternational[]) => {
        this.participantsInternational=response;
      },
      (error : HttpErrorResponse) => {
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
      this.getSessions();
      this.getFormateurs();
      this.getFormations();
      this.getOrganismes();
      this.getParticipantsInternational();
      this.getParticipantsNational();
    }
    
  }

  public onAddSession(addForm:NgForm) : void {
    let tmpOrganisme :Organisme = null;
    if( addForm.value.libelle!= "" && addForm.value.libelle!= null ) {
      tmpOrganisme = new Organisme(addForm.value.libelle);
    }
    else {
      tmpOrganisme = addForm.value.organisme;
    }
    let tmpSession : Session = 
                new Session(addForm.value.lieu,
                              addForm.value.dateDebut,
                              addForm.value.dateFin,
                              addForm.value.nbParticipant,
                              addForm.value.formateur,
                              tmpOrganisme,100,
                              [addForm.value.formations],
                              [addForm.value.participantsN],
                            );
    this.adminService.createSession(tmpSession).subscribe(
      (response:Session) => {
        this.getSessions();
        this.getFormateurs();
        this.getFormations();
        this.getOrganismes();
        this.getParticipantsInternational();
        this.getParticipantsNational();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
    document.getElementById('add-session-form').click(); // to close form after adding
  }

  public onUpdateSession(editForm:NgForm ) : void {
    let organismeOfSession : Organisme = null ;
    let formateurOfSession : Formateur = null ;
    let tmpSession: Session = null;
    let typeOfFormateur : String = typeof editForm.value.formateur;
    let typeOforganisme : String = typeof editForm.value.organisme;
    if(typeOfFormateur.localeCompare('string') == 0 && typeOforganisme.localeCompare('string') == 0) {
      this.adminService.getOrganismeById(editForm.value.idOrganisme).subscribe(
        (response:Organisme) => {
          organismeOfSession = response;
          this.adminService.getFormateurById(editForm.value.idFormateur).subscribe(
            (response:Formateur) => {
              formateurOfSession=response;
              tmpSession = new Session(editForm.value.lieu,editForm.value.dateDebut,
                editForm.value.dateFin,editForm.value.nbParticipant,
                formateurOfSession,organismeOfSession,editForm.value.id); 
                this.adminService.updateSession(tmpSession.id,tmpSession).subscribe(
                  (response:Session) => {
                    this.getSessions();
                    this.getFormateurs();
                    this.getFormations();
                    this.getOrganismes();
                    this.getParticipantsInternational();
                    this.getParticipantsNational(); }
                );});});
    }
    else if(typeOfFormateur.localeCompare('string') == 0 && typeOforganisme.localeCompare('string') == -1) {
      this.adminService.getFormateurById(editForm.value.idFormateur).subscribe(
        (response:Formateur) => {
          formateurOfSession=response;
          tmpSession = new Session(editForm.value.lieu,editForm.value.dateDebut,
            editForm.value.dateFin,editForm.value.nbParticipant,
            formateurOfSession,editForm.value.organisme,editForm.value.id); 
            this.adminService.updateSession(tmpSession.id,tmpSession).subscribe(
              (response:Session) => {
                this.getSessions();
                this.getFormateurs();
                this.getFormations();
                this.getOrganismes();
                this.getParticipantsInternational();
                this.getParticipantsNational();}
            );}); 
    }
    else if(typeOfFormateur.localeCompare('string') == -1 && typeOforganisme.localeCompare('string') == 0) {
      this.adminService.getOrganismeById(editForm.value.idOrganisme).subscribe(
        (response:Organisme) => {
          organismeOfSession=response;
          tmpSession = new Session(editForm.value.lieu,editForm.value.dateDebut,
            editForm.value.dateFin,editForm.value.nbParticipant,
            editForm.value.formateur,organismeOfSession,editForm.value.id); 
            this.adminService.updateSession(tmpSession.id,tmpSession).subscribe(
              (response:Session) => {
                this.getSessions();
                this.getFormateurs();
                this.getFormations();
                this.getOrganismes();
                this.getParticipantsInternational();
                this.getParticipantsNational(); }
            );});}
    else {
            tmpSession = new Session(editForm.value.lieu,editForm.value.dateDebut,
            editForm.value.dateFin,editForm.value.nbParticipant,
            editForm.value.formateur,editForm.value.organisme,editForm.value.id); 
            this.adminService.updateSession(tmpSession.id,tmpSession).subscribe(
              (response:Session) => {
                this.getSessions();
                this.getFormateurs();
                this.getFormations();
                this.getOrganismes();
                this.getParticipantsInternational();
                this.getParticipantsNational(); }
            ); 
    }
  }

  public onDeleteSession(sessionId:number) : void {
    this.adminService.deleteSession(sessionId).subscribe(
      (response:void) => {
                this.getSessions();
                this.getFormateurs();
                this.getFormations();
                this.getOrganismes();
                this.getParticipantsInternational();
                this.getParticipantsNational();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
