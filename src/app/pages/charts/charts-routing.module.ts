import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { EchartsComponent } from './echarts/echarts.component';
import { D3Component } from './d3/d3.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import {ProduitComponent} from "./produit/produit.component";
import {RemiseComponent} from "./remise/remise.component";
import {AvoirComponent} from "./avoir/avoir.component";

const routes: Routes = [{
  path: '',
  component: ChartsComponent,
  children: [{
    path: 'echarts',
    component: EchartsComponent,
  }, {
    path: 'd3',
    component: D3Component,
  }, {
    path: 'chartjs',
    component: ChartjsComponent,
  }, {
    path: 'produit',
    component: ProduitComponent,
  }, {
      path: 'remise',
      component: RemiseComponent,
    }, {
      path: 'avoir',
      component: AvoirComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule { }

export const routedComponents = [
  ChartsComponent,
  EchartsComponent,
  D3Component,
  ChartjsComponent,
  ProduitComponent,
  RemiseComponent,
  AvoirComponent
];
