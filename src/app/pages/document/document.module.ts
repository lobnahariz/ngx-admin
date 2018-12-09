import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { routedComponents} from "./document-routing.module";
@NgModule({
  imports: [
    CommonModule,
    DocumentRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class DocumentModule { }
