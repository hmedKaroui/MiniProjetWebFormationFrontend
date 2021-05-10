import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppGlobals } from '../globals/gloabls';
import { ParticipantInternational } from '../models/participantInternational';
import { ParticipantNational } from '../models/participantNational';
import { Session } from '../models/session';
import { User } from '../models/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  public participantId : number;
  public participant : ParticipantInternational| ParticipantNational ;

  public user :User;
  public editUser : User;
  public sessions : Session[];
  constructor(private userService: UserService, private globals :AppGlobals,private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.getParticipant();
    this.getUser();
  }
  public getParticipant():void {
    this.participantId=this.globals.getUserId();
    this.userService.getParticipantById(this.participantId).subscribe(
      (response : any) => {
        this.participant=response;
        this.sessions=this.participant.sessions;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getUser():void {
    this.participantId=this.globals.getUserId();
    this.userService.getUserById(this.participantId).subscribe(
      (response : User) => {
        this.user=response;
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
      this.getParticipant();
      this.getUser();
    }
  }

  public onOpenModal() : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    this.editUser = this.user;
    button.setAttribute('data-target','#updateFormationModal');
    container.appendChild(button);
    button.click();
  }

  public logout() : void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  public onUpdateUser(editForm : NgForm) : void {
    if( editForm.value.password == editForm.value.vPassword  ) {
      let tmpUser : User = new User(editForm.value.username,editForm.value.email,editForm.value.password,editForm.value.id);
      console.log(tmpUser);
      this.userService.updateUser(tmpUser.id,tmpUser).subscribe(
        (response:User) => {
          this.logout();
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    else {
    alert("passwords does not match");
    }
  }

  public onEnrollSession(sessionId:number):void {
    this.userService.deleteParticipantSessions(this.participantId,sessionId).subscribe(
      (response:any) => {
        this.getParticipant();
      this.getUser();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
