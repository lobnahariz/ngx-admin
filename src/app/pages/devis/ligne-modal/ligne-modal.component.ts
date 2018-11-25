import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "../../../service/authentication-service";
import {LineDocument} from "../../../model/lineDocument";
import {BonDeLivraisonDocument} from "../../../model/BonDeLivraisonDocument";

@Component({
  selector: 'ngx-ligne-modal',
  templateUrl: './ligne-modal.component.html',
})
export class LigneModalComponent implements OnInit {
  modalHeader: string;
  modalContent = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
    nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.`;

  constructor(private activeModal: NgbActiveModal, private authorizationService: AuthenticationService) {

  }
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
      code: {
        title: 'Code',
        type: 'string',
      },
      qte: {
        title: 'Qte',
        type: 'number',
      },
      puHT: {
        title: 'PU HT',
        type: 'number',
      },
      tva: {
        title: 'TVA',
        type: 'number',
      },
      totalHT: {
        title: 'Total HT',
        type: 'number',
      },
      totalTTC: {
        title: 'Total TTC',
        type: 'number',
      },
    },
  };
  source:any;
   entetId:number;
   lines: LineDocument[] = [];
  linesDocument: LineDocument[] = [];

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit(): void {
     this.entetId=parseInt(this.modalHeader.substring(this.modalHeader.indexOf("-")+1,this.modalHeader.length));

   this.authorizationService.getLinesDocumentByDocumentId(this.entetId).subscribe(
      data => {
        this.source = data;
      }, err => {
        console.log("errr");
      });
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteLine(event.data['id_line']).subscribe(
        data => {
          event.confirm.resolve();
          this.ngOnInit();
        }, err => {
          this.ngOnInit();
          console.log('error');
          event.confirm.reject();
        });
    }}

  onCreateConfirm(event) {
    let newLine: LineDocument = {
      id_line: null,
      code: event['newData']['code'],
      qte: event['newData']['qte'],
      puHT: event['newData']['puHT'],
      tva: event['newData']['tva'],
      totalHT: event['newData']['totalHT'],
      totalTTC: event['newData']['totalTTC'],
      enteteId: null,
    };

    this.authorizationService.addLineDocument(newLine,  this.entetId)
      .subscribe(resultat => {
        event.confirm.resolve();
          //  this.event.confirm.resolve(this.event.newData);
        },error => {
          console.log("err");
          // this.event.confirm.reject();
        }
      );

    this.ngOnInit();

  }


  onSaveConfirm(event) {
   let newLine: LineDocument = {
     id_line: event['newData']['id_line'],
        code: event['newData']['code'],
        qte: event['newData']['qte'],
        puHT: event['newData']['puHT'],
        tva: event['newData']['tva'],
        totalHT: event['newData']['totalHT'],
        totalTTC: event['newData']['totalTTC'],
        enteteId: event['newData']['enteteId'],
      };
    this.authorizationService.addLineDocument(newLine,  this.entetId)
      .subscribe(resultat => {
          event.confirm.resolve();
          //  this.event.confirm.resolve(this.event.newData);
        },error => {
          console.log("err");
          // this.event.confirm.reject();
        }
      );
      event.confirm.resolve();
  }



  genererBonLivraison(){


   let newDevis: any;
   let newBonDeLivraisonOrigin: BonDeLivraisonDocument;
    this.authorizationService.getDevisDocumentById(this.entetId)
      .subscribe(res => {
          let newBonDeLivraison: BonDeLivraisonDocument = {
            id: null,
            ref: 'B'+res.ref,
            dateCreation: res.dateCreation,
            lieuCreation: res.lieuCreation,
            linesDocument: 0,
            personId: 0,
            accuse_reception: true,
            receptionDate: null,
            receptionPersonne: null,
          };
          this.authorizationService.addBonDeLivraisonEntete(newBonDeLivraison)
            .subscribe(ress => {
                newBonDeLivraison.id = ress.id;
                this.createLineDocument(newBonDeLivraison.id);

                // this.idEntete = res.id;
                // this.createLineDocument(newBonDeLivraison, newBonDeLivraison.id);
              },
              err => {alert("An error occurred while saving the devis"); }
            );
          },
        err => {alert("An error occurred while saving the devis"); }
      );


  }

  createLineDocument(id: number) {
   this.authorizationService.getLinesDocumentByDocumentId(this.entetId)
     .subscribe(result => {
       this.linesDocument = result;
       this.linesDocument.forEach(line => {
         let newLine: LineDocument = {
           id_line: null,
           code: line.code,
           qte: line.qte,
           puHT: line.puHT,
           tva: line.tva,
           totalHT: line.totalHT,
           totalTTC: line.totalTTC,
           enteteId: id,
         };
          this.authorizationService.addLineDocument(newLine, id)
            .subscribe(po => {
              console.log("yes");
            },
                err => {alert("An error occurred while saving the devis"); }
            );
      })
       },
         err => {alert("An error occurred while saving the devis"); }
      );
  }
}
