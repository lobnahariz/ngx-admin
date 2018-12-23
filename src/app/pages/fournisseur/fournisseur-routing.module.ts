import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FournisseurComponent} from "./fournisseur.component";
import {AjoutFournisseurComponent} from "./ajout-fournisseur/ajout-fournisseur.component";
import {AjoutCategorieComponent} from "./ajout-categorie/ajout-categorie.component";

const routes: Routes = [{
  path: '',
  component: FournisseurComponent,
  children: [
    {
      path: 'gestionCategorieFournisseur',
      component: AjoutCategorieComponent,
    },
    {
    path: 'gestionFournisseur',
    component: AjoutFournisseurComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }

export const routedComponents = [
  FournisseurComponent,
  AjoutFournisseurComponent,
  AjoutCategorieComponent,
];

