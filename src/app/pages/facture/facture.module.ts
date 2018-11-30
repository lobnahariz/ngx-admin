import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';
import { AjouterFactureComponent } from './ajouter-facture/ajouter-facture.component';
import {ThemeModule} from "../../@theme/theme.module";
import {SelectModule} from "ng-select";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {routedComponents} from "../facture/facture-routing.module";

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
  ]
})
export class FactureModule { }
