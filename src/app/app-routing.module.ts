import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiexplorerComponent } from './apiexplorer/apiexplorer.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'api', component: ApiexplorerComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
