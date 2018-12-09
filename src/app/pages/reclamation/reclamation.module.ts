import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamationRoutingModule } from './reclamation-routing.module';

import {routedComponents} from "./reclamation-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ReclamationRoutingModule
  ],
  declarations: [
    ...routedComponents,  ]
})
export class ReclamationModule { }
