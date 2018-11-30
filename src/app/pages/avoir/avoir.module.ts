import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvoirRoutingModule,routedComponents } from './avoir-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AvoirRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class AvoirModule { }
