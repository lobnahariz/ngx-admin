import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BonDeLivraisonDocument} from "../../../model/BonDeLivraisonDocument";
import {LigneModalComponent} from "../ligne-modal/ligne-modal.component";
import {BonLivraisonComponent} from "../bon-livraison.component";

@Component({
  selector: 'ngx-modifier-bon-livraison',
  templateUrl: './modifier-bon-livraison.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ModifierBonLivraisonComponent implements OnInit {
  documenttotalReduction: any = 0;
  documenttotalHT: any = 0;
  documenttotalTVA: any = 0;
  documenttotalTTC: any = 0;
  documenttotalTTCReduction: any = 0;

  constructor(private authorizationService: AuthenticationService,private router:Router,private modalService: NgbModal) {}
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
      receptionDate: {
        title: 'Date Reception',
        type: 'string',
      },
      receptionPersonne: {
        title: 'Personne Reception',
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
    this.authorizationService.getBonDeLivraison().subscribe(
      data => {
        this.source = data;
      }, err => {
        console.log("errr");
        //  this.authorizationService.logout();
        //   this.router.navigateByUrl("/auth/login");
      });
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteBonDeLivraison(event.data['id']).subscribe(
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

    this.authorizationService.getBonLivraisonDocumentById(event['newData']['id']).subscribe(
      data => {
        this.documenttotalHT = data.documenttotalHT;
        this.documenttotalTVA = data.documenttotalTVA;
        this.documenttotalReduction = data.documenttotalReduction;
        this.documenttotalTTC = data.documenttotalTTC;
        this.documenttotalTTCReduction = data.documenttotalTTCReduction;



        let newBonDeLivraison: BonDeLivraisonDocument = {
          id: event['newData']['id'],
          ref: event['newData']['ref'],
          dateCreation: event['newData']['dateCreation'],
          lieuCreation: event['newData']['lieuCreation'],
          linesDocument: 0,
          accuse_reception: event['newData']['accuse_reception'],
          receptionDate: event['newData']['receptionDate'],
          receptionPersonne: event['newData']['receptionPersonne'],
          achat: event['newData']['achat'],
          personId:  event['newData']['personne']['id'],
          documenttotalHT: this.documenttotalHT,
          documenttotalTVA: this.documenttotalTVA,
          documenttotalReduction: this.documenttotalReduction,
          documenttotalTTC: this.documenttotalTTC,
          documenttotalTTCReduction: this.documenttotalTTCReduction,
          createdBy: event['newData']['createdBy'],
          dateCreationAudit: event['newData']['dateCreationAudit'],
        };

        this.authorizationService.updateBonDeLivraisonDocument(newBonDeLivraison)
          .subscribe(res => {
              event.confirm.resolve(newBonDeLivraison);

              this.ngOnInit();
            },
            err => {alert("An error occurred while saving the devis"); }
          );
        },
      err => {// @ts-ignore
    }
    );
  }

  showLargeModal(event) {
    const activeModal = this.modalService.open(LigneModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = "Bon De Livraison N° "+event['data']['ref']+"-"+event['data']['id'];
  }


}
