import { NgModule } from '@angular/core';

import { UtilisateurRoutingModule, routedComponents } from './utilisateur-routing.module';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ThemeModule} from "../../@theme/theme.module";

@NgModule({
  imports: [
    UtilisateurRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
  ],
  declarations: [
    ...routedComponents,
  ]})
export class UtilisateurModule { }
