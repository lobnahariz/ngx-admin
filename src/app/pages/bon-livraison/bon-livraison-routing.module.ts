import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BonLivraisonComponent} from './bon-livraison.component';
import {AjouterBonLivraisonComponent} from './ajouter-bon-livraison/ajouter-bon-livraison.component';
import {ModifierBonLivraisonComponent} from "./modifier-bon-livraison/modifier-bon-livraison.component";

const routes: Routes = [{
  path: '',
  component: BonLivraisonComponent,
  children: [{
    path: 'nouveauBonDeLivraison',
    component: AjouterBonLivraisonComponent,
  },
    {
  path: 'modifierBonDeLivraison',
  component: ModifierBonLivraisonComponent,
},
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonLivraisonRoutingModule { }

export const routedComponents = [
  BonLivraisonComponent,
  AjouterBonLivraisonComponent,
  ModifierBonLivraisonComponent,
];
