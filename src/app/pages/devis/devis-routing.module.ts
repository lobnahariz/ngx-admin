import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DevisComponent} from './devis.component';
import {AjouterDevisComponent} from './ajouter-devis/ajouter-devis.component';

const routes: Routes = [{
    path: '',
    component: DevisComponent,
    children: [{
      path: 'nouveauDevis',
      component: AjouterDevisComponent,
    }],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevisRoutingModule { }

export const routedComponents = [
  DevisComponent,
  AjouterDevisComponent,
];