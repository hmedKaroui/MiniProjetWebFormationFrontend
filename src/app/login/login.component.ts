import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from '../globals/gloabls';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router,private authService: AuthService, private tokenStorage: TokenStorageService ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        const globals = new AppGlobals(this.tokenStorage);
        
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
    

        if (globals.isAdmin()) {
          this.router.navigate(["admin"])
          console.log("Admin");
          
        }
        else if (globals.isUser()) {
          this.router.navigate(['home/user'])
          .then(() => {
            window.location.reload();
          });
          console.log("User");
          
        }
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    //window.location.reload();
   //this.router.navigate(["admin"]);
  }
}

