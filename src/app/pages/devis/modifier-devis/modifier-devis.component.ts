import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LigneModalComponent} from "../ligne-modal/ligne-modal.component";
import {ModalComponent} from "../../ui-features/modals/modal/modal.component";
import {DevisDocument} from "../../../model/devisDocument";

@Component({
  selector: 'ngx-modifier-devis',
  templateUrl: './modifier-devis.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ModifierDevisComponent implements OnInit {

  constructor(private authorizationService: AuthenticationService,private router:Router,private modalService: NgbModal) { }
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
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
      achat: {
        title: 'Type',
        type: 'boolean',
        editable: false,


      },
      ref: {
        title: 'Ref',
        type: 'string',


      },
      dateCreation: {
        title: 'Date Creation',
        type: 'string',

      },
      lieuCreation: {
        title: 'Lieu Creation',
        type: 'string',

      },
      delaiLivraisonSouhaite: {
        title: 'Delai Livraison Souhaite',
        type: 'string',

      },
    },
  };
  source:any;
  ngOnInit() {

    this.authorizationService.getDevisDocument().subscribe(
      data => {
        this.source = data;
      }, err => {
        console.log("errr");

      });
  }


  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteDevisDocument(event.data['id']).subscribe(
        data => {
          this.ngOnInit();
        }, err => {
          this.ngOnInit();
          console.log('error');
          event.confirm.reject();
        });
    }}

  onSaveConfirm(event) {
    this.showLargeModal(event);
console.log(event);
console.log(event["newData"]);
console.log(event["data"]);
  let newDevis: DevisDocument = {
      id: event['newData']['id'],
      ref: event['newData']['ref'],
      dateCreation: event['newData']['dateCreation'],
      lieuCreation: event['newData']['lieuCreation'],
      linesDocument: 0,
      personId: event['newData']['personne']['id'],
      delaiLivraisonSouhaite: event['newData']['delaiLivraisonSouhaite'],
      achat: event['newData']['achat'],
    documenttotalHT: event['newData']['documenttotalHT'],
    documenttotalTVA: event['newData']['documenttotalTVA'],
    documenttotalReduction: event['newData']['documenttotalReduction'],
    documenttotalTTC: event['newData']['documenttotalTTC'],
    documenttotalTTCReduction: event['newData']['documenttotalTTCReduction'],
    };

    console.log(newDevis);
   this.authorizationService.addEnteteDocument(newDevis)
      .subscribe(res => {
          newDevis.id = res.id;
         this.ngOnInit();
        },
        err => {alert("An error occurred while saving the devis"); }
      );
    console.log("*******************");

    console.log(event);
    event.confirm.resolve();
  }

  showLargeModal(event) {
    const activeModal = this.modalService.open(LigneModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = "Devis N° "+event['data']['ref']+"-"+event['data']['id'];
  }


}
