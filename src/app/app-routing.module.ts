import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AdminLayoutComponent } from './component/Layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './component/pages/admin/dashboard/dashboard.component';
import { HomeLayoutComponent } from './component/Layout/home-layout/home-layout.component';
import { AuthMiddleware } from './middlewares/auth-middleware';
import { AdminMiddleware } from './middlewares/admin-middleware';
import { UserMiddleware } from './middlewares/user-middleware';
import { PaysManagementComponent } from './component/pages/admin/pays-management/pays-management.component';
import { OrganismeManagamentComponent } from './component/pages/admin/organisme-managament/organisme-managament.component';
import { ParticipantManagementComponent } from './component/pages/admin/participant-management/participant-management.component';
import { FormateurManagementComponent } from './component/pages/admin/formateur-management/formateur-management.component';
import { DomaineManagementComponent } from './component/pages/admin/domaine-management/domaine-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path :'admin',
    canActivate : [AuthMiddleware,AdminMiddleware],
    component : AdminLayoutComponent,
    children : [
      { path: '', component: DashboardComponent },
      { path :'pays_management' , component:PaysManagementComponent},
      { path :'organisme_management', component : OrganismeManagamentComponent},
      { path :'participant_management',component : ParticipantManagementComponent},
      { path :'formateur_management' , component : FormateurManagementComponent},
      { path: 'domaine_management' , component : DomaineManagementComponent},
    ]
  },
  {
    path : 'home',
    component : HomeLayoutComponent,
    children : [
      { path: '', component: HomeComponent },
      { path: 'login' , component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile',canActivate : [AuthMiddleware,UserMiddleware], component: ProfileComponent },
      { path: 'user',canActivate : [AuthMiddleware,UserMiddleware], component: BoardUserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


