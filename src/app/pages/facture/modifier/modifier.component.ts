import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {BonDeLivraisonDocument} from "../../../model/BonDeLivraisonDocument";
import {FactureDocument} from "../../../model/factureDocument";

@Component({
  selector: 'ngx-modifier',
  templateUrl: './modifier.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ModifierComponent implements OnInit {

  constructor(private devisService: AuthenticationService, private router: Router) { }

  settings = {
    actions: {
      add: false,
      edit: true,
      delete: false,
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
        updateable: false,
        addable: false,
        editable: false,

      },
      ref: {
        title: 'Ref',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      etat: {
        title: 'Etat',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      modeReglement: {
        title: 'Mode Reglement',
        type: 'string',
      },
      montantPaye: {
        title: 'Montant Total Paye',
        type: 'number',
      },
      dateLimiteReglement: {
        title: 'Date Limite Reglement',
        type: 'string',
      },
      details:{
        title: 'Details',
        type: 'string',
      },
      documenttotalTTCReduction: {
        title: 'Total TTC',
        type: 'number',
        updateable: false,
        addable: false,
        editable: false,
      },
    },
  };
  source: any;
  montantSuperieur:any= "";
  facture:any;
  ngOnInit() {

    this.devisService.getFactureNonPaye()
      .subscribe(resultat => {
        this.source = resultat;
        }, error => {
          console.log("err");
          // this.event.confirm.reject();
        }
      );
  }


  onSaveConfirm(event) {
this.montantSuperieur ="";

    this.devisService.getFactureByRef(event['newData']['ref'])
      .subscribe(resultat => {
          this.facture = resultat;
        }, error => {
          console.log("err");
          // this.event.confirm.reject();
        }
      );

    if (event['newData']['montantPaye'] > event['newData']['documenttotalTTCReduction']) {
      this.montantSuperieur ="Montant Incorrect"
    } else {

      if (event['newData']['montantPaye'] < event['newData']['documenttotalTTCReduction']) {

        let newFacture: FactureDocument = {
          id: event['newData']['id'],
          ref: event['newData']['ref'],
          dateCreation: event['newData']['dateCreation'],
          lieuCreation: event['newData']['lieuCreation'],
          linesDocument: event['newData']['linesDocument'],
          personId: event['newData']['personId'],
          etat: 'payeenpartie',
          montantPaye: event['newData']['montantPaye'],
          modeReglement: event['newData']['modeReglement'],
          dateLimiteReglement: event['newData']['dateLimiteReglement'],
          details: event['newData']['details'],
          achat: event['newData']['achat'],
          documenttotalHT: event['newData']['documenttotalHT'],
          documenttotalTVA: event['newData']['documenttotalTVA'],
          documenttotalReduction: event['newData']['documenttotalReduction'],
          documenttotalTTC: event['newData']['documenttotalTTC'],
          documenttotalTTCReduction: event['newData']['documenttotalTTCReduction'],
          createdBy:event['newData']['createdBy'],
          dateCreationAudit:event['newData']['dateCreationAudit'],
        };
        this.devisService.updateFactureDocument(newFacture)
          .subscribe(res => {
              event.confirm.resolve();
              this.ngOnInit();

            },
            err => {
              alert("An error occurred while saving the devis");
            }
          );
      } else {

        let newFacture: FactureDocument = {
          id: event['newData']['id'],
          ref: event['newData']['ref'],
          dateCreation: event['newData']['dateCreation'],
          lieuCreation: event['newData']['lieuCreation'],
          linesDocument: event['newData']['linesDocument'],
          personId: event['newData']['personId'],
          etat: 'paye',
          montantPaye: event['newData']['montantPaye'],
          modeReglement: event['newData']['modeReglement'],
          dateLimiteReglement: event['newData']['dateLimiteReglement'],
          details: event['newData']['details'],
          achat: event['newData']['achat'],
          documenttotalHT: event['newData']['documenttotalHT'],
          documenttotalTVA: event['newData']['documenttotalTVA'],
          documenttotalReduction: event['newData']['documenttotalReduction'],
          documenttotalTTC: event['newData']['documenttotalTTC'],
          documenttotalTTCReduction: event['newData']['documenttotalTTCReduction'],
          createdBy:event['newData']['createdBy'],
          dateCreationAudit:event['newData']['dateCreationAudit'],
        };
        this.devisService.updateFactureDocument(newFacture)
          .subscribe(res => {

              event.confirm.resolve();
              this.ngOnInit();

            },
            err => {
              alert("An error occurred while saving the devis");
            }
          );
      }
      ;


    }
  }
}
