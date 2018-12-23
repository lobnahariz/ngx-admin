import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReclamationComponent} from "./reclamation.component";
import {AjoutReclamationComponent} from "./ajout-reclamation/ajout-reclamation.component";
import {ValiderReclamationComponent} from "./valider-reclamation/valider-reclamation.component";

const routes: Routes = [{
  path: '',
  component: ReclamationComponent,
  children: [{
    path: 'gestionReclamation',
    component: AjoutReclamationComponent,
  },
  {
    path: 'validationReclamation',
    component: ValiderReclamationComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationRoutingModule { }
export const routedComponents = [
  ReclamationComponent,
  AjoutReclamationComponent,
  ValiderReclamationComponent,
];
