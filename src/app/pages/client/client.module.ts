import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import { routedComponents} from '../client/client-routing.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    ClientRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class ClientModule { }
