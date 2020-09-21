import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RetrievePassComponent } from './pages/retrieve-pass/retrieve-pass.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'recuperar-contrasena', component: RetrievePassComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'editar-perfil', component: EditProfileComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
