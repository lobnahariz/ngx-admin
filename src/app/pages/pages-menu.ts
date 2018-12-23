import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Client',
    icon: 'nb-person',
    children: [
      {
        title: 'Gestion Categorie',
        link: '/pages/client/gestionCategorie',
      },
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
        title: 'Gestion Categorie',
        link: '/pages/fournisseur/gestionCategorieFournisseur',
      },
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
        title: 'Gestion Categorie',
        link: '/pages/produit/gestionCategorieProduit',
      },
      {
        title: 'Gestion Produit',
        link: '/pages/produit/gestionProduit',
      },
    ],
  },

  {
    title: 'Nouveau Achat/Vente',
    icon: 'nb-plus-circled',
    children: [
      {
        title: 'Nouveau Devis',
        link: '/pages/devis/nouveauDevis',
      },
      {
        title: 'Nouveau Bon De Livraison',
        link: '/pages/bon-livraison/nouveauBonDeLivraison',
      },
      {
        title: 'Nouvelle Facture',
        link: '/pages/facture/nouvelleFacture',
      },
    ],
  },
  {
    title: 'Modifier Achat/Vente',
    icon: 'nb-compose',
    children: [
      {
        title: 'Modifier Devis',
        link: '/pages/devis/modifierDevis',
      },
      {
        title: 'Modifier Bon De Livraison',
        link: '/pages/bon-livraison/modifierBonDeLivraison',
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
    title: 'Reparation',
    icon: 'nb-plus',
    children: [
      {
        title: 'Nouvelle Reparation',
        link: '/pages/reparation/nouvelleReparation',
      },
      {
        title: 'Modifier Reparation',
        link: '/pages/reparation/modifierReparation',
      },
    ],
  },
  {
    title: 'Retour',
    icon: 'nb-arrow-retweet',
    children: [
      {
        title: 'Nouveau Avoir',
        link: '/pages/avoir/nouveauAvoir',
      },
      {
        title: 'Consulter Avoir',
        link: '/pages/avoir/consulterAvoir',
      },
    ],
  },
  {
    title: 'Utilisateur',
    icon: 'nb-star',
    children: [
      {
        title: 'Gestion Utilisateurs',
        link: '/pages/utilisateur/gestionUtilisateur',
      },
    ],
  },
  {
    title: 'Reclamation',
    icon: 'nb-lightbulb',
    children: [
      {
        title: 'Gestion Reclamation',
        link: '/pages/reclamation/gestionReclamation',
      },
      {
        title: 'Validation Reclamation',
        link: '/pages/reclamation/validationReclamation',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Vente',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Achat',
        link: '/pages/charts/chartjs',
      },
    ],
  },
];
