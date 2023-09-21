import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiexplorerComponent } from './apiexplorer/apiexplorer.component';
import { application } from 'express';


const routes: Routes = [
  {path: '', component: ApiexplorerComponent},
  {path: 'api', component: ApiexplorerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
