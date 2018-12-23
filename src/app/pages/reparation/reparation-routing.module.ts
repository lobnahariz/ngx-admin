import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReparationComponent} from "./reparation.component";
import {AjoutReparationComponent} from "./ajout-reparation/ajout-reparation.component";
import {ModifierReparationComponent} from "./modifier-reparation/modifier-reparation.component";


const routes: Routes = [{
  path: '',
  component: ReparationComponent,
  children: [
    {
      path: 'nouvelleReparation',
      component: AjoutReparationComponent,
    },
    {
      path: 'modifierReparation',
      component: ModifierReparationComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReparationRoutingModule { }

export const routedComponents = [
  ReparationComponent,
  AjoutReparationComponent,
  ModifierReparationComponent,
];

