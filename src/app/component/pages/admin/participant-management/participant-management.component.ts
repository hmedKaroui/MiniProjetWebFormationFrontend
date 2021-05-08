import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Organisme } from 'src/app/models/organisme';
import { ParticipantInternational } from 'src/app/models/participantInternational';
import { ParticipantNational } from 'src/app/models/participantNational';
import { Pays } from 'src/app/models/pays';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-participant-management',
  templateUrl: './participant-management.component.html',
  styleUrls: ['./participant-management.component.css']
})
export class ParticipantManagementComponent implements OnInit {
  public participantsNational: ParticipantNational[];
  public editParticipantNational: ParticipantNational ;
  public deleteParticipantNational : ParticipantNational ;

  public participantsInternational : ParticipantInternational[];
  public editParticipantInternational: ParticipantInternational ;
  public deleteParticipantInternational : ParticipantInternational ;

  public organismes: Organisme[];
  public profiles: Profile[];
  public pays :Pays[];
  constructor(private router : Router,

    private adminService : AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getParticipantsNational();
    this.getParticipantsInternational();
    this.getOrganismes();
    this.getProfiles();
    this.getPays();
  }

  public onOpenModal(partitipant: ParticipantNational , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addParticipantNationalModal');
    }
    if(mode === 'edit') {
      this.editParticipantNational = partitipant;
      button.setAttribute('data-target','#updateParticipantNationalModal');
    }
    if(mode === 'editProfile') {
      this.editParticipantNational = partitipant;
      button.setAttribute('data-target','#updateParticipantNationalProfileModal');
    }
    if(mode === 'editOrganisme') {
      this.editParticipantNational = partitipant;
      button.setAttribute('data-target','#updateParticipantNationalOrganismeModal');
    }
    if(mode === 'delete') {
      this.deleteParticipantNational=partitipant;
      button.setAttribute('data-target','#deleteParticipantNationalModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onOpenModalTwo(partitipant: ParticipantInternational , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addParticipantInternationalModal');
    }
    if(mode === 'edit') {
      this.editParticipantInternational = partitipant;
      button.setAttribute('data-target','#updateParticipantInternationalModal');
    }
    if(mode === 'editProfile') {
      this.editParticipantInternational = partitipant;
      button.setAttribute('data-target','#updateParticipantInternationalProfileModal');
    }
    if(mode === 'editPays') {
      this.editParticipantInternational = partitipant;
      button.setAttribute('data-target','#updateParticipantInternationalPaysModal');
    }
    if(mode === 'delete') {
      this.deleteParticipantInternational=partitipant;
      button.setAttribute('data-target','#deleteParticipantInternationalModal');
    }
    container.appendChild(button);
    button.click();
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

  public getPays():void {
    this.adminService.getAllPays().subscribe(
      (response : Pays[]) => {
        this.pays=response;
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

  public getProfiles():void {
    this.adminService.getAllProfile().subscribe(
      (response : Profile[]) => {
        this.profiles=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddParticipantNational(addForm:NgForm) : void {
    let tmpProfil :Profile = null;
    if( addForm.value.libelle!= "" && addForm.value.libelle!= null ) {
    tmpProfil = new Profile(addForm.value.libelle);
    }
    else {
      tmpProfil = addForm.value.profil;
    }
    let tmpParticipant : ParticipantNational = 
                new ParticipantNational(addForm.value.nom,
                                        addForm.value.prenom,
                                        addForm.value.email,
                                        addForm.value.tel,
                                        tmpProfil,
                                        addForm.value.organisme);
    this.adminService.createParticipantNational(tmpParticipant).subscribe(
      (response:ParticipantNational) => {

      let tmpUser:User=new User(addForm.value.username,
                              addForm.value.email,
                              addForm.value.password,
                              response.id
                              );   
        this.authService.registerParticipant(tmpUser).subscribe(
            data => {
          },
        );
        this.getParticipantsNational();
        this.getOrganismes();
        this.getProfiles();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
    document.getElementById('add-participantnational-form').click(); // to close form after adding Stadium
  }

  public onAddParticipantInternational(addForm:NgForm) : void {
    let tmpProfil :Profile = null;
    if( addForm.value.libelle!= "" && addForm.value.libelle!= null ) {
    tmpProfil = new Profile(addForm.value.libelle);
    }
    else {
      tmpProfil = addForm.value.profil;
    }
    let tmpParticipant : ParticipantInternational = 
                new ParticipantInternational(addForm.value.nom,
                                        addForm.value.prenom,
                                        addForm.value.email,
                                        addForm.value.tel,
                                        tmpProfil,
                                        addForm.value.pays);
    this.adminService.createParticipantInternational(tmpParticipant).subscribe(
      (response:ParticipantInternational) => {

      let tmpUser:User=new User(addForm.value.username,
                              addForm.value.email,
                              addForm.value.password,
                              response.id
                              );   
        this.authService.registerParticipant(tmpUser).subscribe(
            data => {
          },
        );
        this.getParticipantsInternational();
        this.getPays();
        this.getProfiles();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
    document.getElementById('add-participantinternational-form').click(); // to close form after adding
  }



  public onUpdateParticipantNational(p : ParticipantNational) : void {
    this.adminService.updateParticipantNational(p.id,p).subscribe(
      (response:ParticipantNational) => {
        this.getParticipantsNational();
        this.getOrganismes();
        this.getProfiles();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateParticipantInternational(p : ParticipantInternational) : void {
    this.adminService.updateParticipantInternational(p.id,p).subscribe(
      (response:ParticipantInternational) => {
        this.getParticipantsInternational();
        this.getPays();
        this.getProfiles();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateParticipantNationalProfile(p : ParticipantNational) : void {
    this.adminService.updateParticipantNationalProfile(p.id,p).subscribe(
      (response:ParticipantNational) => {
        this.getParticipantsNational();
        this.getOrganismes();
        this.getProfiles();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateParticipantInternationalProfile(p : ParticipantInternational) : void {
    this.adminService.updateParticipantInternationalProfile(p.id,p).subscribe(
      (response:ParticipantInternational) => {
        this.getParticipantsInternational();
        this.getPays();
        this.getProfiles();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateParticipantNationalOrganisme(p : ParticipantNational) : void {
    this.adminService.updateParticipantNationalOrganisme(p.id,p).subscribe(
      (response:ParticipantNational) => {
        this.getParticipantsNational();
        this.getOrganismes();
        this.getProfiles();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateParticipantInternationalPays(p : ParticipantInternational) : void {
    this.adminService.updateParticipantInternationalPays(p.id,p).subscribe(
      (response:ParticipantInternational) => {
        this.getParticipantsInternational();
        this.getPays();
        this.getProfiles();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteParticipantNational(participantNationalId:number) : void {
    this.adminService.deleteParticipantNational(participantNationalId).subscribe(
      (response:void) => {
        this.getParticipantsNational();
        this.getOrganismes();
        this.getProfiles();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteParticipantInternational(participantInternationalId:number) : void {
    this.adminService.deleteParticipantInternational(participantInternationalId).subscribe(
      (response:void) => {
        this.getParticipantsInternational();
        this.getPays();
        this.getProfiles();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchParticipantNational(key : string): void {
    const results: ParticipantNational[] = [] ;
    for (const paritipant of this.participantsNational) {
      let index : String = paritipant.id.toString();
      let tel : string = paritipant.tel.toString();
      if (index.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||paritipant.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||paritipant.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||paritipant.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||tel.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||paritipant.profil.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||paritipant.organisme.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(paritipant);
      }
    }
    this.participantsNational=results;
    if(results.length === 0 || !key) {
      this.getParticipantsNational();
      this.getOrganismes();
      this.getProfiles();
    }
    
  }

  public searchParticipantInternational(key : string): void {
    const results: ParticipantInternational[] = [] ;
    for (const paritipant of this.participantsInternational) {
      let index : String = paritipant.id.toString();
      let tel : string = paritipant.tel.toString();
      if (index.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||paritipant.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||paritipant.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||paritipant.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||tel.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||paritipant.profil.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||paritipant.pays.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(paritipant);
      }
    }
    this.participantsInternational=results;
    if(results.length === 0 || !key) {
      this.getParticipantsInternational();
        this.getPays();
        this.getProfiles();
    }
    
  }
}
