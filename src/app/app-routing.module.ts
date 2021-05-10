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
import { FormationManagamentComponent } from './component/pages/admin/formation-managament/formation-managament.component';
import { SessionManagementComponent } from './component/pages/admin/session-management/session-management.component';
import { InnerSessionManagamentComponent } from './component/pages/admin/inner-session-managament/inner-session-managament.component';
import { FormationListComponent } from './component/pages/user/formation-list/formation-list.component';
import { SessionOfFormationComponent } from './component/pages/user/session-of-formation/session-of-formation.component';

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
      { path: 'formation_management' , component: FormationManagamentComponent},
      { path :'session_management' , component : SessionManagementComponent},
      { path : 'inner_session_management/:sessionId' , component : InnerSessionManagamentComponent },
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
      { path : 'formation_list', canActivate: [AuthMiddleware,UserMiddleware], component: FormationListComponent},
      { path : 'formation/:formatonId' , canActivate: [AuthMiddleware,UserMiddleware] , component : SessionOfFormationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


