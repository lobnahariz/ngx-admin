import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AvoirComponent} from "./avoir.component";
import {AjouterAvoirComponent} from "./ajouter-avoir/ajouter-avoir.component";
import {ConsulterAvoirComponent} from "./consulter-avoir/consulter-avoir.component";


const routes: Routes = [
  {
  path: '',
  component: AvoirComponent,
  children: [{
    path: 'nouveauAvoir',
    component: AjouterAvoirComponent,
  },
    {
      path: 'consulterAvoir',
      component: ConsulterAvoirComponent,
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
  ConsulterAvoirComponent,
];

