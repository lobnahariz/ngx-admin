import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LigneReparationComponent} from "../ligne-reparation/ligne-reparation.component";
import {ReperationDocument} from "../../../model/reparationDocument";

@Component({
  selector: 'ngx-modifier-reparation',
  templateUrl: './modifier-reparation.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ModifierReparationComponent implements OnInit {

  constructor(private authorizationService: AuthenticationService, private router: Router,private modalService: NgbModal) { }
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
      etat: {
        title: 'Etat (En cours/En Attente/Terminée)',
        type: 'string',
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
      typePanne: {
        title: 'Type Panne(PC/Smartphone)',
        type: 'string',
      },
      estAccessoire: {
        title: 'A/S Accessoire',
        type: 'string',
      },
      accessoire: {
        title: 'Accessoire',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      delaiRreparationSouhaite: {
        title: 'Delai Reparation Souhaite',
        type: 'string',
      },
      documenttotalTTCReduction: {
        title: 'Total TTC',
        type: 'number',
        updateable: false,
        addable: false,
        editable: false,
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
  source: any;
  bonDeReparation:ReperationDocument;
  ngOnInit() {
    this.authorizationService.getReparation().subscribe(
      data => {
        this.source = data;
      }, err => {
        console.log("errr");
        //  this.authorizationService.logout();
        //   this.router.navigateByUrl("/auth/login");
      });
  }
  onSaveConfirm(event) {
    this.showLargeModal(event);
    this.authorizationService.getReparationById(event['newData']['id'])
      .subscribe(res => {

          this.bonDeReparation = res;
          let newReparationDocument: ReperationDocument = {
            id: this.bonDeReparation.id,
            ref: this.bonDeReparation.ref,
            dateCreation: event['newData']['dateCreation'],
            lieuCreation: event['newData']['lieuCreation'],
            linesDocument: 0,
            personId: this.bonDeReparation.personId,
            delaiLivraisonSouhaite: event['newData']['delaiLivraisonSouhaite'],
            achat: null,
            documenttotalHT: this.bonDeReparation.documenttotalHT,
            documenttotalTVA: this.bonDeReparation.documenttotalTVA,
            documenttotalReduction: this.bonDeReparation.documenttotalReduction,
            documenttotalTTC: this.bonDeReparation.documenttotalTTC,
            documenttotalTTCReduction: this.bonDeReparation.documenttotalTTCReduction,
            delaiRreparationSouhaite: event['newData']['delaiRreparationSouhaite'],
            estAccessoire: event['newData']['estAccessoire'],
            typePanne: event['newData']['typePanne'],
            etat: event['newData']['etat'],
            accessoire: event['newData']['accessoire'],
            description: event['newData']['description'],
            createdBy: this.bonDeReparation.createdBy,
            dateCreationAudit: this.bonDeReparation.dateCreationAudit,

          };
          this.authorizationService.updateReparation(newReparationDocument)
            .subscribe(ress => {
                event.confirm.resolve(newReparationDocument);

                this.ngOnInit();
              },
              err => {alert("An error occurred while saving the devis"); }
            );
          this.ngOnInit();
        },
        err => {alert("An error occurred while saving the devis"); }
      );

  }

  showLargeModal(event) {
    const activeModal = this.modalService.open(LigneReparationComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = "Bon De Reparation N° "+event['data']['ref']+"-"+event['data']['id'];
  }
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteReparation(event.data['id']).subscribe(
        data => {
          this.ngOnInit();
        }, err => {
          this.ngOnInit();
          console.log('error');
          event.confirm.reject();
        });
    }}

}
