import { NgModule } from '@angular/core';

import { FournisseurRoutingModule,routedComponents } from './fournisseur-routing.module';
import {ThemeModule} from "../../@theme/theme.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ProduitService} from "../../service/produit.service";

@NgModule({
  imports: [
    ThemeModule,
    FournisseurRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProduitService,
  ],
})
export class FournisseurModule { }
