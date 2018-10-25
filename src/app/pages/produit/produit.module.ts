import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProduitRoutingModule , routedComponents} from './produit-routing.module';
import {ProduitService} from './produit.service';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    ProduitRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
      ...routedComponents,
    ],
  providers: [
    ProduitService,
  ],
})
export class ProduitModule { }
