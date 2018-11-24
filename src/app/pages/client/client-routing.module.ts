import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from './client.component';
import {AjoutClientComponent} from './ajout-client/ajout-client.component';


const routes: Routes = [{
  path: '',
  component: ClientComponent,
  children: [{
    path: 'gestionClient',
    component: AjoutClientComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

export const routedComponents = [
  ClientComponent,
  AjoutClientComponent,
];
