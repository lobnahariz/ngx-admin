import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReparationRoutingModule } from './reparation-routing.module';

import {routedComponents} from "./reparation-routing.module";
import {ThemeModule} from "../../@theme/theme.module";
import {SelectModule} from "ng-select";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import { LigneReparationComponent } from './ligne-reparation/ligne-reparation.component';

@NgModule({
  imports: [
    CommonModule,
    ReparationRoutingModule,
    ThemeModule,
    SelectModule,
    Ng2SmartTableModule,
    HttpClientModule,
    HttpModule,
  ],
  declarations: [
    ...routedComponents,
    LigneReparationComponent,
  ],
  entryComponents: [
    LigneReparationComponent,
  ],
})
export class ReparationModule { }
