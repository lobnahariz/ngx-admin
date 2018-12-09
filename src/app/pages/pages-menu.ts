import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/pages/ui-features/modals',
      },
      {
        title: 'Popovers',
        link: '/pages/ui-features/popovers',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/pages/ui-features/tabs',
      },
    ],
  },
  {
    title: 'Client',
    icon: 'nb-person',
    children: [
      {
        title: 'Gestion Client',
        link: '/pages/client/gestionClient',
      },
    ],
  },
  {
    title: 'Fournisseur',
    icon: 'nb-coffee-maker',
    children: [
      {
        title: 'Gestion Fournisseur',
        link: '/pages/fournisseur/gestionFournisseur',
      },
    ],
  },
  {
    title: 'Produit',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'Gestion Produit',
        link: '/pages/produit/gestionProduit',
      },
    ],
  }, {
    title: 'Gestion Achat/Vente',
    icon: 'nb-compose',
    children: [
      {
        title: 'Nouveau Devis',
        link: '/pages/devis/nouveauDevis',
      },
      {
        title: 'Modifier Devis',
        link: '/pages/devis/modifierDevis',
      },
      {
        title: 'Nouveau Bon De Livraison',
        link: '/pages/bon-livraison/nouveauBonDeLivraison',
      },
      {
        title: 'Modifier Bon De Livraison',
        link: '/pages/bon-livraison/modifierBonDeLivraison',
      }, {
        title: 'Nouvelle Facture',
        link: '/pages/facture/nouvelleFacture',
      },
      {
        title: 'Modifier Reglement',
        link: '/pages/facture/modifierReglement',
      },
      {
        title: 'Consulter Facture',
        link: '/pages/facture/consulterFacture',
      },
    ],
  },

  {
    title: 'Avoir',
    icon: 'nb-compose',
    children: [
      {
        title: 'Nouveau Avoir',
        link: '/pages/avoir/nouveauAvoir',
      },
    ],
  },
  {
    title: 'Document',
    icon: 'nb-compose',
    children: [
      {
        title: 'Nouveau Doc',
        link: '/pages/document/nouveauDocument',
      },
    ],
  },
  {
    title: 'Reclamation',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'Gestion Reclamation',
        link: '/pages/reclamation/gestionReclamation',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/pages/components/tree',
      }, {
        title: 'Notifications',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
