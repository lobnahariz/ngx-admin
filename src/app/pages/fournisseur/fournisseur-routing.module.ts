import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FournisseurComponent} from "./fournisseur.component";
import {AjoutFournisseurComponent} from "./ajout-fournisseur/ajout-fournisseur.component";

const routes: Routes = [{
  path: '',
  component: FournisseurComponent,
  children: [{
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
];

