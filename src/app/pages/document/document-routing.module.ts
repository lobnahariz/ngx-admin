import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentComponent} from "./document.component";
import {AjouterDocumentComponent} from "./ajouter-document/ajouter-document.component";

const routes: Routes = [{
  path: '',
  component: DocumentComponent,
  children: [{
    path: 'nouveauDocument',
    component: AjouterDocumentComponent,
  }],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }

export const routedComponents = [
  DocumentComponent,
  AjouterDocumentComponent,
];

