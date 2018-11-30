import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AvoirComponent} from "./avoir.component";
import {AjouterAvoirComponent} from "./ajouter-avoir/ajouter-avoir.component";


const routes: Routes = [{
  path: '',
  component: AvoirComponent,
  children: [{
    path: 'nouveauAvoir',
    component: AjouterAvoirComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvoirRoutingModule { }

export const routedComponents = [
  AvoirComponent,
  AjouterAvoirComponent,
];

