import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Domaine } from 'src/app/models/domaine';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-domaine-management',
  templateUrl: './domaine-management.component.html',
  styleUrls: ['./domaine-management.component.css']
})
export class DomaineManagementComponent implements OnInit {
  public domaines: Domaine[];
  public editDomaine: Domaine ;
  public deleteDomaine : Domaine ;
  constructor(private router : Router,
    private adminService : AdminService) { }

  ngOnInit(): void {
    this.getDomaines();
  }

  public onOpenModal(domaine: Domaine , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addDomaineModal');
    }
    if(mode === 'edit') {
      this.editDomaine = domaine;
      button.setAttribute('data-target','#updateDomaineModal');
    }
    if(mode === 'delete') {
      this.deleteDomaine=domaine;
      button.setAttribute('data-target','#deleteDomaineModal');
    }
    container.appendChild(button);
    button.click();
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
  public onAddDomaine(addForm:NgForm) : void {
    document.getElementById('add-domaine-form').click(); // to close form after adding Stadium
    this.adminService.createDomaine(addForm.value).subscribe(
      (response:Domaine) => {
        this.getDomaines();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateDomaine(domaine:Domaine) : void {
    this.adminService.updateDomaine(domaine.id,domaine).subscribe(
      (response:Domaine) => {
        this.getDomaines();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteDomaine(domaineId:number) : void {
    this.adminService.deleteDomaine(domaineId).subscribe(
      (response:void) => {
        this.getDomaines();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchDomaines(key : string): void {
    const results: Domaine[] = [] ;
    for (const domaine of this.domaines) {
      let index : String = domaine.id.toString();
      if (index.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||domaine.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(domaine);
      }
    }
    this.domaines=results;
    if(results.length === 0 || !key) {
      this.getDomaines();
    }
    
  }
}
