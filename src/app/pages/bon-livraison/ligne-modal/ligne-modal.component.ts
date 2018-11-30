import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../../../service/authentication-service";
import {LineDocument} from "../../../model/lineDocument";
import {DevisDocument} from "../../../model/devisDocument";
import {BonLivraisonComponent} from "../bon-livraison.component";

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
  produitCodeExiste:any ="";
  quantiteStock:any = "";
  documenttotalTTCReduction: any = 0;
  constructor(private activeModal: NgbActiveModal, private authorizationService: AuthenticationService) {}


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
        updateable: false,
        addable: false,
        editable: false,
      },
    },
  };
  source:any;
  entetId:number;
  lines: LineDocument[] = [];
  linesDocument: LineDocument[] = [];
typeAchatOuVente:boolean;
  closeModal() {
    let devisAModifier: any = "";
    this.activeModal.close();

    this.authorizationService.getBonLivraisonDocumentById(this.entetId).subscribe(
      data => {

        let newBonLiv: BonLivraisonComponent = {
          id: data.id,
          ref: data.ref,
          dateCreation: data.dateCreation,
          lieuCreation: data.lieuCreation,
          linesDocument: 0,
          personId: data.personId,
          accuse_reception: data.accuse_reception,
          receptionDate: data.receptionDate,
          receptionPersonne:data.receptionPersonne,
          achat: data.achat,
          documenttotalHT: this.documenttotalHT,
          documenttotalTVA: this.documenttotalTVA,
          documenttotalReduction: this.documenttotalReduction,
          documenttotalTTC: this.documenttotalTTC,
          documenttotalTTCReduction: this.documenttotalTTCReduction,
        };

/*
        this.authorizationService.addBonDeLivraisonDocument(newBonLiv)
          .subscribe(res => {
            },
            err => {
              alert("An error occurred while saving the devis");
            }
          );

      }, err => {
        console.log("errr");
*/
      });

  }


  ngOnInit() {
    this.entetId=parseInt(this.modalHeader.substring(this.modalHeader.indexOf("-")+1,this.modalHeader.length));

    this.authorizationService.getBonLivraisonDocumentById(this.entetId).subscribe(
      data => {

        this.documenttotalHT = data.documenttotalHT;
        this.documenttotalReduction = data.documenttotalReduction;
        this.documenttotalTTC = data.documenttotalTTC;
        this.documenttotalTTCReduction = data.documenttotalTTCReduction;
        this.documenttotalTVA = data.documenttotalTVA;
        this.typeAchatOuVente = data.achat;
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

    this.ngOnInit();

  }


  onSaveConfirm(event) {
    const initialQte= event.data.qte;
    this.quantiteStock="";
    this.source.forEach(p => {
      if (p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva) {
        p.qte = event["newData"]["qte"];
        const index = this.source.indexOf(p);



        this.authorizationService.getProduitByRef(event["newData"]["code"])
          .subscribe(resultat => {
            if(resultat === null){
              this.produitCodeExiste = "Produit n existe pas";
              return
            }else{

           //   if (this.requieredLine === "") {

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



        if(this.typeAchatOuVente){

resultat.quantite = (resultat.quantite - initialQte) + +newLine.qte;
          this.authorizationService.addProduit(resultat).subscribe(
            data => {
              console.log(data);
              event.confirm.resolve();
            }, err => {
              console.log('error');
              event.confirm.reject();
            });

        }else {

         if( newLine.qte > (resultat.quantite + initialQte) ) {
           this.quantiteStock = "Il vous reste en stock "+ (resultat.quantite + initialQte) +" pour "+resultat.ref;
return
        }else {

           resultat.quantite = (resultat.quantite + initialQte) - +newLine.qte;
           this.authorizationService.addProduit(resultat).subscribe(
             data => {
               console.log(data);
               event.confirm.resolve();
             }, err => {
               console.log('error');
               event.confirm.reject();
             });
         }
        }
        this.authorizationService.addLineDocument(newLine,  this.entetId)
          .subscribe(res => {
              event.confirm.resolve(event["newData"]);

              //  this.event.confirm.resolve(this.event.newData);
            },error => {
              console.log("err");
              // this.event.confirm.reject();
            }
          );



           //   }


            }

            }, error => {
              console.log("err");
              this.produitCodeExiste = "Produit n existe pas";
            }
          );
        return
      }
    })
  }



  /*
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
              achat: res.achat,
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


    }*/

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
  }
}
