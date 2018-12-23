import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjoutProduitComponent} from './ajout-produit/ajout-produit.component';
import { ProduitComponent } from './produit.component';
import {AjoutCategorieComponent} from "./ajout-categorie/ajout-categorie.component";

const routes: Routes = [{
  path: '',
  component: ProduitComponent,
  children: [
    {
      path: 'gestionCategorieProduit',
      component: AjoutCategorieComponent,
    },
    {
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
  AjoutCategorieComponent,
];
