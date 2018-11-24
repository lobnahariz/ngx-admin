import { Component, OnInit } from '@angular/core';
import {Produit} from '../../../model/produit';
import {AuthenticationService} from '../../../service/authentication-service';
import { Router} from '@angular/router';

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

  onCreateConfirm(event) {
    this.produit = new Produit(event['newData']['id'],event['newData']['ref'], event['newData']['quantite'], event['newData']['prixUnitaire']);

    this.authorizationService.addProduit(this.produit).subscribe(
      data => {
        console.log(data);
        event.confirm.resolve();
      }, err => {
        console.log('error');
        event.confirm.reject();
      });

    this.ngOnInit();

  }


  // @ts-ignore
  onSaveConfirm(event) {
    this.produit = new Produit(event['newData']['id'],event['newData']['ref'], event['newData']['quantite'], event['newData']['prixUnitaire']);

    this.authorizationService.updateProduit(this.produit).subscribe(
      data => {
        console.log(data);
        event.confirm.resolve();
      }, err => {
        console.log('error');
        event.confirm.reject();
      });

    this.ngOnInit();
  }


 }
