import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {ProduitService} from '../../../service/produit.service';
import {Produit} from '../../../shared/produit';

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

 source: LocalDataSource = new LocalDataSource();
 produit: Produit;

  constructor(private service: ProduitService) {
   // const data = this.service.getData();
   // this.source.load(data);
  }

  ngOnInit(): void {
    this.service.getProduits().subscribe(
      data => {
        this.source = data;
      }, err => {
        console.log('error');
      });
  }


  onDeleteConfirm(event) {
    console.log('Delete Event In Console');
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteProduit(event.data['id']).subscribe(
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

    this.service.addProduit(this.produit).subscribe(
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

    this.service.updateProduit(this.produit).subscribe(
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
