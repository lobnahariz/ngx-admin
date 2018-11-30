import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FactureComponent} from "./facture.component";
import {AjouterFactureComponent} from "./ajouter-facture/ajouter-facture.component";

const routes: Routes = [{
  path: '',
  component: FactureComponent,
  children: [{
    path: 'nouvelleFacture',
    component: AjouterFactureComponent,
  },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
export const routedComponents = [
  AjouterFactureComponent,
  FactureComponent,
];
