import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../../../service/authentication-service";
import {LineDocument} from "../../../model/lineDocument";
import {DevisDocument} from "../../../model/devisDocument";
import {AvoirDocument} from "../../../model/avoirDocument";
import {FactureDocument} from "../../../model/factureDocument";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

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
facture: FactureDocument;
  constructor(private activeModal: NgbActiveModal, private authorizationService: AuthenticationService, private router: Router) {
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
      });
  }


  onSaveConfirm(event) {
    const initialQte = event.data.qte;
    this.quantiteStock = "";

    this.source.forEach(p => {
      if (p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva) {


        this.authorizationService.getProduitByRef(event["newData"]["code"])
          .subscribe(resultat => {
            if(resultat === null){
              this.produitCodeExiste = "Produit n existe pas";
              return
            }else{
              this.qte = event['newData']['qte'];
              const totalHT = (event['newData']['qte'] * event['newData']['puHT']);
              event.newData.totalHT = totalHT;
              this.totalHT = totalHT;
              this.documenttotalHT = this.documenttotalHT - event["data"]["totalHT"];
              this.documenttotalHT = this.documenttotalHT + totalHT;

              this.documenttotalTVA = this.documenttotalTVA - (event["data"]["totalHT"] * (event["data"]["tva"] / 100));
              this.documenttotalTVA = this.documenttotalTVA + (totalHT * (event['newData']['tva'] / 100));

              this.totalTTC = (totalHT + (totalHT * (event['newData']['tva'] / 100)));
              event.newData.totalTTC =  this.totalTTC;

              this.documenttotalTTC = this.documenttotalTTC - event["data"]["totalTTC"];
              this.documenttotalTTC = this.documenttotalTTC + this.totalTTC;


              this.documenttotalReduction = this.documenttotalReduction - (event["data"]["totalTTC"] * (event["data"]["reduction"] / 100));
              const reduction = this.totalTTC * (event['newData']['reduction'] / 100);
              this.documenttotalReduction = this.documenttotalReduction + reduction;


              this.documenttotalTTCReduction = this.documenttotalTTC - reduction;

              const valeurStock= resultat.valeurStock;

            if (this.typeAchatOuVente === "Achat"){

              resultat.quantite = (resultat.quantite - initialQte) + +event['newData']['qte'];


              resultat.valeurStock = (resultat.valeurStock  + this.totalHT  - event['data']['totalHT']) ;

              resultat.avc = resultat.valeurStock / resultat.quantite;
              resultat.margeUnitaire = resultat.prixUnitaire - resultat.avc;


                this.authorizationService.addProduit(resultat).subscribe(
                  data => {
                    event.confirm.resolve(event["newData"]);
                    return
                  }, err => {
                    event.confirm.reject();
                  });

              } else {

                if (event['newData']['qte'] > (resultat.quantite + initialQte)) {
                  this.quantiteStock = "Il vous reste en stock " + (resultat.quantite + initialQte) + " pour " + resultat.ref;
                  return
                } else {

                  resultat.quantite = (resultat.quantite + initialQte) - +event['newData']['qte'];

                  resultat.valeurStock = (resultat.valeurStock  - this.totalHT)  + event['data']['totalHT'] ;

                  resultat.avc = resultat.valeurStock / resultat.quantite;
                  resultat.margeUnitaire = resultat.prixUnitaire - resultat.avc;

                  this.authorizationService.addProduit(resultat).subscribe(
                    data => {
                      event.confirm.resolve(event["newData"]);
                      return
                    }, err => {
                      event.confirm.reject();
                    });
                }
              }
            p.qte = event["newData"]["qte"];
            p.puHT = event["newData"]["puHT"];
            p.totalHT = event["newData"]["totalHT"];
              p.totalTTC = event["newData"]["totalTTC"];
                p.tva = event["newData"]["tva"];
            }
            }, error => {
            }
          );
return
      }
    })
  }

  closeModal() {
    let devisAModifier: any= "";

    this.authorizationService.getFactureById(this.entetId).subscribe(
      data => {

        let newAvoir: AvoirDocument = {
          id: null,
          ref: "Avoir"+data.ref,
          dateCreation: data.dateCreation,
          lieuCreation:data.lieuCreation,
          linesDocument: 0,
          personId:data.personId,
          achat: data.achat,
          factureReference: data.ref,
          documenttotalHT: this.documenttotalHT,
          documenttotalTVA: this.documenttotalTVA,
          documenttotalReduction: this.documenttotalReduction,
          documenttotalTTC: this.documenttotalTTC,
          documenttotalTTCReduction: this.documenttotalTTCReduction,
          createdBy: data.createdBy,
          dateCreationAudit: data.dateCreationAudit,
        };

        this.authorizationService.addAvoir(newAvoir)
          .subscribe(res => {
              this.source.forEach(w => {


                let newLine: LineDocument = {
                  id_line: null,
                  code: w.code,
                  qte: w.qte,
                  puHT: w.puHT,
                  tva: w.tva,
                  totalHT: w.totalHT,
                  totalTTC: w.totalTTC,
                  enteteId: res.id,
                  reduction: w.reduction,
                  createdBy: w.createdBy,
                  dateCreationAudit: w.dateCreationAudit,
                };

                this.authorizationService.addLineDocument(newLine,  res.id)
                  .subscribe(resultat => {




                    this.authorizationService.getFactureById(this.entetId).subscribe(
                      fact => {

                       this.facture = fact;
                       this.facture.modifierStock = "non";

                        this.authorizationService.updateFactureDocument(fact).subscribe(
                          final => {
                            this.activeModal.close();
                            this.router.navigateByUrl("/pages");

                          }, error => {

                          });
                      }, eror => {

                      });
                    },errror => {
                      console.log("err");
                      // this.event.confirm.reject();
                    }
                  );
              });
            },
            erry => {
            }
          );

      }, err => {

      });


  }
}
