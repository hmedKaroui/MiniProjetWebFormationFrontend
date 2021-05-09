import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Domaine } from 'src/app/models/domaine';
import { Formation } from 'src/app/models/formation';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-formation-managament',
  templateUrl: './formation-managament.component.html',
  styleUrls: ['./formation-managament.component.css']
})
export class FormationManagamentComponent implements OnInit {
  public formations: Formation[];
  public editFormation: Formation ;
  public deleteFormation : Formation ;

  public types:string[]= [
    'Formation_Initiale',
    'Formation_Continue',
    'Formation_Professionnelle',
    'Formation_pour_adulte',
    'Formation_Présentiel',
    'Formation_en_alternance',
    'Formation_distance',
    'Blended_Learning'
  ]
  public domaines: Domaine[];
  constructor(private router : Router,
    private adminService : AdminService) { }

  ngOnInit(): void {
    this.getDomaines();
    this.getFormations();
  }

  public onOpenModal(formation: Formation , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addFormationModal');
    }
    if(mode === 'edit') {
      this.editFormation = formation;
      button.setAttribute('data-target','#updateFormationModal');
    }
    if(mode === 'delete') {
      this.deleteFormation=formation;
      button.setAttribute('data-target','#deleteFormationModal');
    }
    container.appendChild(button);
    button.click();
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

  public getDomaines():void {
    this.adminService.getAllDomaine().subscribe(
      (response : Domaine[]) => {
        this.domaines=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFormations(key : string): void {
    const results: Formation[] = [] ;
    for (const formation of this.formations) {
      let index : String = formation.id.toString();
      let nbSession : string = formation.nbSession.toString();
      let budget : string = formation.budget.toString();
      let dateDebut: string = formation.dateDebut.toString();
      let dateFin: string = formation.dateFin.toString();
      if (index.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||formation.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||formation.typeFormation.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||nbSession.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||dateDebut.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||dateFin.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||budget.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||formation.domaine.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(formation);
      }
    }
    this.formations=results;
    if(results.length === 0 || !key) {
      this.getDomaines();
      this.getFormations();
    }
    
  }

  public onAddFormation(addForm:NgForm) : void {
    let tmpDomaine :Domaine = null;
    if( addForm.value.libelle!= "" && addForm.value.libelle!= null ) {
      tmpDomaine = new Domaine(addForm.value.libelle);
    }
    else {
      tmpDomaine = addForm.value.domaine;
    }
    let tmpFormation : Formation = 
                new Formation(addForm.value.titre,
                              addForm.value.typeFormation,
                              addForm.value.nbSession,
                              addForm.value.dateDebut,
                              addForm.value.dateFin,
                              addForm.value.budget,
                              tmpDomaine);
    this.adminService.createFormation(tmpFormation).subscribe(
      (response:Formation) => {
        this.getDomaines();
        this.getFormations();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
    document.getElementById('add-formation-form').click(); // to close form after adding
  }

  public onUpdateFormation(editForm:NgForm ) : void {
    let domaineOfFormation : Domaine = null ;
    let tmpFormation: Formation = null;
    let typeOfDomain : String = typeof editForm.value.domaine;

    if(typeOfDomain.localeCompare('string') == 0) {
      //old Domain
      this.adminService.gatDomaineById(editForm.value.idDomaine).subscribe(
        (response:Domaine) => {
          domaineOfFormation = response;
          tmpFormation = new Formation(editForm.value.titre,
                                      editForm.value.typeFormation,
                                      editForm.value.nbSession,
                                      editForm.value.dateDebut,
                                      editForm.value.dateFin,
                                      editForm.value.budget,
                                      domaineOfFormation,
                                      editForm.value.id)   
          this.adminService.updateFormation(tmpFormation.id,tmpFormation).subscribe(
            (response:Formation) => {
              this.getDomaines();
              this.getFormations();
            });                         
        }
      );
    }
    else if (typeOfDomain.localeCompare('object') ==0 ) {
      //New domain
      tmpFormation = new Formation(editForm.value.titre,
                                  editForm.value.typeFormation,
                                  editForm.value.nbSession,
                                  editForm.value.dateDebut,
                                  editForm.value.dateFin,
                                  editForm.value.budget,
                                  editForm.value.domaine,
                                  editForm.value.id);
      this.adminService.updateFormation(tmpFormation.id,tmpFormation).subscribe(
       (response:Formation) => {
            this.getDomaines();
            this.getFormations();
        }); 
    }
  }
  public onDeleteFormation(formationId:number) : void {
    this.adminService.deleteFormation(formationId).subscribe(
      (response:void) => {
        this.getDomaines();
        this.getFormations();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
