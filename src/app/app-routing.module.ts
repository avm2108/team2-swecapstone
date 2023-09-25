import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiexplorerComponent } from './apiexplorer/apiexplorer.component';
import { LoginComponent } from './login/login.component';
import { authguardGuard } from './authguard.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'api', component: ApiexplorerComponent, canActivate: [authguardGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
