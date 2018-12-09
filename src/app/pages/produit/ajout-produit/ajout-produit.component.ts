import { Component, OnInit } from '@angular/core';
import {Produit} from '../../../model/produit';
import {AuthenticationService} from '../../../service/authentication-service';
import { Router} from '@angular/router';
import {Client} from "../../../model/client";

@Component({
  selector: 'ngx-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AjoutProduitComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      ref: {
        title: 'Ref',
        type: 'string',
      },
      quantite: {
        title: 'Quantite',
        type: 'number',
      },
      prixUnitaire: {
        title: 'Prix Unitaire',
        type: 'number',
      },
    },
  };
verifChamps: any="";
 //source: LocalDataSource = new LocalDataSource();
 produit: Produit;
source:any;
  constructor(private authorizationService: AuthenticationService,private router:Router) {
   // const data = this.service.getData();
   // this.source.load(data);
  }

  ngOnInit(): void {
    this.authorizationService.getProduits().subscribe(
      data => {
        this.source = data;
      }, err => {
        this.authorizationService.logout();
        this.router.navigateByUrl("/auth/login");
      });
  }


  onDeleteConfirm(event) {
    console.log('Delete Event In Console');
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteProduit(event.data['id']).subscribe(
        data => {
          this.ngOnInit();
        }, err => {
          this.ngOnInit();
          console.log('error');
          event.confirm.reject();
        });
  }}
  isVide(value: any, valeur: any) {
    if (value === "") {
      this.verifChamps = valeur + " est vide";
    }
  }

  isNotNumber(value: any, valeur: any) {
    if (isNaN(value)) {
      this.verifChamps = valeur + " doit etre un nombre";
    }
  }
  onCreateConfirm(event) {
    this.verifChamps = "";
    let newProduit:  Produit= {
        id: null,
      ref: event['newData']['ref'],
        quantite: event['newData']['quantite'],
      prixUnitaire:event['newData']['prixUnitaire'],
        createdBy: event['newData']['createdBy'],
        dateCreationAudit: event['newData']['dateCreationAudit'],
    };
    this.isVide(event['newData']['ref'], "Ref");

    this.isVide(event['newData']['quantite'], "Qte");
    this.isNotNumber(event['newData']['quantite'], "Qte");

    this.isVide(event['newData']['prixUnitaire'], "PrixUnitaire");
    this.isNotNumber(event['newData']['prixUnitaire'], "PrixUnitaire");
    if(this.verifChamps === "") {
      this.authorizationService.addProduit(newProduit).subscribe(
        data => {
          this.ngOnInit();
          event.confirm.resolve();
        }, err => {
          console.log('error');
          event.confirm.reject();
        });
    }

  }


  // @ts-ignore
  onSaveConfirm(event) {
    this.verifChamps = "";
let   newProduit : Produit = {
      id:event['newData']['id'],
      ref:event['newData']['ref'],
      quantite: event['newData']['quantite'],
       prixUnitaire:event['newData']['prixUnitaire'],
       createdBy: event['newData']['createdBy'],
       dateCreationAudit: event['newData']['dateCreationAudit'],
    };
    this.isVide(event['newData']['ref'], "Ref");

    this.isVide(event['newData']['quantite'], "Qte");
    this.isNotNumber(event['newData']['quantite'], "Qte");

    this.isVide(event['newData']['prixUnitaire'], "PrixUnitaire");
    this.isNotNumber(event['newData']['prixUnitaire'], "PrixUnitaire");

    if(this.verifChamps === "") {
      this.authorizationService.updateProduit(newProduit).subscribe(
        data => {
          this.ngOnInit();
          event.confirm.resolve();
        }, err => {
          console.log('error');
          event.confirm.reject();
        });
    }
  }


 }
