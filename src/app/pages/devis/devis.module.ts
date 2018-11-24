import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import {DevisRoutingModule, routedComponents} from './devis-routing.module';
import {SelectModule} from 'ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ModifierDevisComponent } from './modifier-devis/modifier-devis.component';
@NgModule({
  imports: [
    CommonModule,
    DevisRoutingModule,
    ThemeModule,
    SelectModule,
    Ng2SmartTableModule,
    HttpClientModule,
    HttpModule,
  ],
  declarations: [
    ...routedComponents,
    ModifierDevisComponent,
  ],
})
export class DevisModule { }
