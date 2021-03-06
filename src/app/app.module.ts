import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { ProfileComponent } from './profile/profile.component';
import { authInterceptorProviders } from './_helpers/auth.service';
import { FooterComponent } from './component/partials/footer/footer.component';
import { SidebarComponent } from './component/partials/sidebar/sidebar.component';
import { AdminLayoutComponent } from './component/Layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './component/pages/admin/dashboard/dashboard.component';
import { HomeLayoutComponent } from './component/Layout/home-layout/home-layout.component';
import { NavbarComponent } from './component/partials/navbar/navbar.component';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdminLayoutComponent,
    DashboardComponent,
    HomeLayoutComponent,
    PaysManagementComponent,
    OrganismeManagamentComponent,
    ParticipantManagementComponent,
    FormateurManagementComponent,
    DomaineManagementComponent,
    FormationManagamentComponent,
    SessionManagementComponent,
    InnerSessionManagamentComponent,
    FormationListComponent,
    SessionOfFormationComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
