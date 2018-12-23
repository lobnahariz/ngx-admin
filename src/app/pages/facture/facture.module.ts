import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import {ThemeModule} from "../../@theme/theme.module";
import {SelectModule} from "ng-select";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {routedComponents} from "../facture/facture-routing.module";
import { LigneModelComponent } from './ligne-model/ligne-model.component';

@NgModule({
  imports: [
    CommonModule,
    FactureRoutingModule,
    ThemeModule,
    SelectModule,
    Ng2SmartTableModule,
    HttpClientModule,
    HttpModule,
  ],
  declarations: [
    ...routedComponents,
    LigneModelComponent,
  ],
  entryComponents: [
    LigneModelComponent,
  ],
})
export class FactureModule { }
