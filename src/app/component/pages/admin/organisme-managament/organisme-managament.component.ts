import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Organisme } from 'src/app/models/organisme';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-organisme-managament',
  templateUrl: './organisme-managament.component.html',
  styleUrls: ['./organisme-managament.component.css']
})
export class OrganismeManagamentComponent implements OnInit {
  public organismes: Organisme[];
  public editOrganisme: Organisme ;
  public deleteOrganisme : Organisme ;
  constructor(private router : Router,
    private adminService : AdminService) { }

  ngOnInit(): void {
    this.getOrganismes();
  }

  public onOpenModal(organisme: Organisme , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addOrganismeModal');
    }
    if(mode === 'edit') {
      this.editOrganisme = organisme;
      button.setAttribute('data-target','#updateOrganismeModal');
    }
    if(mode === 'delete') {
      this.deleteOrganisme=organisme;
      button.setAttribute('data-target','#deleteOrganismeModal');
    }
    container.appendChild(button);
    button.click();
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
  public onAddOrganisme(addForm:NgForm) : void {
    document.getElementById('add-organisme-form').click(); // to close form after adding Stadium
    this.adminService.createOrganisme(addForm.value).subscribe(
      (response:Organisme) => {
        this.getOrganismes();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateOrganisme(organisme:Organisme) : void {
    this.adminService.updateOrganisme(organisme.id,organisme).subscribe(
      (response:Organisme) => {
        this.getOrganismes();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteOrganisme(organismeId:number) : void {
    this.adminService.deleteOrganisme(organismeId).subscribe(
      (response:void) => {
        this.getOrganismes();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPays(key : string): void {
    const results: Organisme[] = [] ;
    for (const organisme of this.organismes) {
      let index : String = organisme.id.toString();
      if (index.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||organisme.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(organisme);
      }
    }
    this.organismes=results;
    if(results.length === 0 || !key) {
      this.getOrganismes();
    }
    
  }

}
