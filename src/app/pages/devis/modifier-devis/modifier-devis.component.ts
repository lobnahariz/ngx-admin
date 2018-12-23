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
  documenttotalReduction: any = 0;
  documenttotalHT: any = 0;
  documenttotalTVA: any = 0;
  documenttotalTTC: any = 0;
  documenttotalTTCReduction: any = 0;
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
        type: 'string',
        editable: false,


      },
      ref: {
        title: 'Ref',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,

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
      createdBy: {
        title: 'Crée Par',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      modifiedBy: {
        title: 'Modifier Par',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      dateCreationAudit: {
        title: 'Date Creation',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      derniereDateModif: {
        title: 'Derniere Date Modif',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
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
  let  devis: DevisDocument;
    this.authorizationService.getDevisDocumentById(event['newData']['id']).subscribe(
      data => {
        this.documenttotalHT = data.documenttotalHT;
          this.documenttotalTVA = data.documenttotalTVA;
          this.documenttotalReduction = data.documenttotalReduction;
          this.documenttotalTTC = data.documenttotalTTC;
          this.documenttotalTTCReduction = data.documenttotalTTCReduction;



        let newDevis: DevisDocument = {
          id: event['newData']['id'],
          ref: event['newData']['ref'],
          dateCreation: event['newData']['dateCreation'],
          lieuCreation: event['newData']['lieuCreation'],
          linesDocument: 0,
          personId: event['newData']['personne']['id'],
          delaiLivraisonSouhaite: event['newData']['delaiLivraisonSouhaite'],
          achat: event['newData']['achat'],
          createdBy: event['newData']['createdBy'],
          dateCreationAudit: event['newData']['dateCreationAudit'],
          documenttotalHT: this.documenttotalHT,
          documenttotalTVA: this.documenttotalTVA,
          documenttotalReduction: this.documenttotalReduction,
          documenttotalTTC: this.documenttotalTTC,
          documenttotalTTCReduction: this.documenttotalTTCReduction,
        };

        this.authorizationService.updateEnteteDocument(newDevis)
          .subscribe(res => {
              event.confirm.resolve(newDevis);
              this.ngOnInit();
            },
            err => {// @ts-ignore
              alert("An error occurred while saving the devis"); }
          );

      },
      err => {// @ts-ignore
        alert("An error occurred while saving the devis"); }
    );



  }

  showLargeModal(event) {
    const activeModal = this.modalService.open(LigneModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = "Devis N° "+event['data']['ref']+"-"+event['data']['id'];
  }


}
