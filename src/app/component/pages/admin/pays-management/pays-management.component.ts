import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pays } from 'src/app/models/pays';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-pays-management',
  templateUrl: './pays-management.component.html',
  styleUrls: ['./pays-management.component.css']
})
export class PaysManagementComponent implements OnInit {

  public pays: Pays[];
  public editPay: Pays ;
  public deletePay : Pays ;
  constructor(private router : Router,
    private adminService : AdminService) { }

  ngOnInit(): void {
    this.getPays();
  }
  
  public onOpenModal(pay: Pays , mode : string) : void {
    const container = document.getElementById('main-container');
    
    const button = document.createElement('button');
    button.type= 'button' ;
    button.style.display = 'none' ;
    button.setAttribute('data-toggle' , 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addPaysModal');
    }
    if(mode === 'edit') {
      this.editPay = pay;
      button.setAttribute('data-target','#updatePaysModal');
    }
    if(mode === 'delete') {
      this.deletePay=pay;
      button.setAttribute('data-target','#deletePaysModal');
    }
    container.appendChild(button);
    button.click();
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
  public onAddPays(addForm:NgForm) : void {
    document.getElementById('add-pays-form').click(); // to close form after adding Stadium
    this.adminService.createPays(addForm.value).subscribe(
      (response:Pays) => {
        this.getPays();
        addForm.reset(); //for resetting the fields of the form to blank sapces 
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePays(pay:Pays) : void {
    this.adminService.updatePays(pay.id,pay).subscribe(
      (response:Pays) => {
        this.getPays();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePays(payId:number) : void {
    this.adminService.deletePays(payId).subscribe(
      (response:void) => {
        this.getPays();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPays(key : string): void {
    const results: Pays[] = [] ;
    for (const pay of this.pays) {
      let index : String = pay.id.toString();
      if (index.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||pay.libelle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(pay);
      }
    }
    this.pays=results;
    if(results.length === 0 || !key) {
      this.getPays();
    }
    
  }

}
