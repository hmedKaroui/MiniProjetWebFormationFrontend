import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Formateur } from 'src/app/models/formateur';
import { Organisme } from 'src/app/models/organisme';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-formateur-management',
  templateUrl: './formateur-management.component.html',
  styleUrls: ['./formateur-management.component.css']
})
export class FormateurManagementComponent implements OnInit {
  public formateurs: Formateur[];
  public editFormateur: Formateur ;
  public deleteFormateur : Formateur ;

  public types:string[]= [
    'Didactique',
    'Educateur',
    'Therapeute'
    ,'Animateur'
  ]
  public organismes: Organisme[];
  
  constructor(private router : Router,
    private adminService : AdminService) { }

  ngOnInit(): void {
    this.getOrganismes();
    this.getFormateurs();
  }
  public onOpenModal(formateur: Formateur , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addFormateurModal');
    }
    if(mode === 'edit') {
      this.editFormateur = formateur;
      button.setAttribute('data-target','#updateFormateurModal');
    }
    if(mode === 'editOrganisme') {
      this.editFormateur = formateur;
      button.setAttribute('data-target','#updateFormateurOrganismeModal');
    }
    if(mode === 'delete') {
      this.deleteFormateur=formateur;
      button.setAttribute('data-target','#deleteFormateurModal');
    }
    container.appendChild(button);
    button.click();
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

  public onAddFormateur(addForm:NgForm) : void {
    document.getElementById('add-formateur-form').click(); // to close form after adding Stadium
    this.adminService.createFormateur(addForm.value).subscribe(
      (response:Formateur) => {
        this.getOrganismes();
        this.getFormateurs();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateFormateur(formateur:Formateur) : void {
    this.adminService.updateFormateur(formateur.id,formateur).subscribe(
      (response:Formateur) => {
        this.getOrganismes();
        this.getFormateurs();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateFormateurOrganisme(p : Formateur) : void {
    this.adminService.updateFormateurOrganisme(p.id,p).subscribe(
      (response:Formateur) => {
        this.getOrganismes();
        this.getFormateurs();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteFormateur(formateurId:number) : void {
    this.adminService.deleteFormateur(formateurId).subscribe(
      (response:void) => {
        this.getOrganismes();
        this.getFormateurs();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFormateurs(key : string): void {
    const results: Formateur[] = [] ;
    for (const formateur of this.formateurs) {
      let index : String = formateur.id.toString();
      let tel : string = formateur.tel.toString();
      if (index.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||formateur.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||formateur.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||formateur.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||tel.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||formateur.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||formateur.organisme.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(formateur);
      }
    }
    this.formateurs=results;
    if(results.length === 0 || !key) {
      this.getOrganismes();
      this.getFormateurs();
    }
    
  }

}
