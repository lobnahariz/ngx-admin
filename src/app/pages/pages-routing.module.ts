import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{
      path: 'dashboard',
      component: ECommerceComponent,
    }, {
      path: 'iot-dashboard',
      component: DashboardComponent,
    }, {
      path: 'ui-features',
      loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
    }, {
      path: 'components',
      loadChildren: './components/components.module#ComponentsModule',
    }, {
      path: 'maps',
      loadChildren: './maps/maps.module#MapsModule',
    }, {
      path: 'charts',
      loadChildren: './charts/charts.module#ChartsModule',
    }, {
      path: 'editors',
      loadChildren: './editors/editors.module#EditorsModule',
    },{
      path: 'fournisseur',
      loadChildren: './fournisseur/fournisseur.module#FournisseurModule',
    },
      {
        path: 'client',
        loadChildren: './client/client.module#ClientModule',
      }, {
        path: 'produit',
        loadChildren: './produit/produit.module#ProduitModule',
      }, {
        path: 'devis',
        loadChildren: './devis/devis.module#DevisModule',
      }, {
        path: 'facture',
        loadChildren: './facture/facture.module#FactureModule',
      },
      {
        path: 'avoir',
        loadChildren: './avoir/avoir.module#AvoirModule',
      },
      {
        path: 'bon-livraison',
        loadChildren: './bon-livraison/bon-livraison.module#BonLivraisonModule',
      },
      {
        path: 'reclamation',
        loadChildren: './reclamation/reclamation.module#ReclamationModule',
      },
      {
        path: 'utilisateur',
        loadChildren: './utilisateur/utilisateur.module#UtilisateurModule',
      },
      {
        path: 'reparation',
        loadChildren: './reparation/reparation.module#ReparationModule',
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule',
      }, {
        path: 'miscellaneous',
        loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
      }, {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, {
        path: '**',
        component: NotFoundComponent,
      }],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
