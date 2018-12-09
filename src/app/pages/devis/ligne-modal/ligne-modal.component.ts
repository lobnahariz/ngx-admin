import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "../../../service/authentication-service";
import {LineDocument} from "../../../model/lineDocument";
import {BonDeLivraisonDocument} from "../../../model/BonDeLivraisonDocument";
import {DevisDocument} from "../../../model/devisDocument";

@Component({
  selector: 'ngx-ligne-modal',
  templateUrl: './ligne-modal.component.html',
})
export class LigneModalComponent implements OnInit {
  modalHeader: string;
  modalContent = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
    nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
    nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.`;

  documenttotalReduction: any = 0;
  documenttotalHT: any = 0;
  documenttotalTVA: any = 0;
  documenttotalTTC: any = 0;
  documenttotalTTCReduction: any = 0;
  constructor(private activeModal: NgbActiveModal, private authorizationService: AuthenticationService) {

  }
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
    },
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
      reduction: {
        title: 'Reduction%',
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
        updateable: false,
        addable: false,
        editable: false,

      },
      totalTTC: {
        title: 'Total TTC',
        type: 'number',
        addable: false,
        updateable: false,
        editable: false,

      },
    },
  };
  source:any;
   entetId:number;
   lines: LineDocument[] = [];
  linesDocument: LineDocument[] = [];
  closeModal() {
    let devisAModifier: any= "";
    this.activeModal.close();

    this.authorizationService.getDevisDocumentById(this.entetId).subscribe(
      data => {

        let newDevis: DevisDocument = {
          id: data.id,
          ref: data.ref,
          dateCreation: data.dateCreation,
          lieuCreation:data.lieuCreation,
          linesDocument: 0,
          personId:data.personId,
          delaiLivraisonSouhaite: data.delaiLivraisonSouhaite,
          achat: data.achat,
          documenttotalHT: this.documenttotalHT,
          documenttotalTVA: this.documenttotalTVA,
          documenttotalReduction: this.documenttotalReduction,
          documenttotalTTC: this.documenttotalTTC,
          documenttotalTTCReduction: this.documenttotalTTCReduction,
          createdBy: data.createdBy,
          dateCreationAudit: data.dateCreationAudit,
        };


        this.authorizationService.updateEnteteDocument(newDevis)
          .subscribe(res => {
            },
            err => {
              alert("An error occurred while saving the devis");
            }
          );

      }, err => {
        console.log("errr");

      });


  }

  ngOnInit(): void {



     this.entetId=parseInt(this.modalHeader.substring(this.modalHeader.indexOf("-")+1,this.modalHeader.length));

    this.authorizationService.getDevisDocumentById(this.entetId).subscribe(
      data => {

        this.documenttotalHT = data.documenttotalHT;
        this.documenttotalReduction = data.documenttotalReduction;
        this.documenttotalTTC = data.documenttotalTTC;
        this.documenttotalTTCReduction = data.documenttotalTTCReduction;
        this.documenttotalTVA = data.documenttotalTVA;

      }, err => {
        console.log("errr");

      });

   this.authorizationService.getLinesDocumentByDocumentId(this.entetId).subscribe(
      data => {
        this.source = data;
      }, err => {
        console.log("errr");
      });
  }

 /* onDeleteConfirm(event) {
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
    }}*/

/*  onCreateConfirm(event) {
    let newLine: LineDocument = {
      id_line: null,
      code: event['newData']['code'],
      qte: event['newData']['qte'],
      puHT: event['newData']['puHT'],
      tva: event['newData']['tva'],
      totalHT: event['newData']['totalHT'],
      totalTTC: event['newData']['totalTTC'],
      enteteId: event['newData']['enteteId'],
      reduction: event['newData']['reduction'],
    };

    this.authorizationService.addLineDocument(newLine,  this.entetId)
      .subscribe(resultat => {



        const totalHT = (resultat.qte * resultat.puHT);
        event.newData.totalHT = totalHT;

     //   newLine.totalHT = totalHT;

        this.documenttotalHT = this.documenttotalHT + totalHT;

        this.documenttotalTVA = this.documenttotalTVA + (totalHT * (resultat.tva / 100));


        event.newData.totalTTC = newLine.totalTTC;

        this.documenttotalTTC = this.documenttotalTTC + newLine.totalTTC;


        const reduction = newLine.totalTTC * (newLine.reduction / 100);
        this.documenttotalReduction = this.documenttotalReduction + reduction;


        this.documenttotalTTCReduction = this.documenttotalTTC - reduction;
          event.confirm.resolve(event["newData"]);


        //  this.event.confirm.resolve(this.event.newData);
        },error => {
          console.log("err");
          // this.event.confirm.reject();
        }
      );


  }

*/
 /* onSaveConfirm(event) {
   let newLine: LineDocument = {
     id_line: event['newData']['id_line'],
        code: event['newData']['code'],
        qte: event['newData']['qte'],
        puHT: event['newData']['puHT'],
        tva: event['newData']['tva'],
        totalHT: event['newData']['totalHT'],
        totalTTC: event['newData']['totalTTC'],
        enteteId: event['newData']['enteteId'],
     reduction: event['newData']['reduction'],
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
*/


  onSaveConfirm(event) {
    console.log(event);


    this.source.forEach(p => {
      if (p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva) {
        p.qte = event["newData"]["qte"];
        const index = this.source.indexOf(p);

        let newLine: LineDocument = {
          id_line: event['newData']['id_line'],
          code: event['newData']['code'],
          qte: event['newData']['qte'],
          puHT: event['newData']['puHT'],
          tva: event['newData']['tva'],
          totalHT: event['newData']['totalHT'],
          totalTTC: event['newData']['totalTTC'],
          enteteId: event['newData']['enteteId'],
          reduction: event['newData']['reduction'],
          createdBy: event['newData']['createdBy'],
          dateCreationAudit: event['newData']['dateCreationAudit'],
        };


        const totalHT = (event['newData']['qte'] * event['newData']['puHT']);
        event.newData.totalHT = totalHT;

        newLine.totalHT = totalHT;

        this.documenttotalHT = this.documenttotalHT - event["data"]["totalHT"];
        this.documenttotalHT = this.documenttotalHT + totalHT;

        this.documenttotalTVA = this.documenttotalTVA - (event["data"]["totalHT"] * (event["data"]["tva"] / 100));
        this.documenttotalTVA = this.documenttotalTVA + (totalHT * (newLine.tva / 100));


        newLine.totalTTC = (totalHT + (totalHT * (newLine.tva / 100)));
        event.newData.totalTTC = newLine.totalTTC;

        this.documenttotalTTC = this.documenttotalTTC - event["data"]["totalTTC"];
        this.documenttotalTTC = this.documenttotalTTC + newLine.totalTTC;


        this.documenttotalReduction = this.documenttotalReduction - (event["data"]["totalTTC"] * (event["data"]["reduction"] / 100));
        const reduction = newLine.totalTTC * (newLine.reduction / 100);
        this.documenttotalReduction = this.documenttotalReduction + reduction;


        this.documenttotalTTCReduction = this.documenttotalTTC - reduction;
        console.log(this.documenttotalTTCReduction);

        this.authorizationService.addLineDocument(newLine,  this.entetId)
          .subscribe(resultat => {
            event.confirm.resolve(event["newData"]);

            //  this.event.confirm.resolve(this.event.newData);
            },error => {
              console.log("err");
              // this.event.confirm.reject();
            }
          );


        return
      }
    })
  }



  async  onDeleteConfirm(event) {

    this.source.forEach(p => {
      if(p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva){

        this.documenttotalHT = this.documenttotalHT - event["data"]["totalHT"];

        this.documenttotalTVA = this.documenttotalTVA - ( event["data"]["totalHT"]* (event["data"]["tva"]/100 ));



        this.documenttotalTTC =  this.documenttotalTTC - event["data"]["totalTTC"];


        this.documenttotalReduction = this.documenttotalReduction - (event["data"]["totalTTC"] * (event["data"]["reduction"] / 100));

        this.documenttotalTTCReduction = this.documenttotalTTC  - this.documenttotalReduction ;



        this.authorizationService.deleteLine(event.data['id_line']).subscribe(
          data => {
            event.confirm.resolve(event.source.data);
          }, err => {
            this.ngOnInit();
            console.log('error');
            event.confirm.reject();
          });


        return
      }
    })
  }



 /* createLineDocument(id: number) {
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
           reduction: line.reduction,
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
  }*/
}
