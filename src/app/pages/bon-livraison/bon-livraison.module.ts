import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonLivraisonRoutingModule } from './bon-livraison-routing.module';
import {routedComponents} from './bon-livraison-routing.module';
import {ThemeModule} from "../../@theme/theme.module";
import {SelectModule} from "ng-select";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    BonLivraisonRoutingModule,
    ThemeModule,
    SelectModule,
    Ng2SmartTableModule,
    HttpClientModule,
    HttpModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class BonLivraisonModule { }
