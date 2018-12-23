import { NgModule } from '@angular/core';

import { ReclamationRoutingModule } from './reclamation-routing.module';

import {routedComponents} from "./reclamation-routing.module";
import {ThemeModule} from "../../@theme/theme.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { ValiderReclamationComponent } from './valider-reclamation/valider-reclamation.component';

@NgModule({
  imports: [
    ThemeModule,
    ReclamationRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    ValiderReclamationComponent,
  ]
})
export class ReclamationModule { }
