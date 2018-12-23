import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UtilisateurComponent} from "./utilisateur.component";
import {GestionUtilisateurComponent} from "./gestion-utilisateur/gestion-utilisateur.component";

const routes: Routes = [{
  path: '',
  component: UtilisateurComponent,
  children: [
    {
      path: 'gestionUtilisateur',
      component: GestionUtilisateurComponent,
    }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilisateurRoutingModule { }
export const routedComponents = [
  UtilisateurComponent,
  GestionUtilisateurComponent,
];

