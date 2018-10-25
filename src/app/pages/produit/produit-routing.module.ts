import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjoutProduitComponent} from './ajout-produit/ajout-produit.component';
import { ProduitComponent } from './produit.component';

const routes: Routes = [{
  path: '',
  component: ProduitComponent,
  children: [{
  path: 'gestionProduit',
  component: AjoutProduitComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitRoutingModule { }

export const routedComponents = [
  ProduitComponent,
  AjoutProduitComponent,
];
