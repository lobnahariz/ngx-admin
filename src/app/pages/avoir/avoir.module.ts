import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvoirRoutingModule,routedComponents } from './avoir-routing.module';
import {ThemeModule} from "../../@theme/theme.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { LigneModalComponent } from './ligne-modal/ligne-modal.component';
import { LigneConsultationComponent } from './ligne-consultation/ligne-consultation.component';

@NgModule({
  imports: [
    CommonModule,
    AvoirRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,

  ],
  declarations: [
    ...routedComponents,
    LigneModalComponent,
    LigneConsultationComponent,
  ],
  entryComponents: [
    LigneModalComponent,
    LigneConsultationComponent,
  ],
})
export class AvoirModule { }
