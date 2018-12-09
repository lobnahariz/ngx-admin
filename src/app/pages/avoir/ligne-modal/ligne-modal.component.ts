import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../../../service/authentication-service";
import {LineDocument} from "../../../model/lineDocument";

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
  produitCodeExiste: any = "";
  quantiteStock: any = "";
  documenttotalTTCReduction: any = 0;
  totalHT: any = 0;
  totalTTC: any = 0;
  qte: any = 0;

  constructor(private activeModal: NgbActiveModal, private authorizationService: AuthenticationService) {
  }


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
      code: {
        title: 'Code',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      qte: {
        title: 'Qte',
        type: 'number',
      },
      reduction: {
        title: 'Reduction%',
        type: 'number',
        updateable: false,
        addable: false,
        editable: false,
      },
      puHT: {
        title: 'PU HT',
        type: 'number',
        updateable: false,
        addable: false,
        editable: false,
      },
      tva: {
        title: 'TVA',
        type: 'number',
        updateable: false,
        addable: false,
        editable: false,
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
  source: any;
  entetId: number;
  lines: LineDocument[] = [];
  linesDocument: LineDocument[] = [];
  typeAchatOuVente: string;

  ngOnInit() {
    this.entetId = parseInt(this.modalHeader.substring(this.modalHeader.indexOf("-") + 1, this.modalHeader.length));

    this.authorizationService.getFactureById(this.entetId).subscribe(
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


  onSaveConfirm(event) {
    const initialQte = event.data.qte;
    this.quantiteStock = "";

    this.source.forEach(p => {
      if (p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva) {
        //p.qte = event["newData"]["qte"];
       // this.index = this.source.indexOf(p);


        this.authorizationService.getProduitByRef(event["newData"]["code"])
          .subscribe(resultat => {

              this.qte = event['newData']['qte'];
              const totalHT = (event['newData']['qte'] * event['newData']['puHT']);
              event.newData.totalHT = totalHT;
              this.totalHT = totalHT;

              this.documenttotalHT = this.documenttotalHT - event["data"]["totalHT"];
              this.documenttotalHT = this.documenttotalHT + totalHT;

              this.documenttotalTVA = this.documenttotalTVA - (event["data"]["totalHT"] * (event["data"]["tva"] / 100));
              this.documenttotalTVA = this.documenttotalTVA + (totalHT * (event['newData']['tva'] / 100));

              this.totalTTC = (totalHT + (totalHT * (event['newData']['tva'] / 100)));
              event.newData.totalTTC = 99;

              this.documenttotalTTC = this.documenttotalTTC - event["data"]["totalTTC"];
              this.documenttotalTTC = this.documenttotalTTC + this.totalTTC;


              this.documenttotalReduction = this.documenttotalReduction - (event["data"]["totalTTC"] * (event["data"]["reduction"] / 100));
              const reduction = this.totalTTC * (event['newData']['reduction'] / 100);
              this.documenttotalReduction = this.documenttotalReduction + reduction;


              this.documenttotalTTCReduction = this.documenttotalTTC - reduction;

            if(this.typeAchatOuVente === "Achat"){

                resultat.quantite = (resultat.quantite - initialQte) + +event['newData']['qte'];
                this.authorizationService.addProduit(resultat).subscribe(
                  data => {
                    event.confirm.resolve(event.source.newData);
                    console.log(this.qte+"   "+this.totalHT+"   "+this.totalTTC);

                    return
                  }, err => {
                    console.log('error');
                    event.confirm.reject();
                  });

              } else {

                if (event['newData']['qte'] > (resultat.quantite + initialQte)) {
                  this.quantiteStock = "Il vous reste en stock " + (resultat.quantite + initialQte) + " pour " + resultat.ref;
                  return
                } else {

                  resultat.quantite = (resultat.quantite + initialQte) - +event['newData']['qte'];
                  this.authorizationService.addProduit(resultat).subscribe(
                    data => {
                      console.log(data);
                      event.confirm.resolve(event["newData"]);
                      console.log(this.qte+"   "+this.totalHT+"   "+this.totalTTC);
                      console.log("%%%%%%%%%%%");

                      return
                    }, err => {
                      console.log('error');
                      event.confirm.reject();
                    });
                }
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


  closeModal() {
    this.activeModal.close();
  }
}
