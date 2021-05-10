import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/models/formation';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {
  public formations: Formation[];
  constructor(private router : Router,
    private userSerivce : UserService) { }

  ngOnInit(): void {
    this.getFormations();
  }
  public getFormations():void {
    this.userSerivce.getAllFormation().subscribe(
      (response : Formation[]) => {
        this.formations=response;
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
      this.getFormations();
    }
    
  }
}
