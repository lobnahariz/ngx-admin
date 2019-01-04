import {Component, OnInit} from '@angular/core';
import {IOption} from 'ng-select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LineDocument} from '../../../model/lineDocument';
import {AuthenticationService} from '../../../service/authentication-service';
import {Router} from "@angular/router";
import {FactureDocument} from "../../../model/factureDocument";

@Component({
  selector: 'ngx-ajouter-facture',
  templateUrl: './ajouter-facture.component.html',
})
export class AjouterFactureComponent implements OnInit {
  msg: string = '';
  modeSelected: any;
  selectName: string = 'Select Client';
  devisForm: FormGroup;
  devis: FactureDocument;
  linesDocument: LineDocument[] = [];
  lineDocument: LineDocument;
  idEntete: string;
  event: any;
  marked = "Vente";
  theCheckbox = false;
  theCheckboxStock = false;
etat: any;
  quantiteStock = "";
  produitCodeExiste:any ="";
  documenttotalReduction: any = 0;
documenttotalHT: any = 0;
  documenttotalTVA: any = 0;
  documenttotalTTC: any = 0;
  documenttotalTTCReduction: any = 0;

  modifierStock="Non";
  constructor(private devisService: AuthenticationService, private df: FormBuilder, private router: Router) {
    this.devisForm = this.df.group({
      ref: ['', Validators.required],
      dateCreation: '',
      lieuCreation: '',
      montantPaye: ['', Validators.required],
      modeReglement: '',
      dateLimiteReglement: '',
      details: ['', Validators.required],
    });
  }
messageRefExisteDeja: any = "";
  myOptions: Array<any> = [];
  test: Array<any> = [];
  requieredClient = "";
  requieredLine = "";
  verifMontantPaye = "";
  data = [];
  xx = [];
  yy: Array<any> = [];
  file: Array<any> = [];
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
        title: 'TVA %',
        type: 'number',
      },
      totalHT: {
        title: 'Total HT',
        type: 'number',
        addable: false,
        updateable: false,

      },
      totalTTC: {
        title: 'Total TTC',
        type: 'number',
        addable: false,
        updateable: false,

      },
    },
  };


  onSelected(option: IOption) {
    this.requieredClient = "";
    this.msg = `${option.value}`;
  }
  etatSelectChangeHandler(event){
    this.etat = event.target.value;
  }
  modeSelectChangeHandler(event){
this.modeSelected =  event.target.value;
  }

  toggleStock(e) {
    this.modifierStock ="Oui";
  }
  toggleVisibility(e) {
    if( e.target.checked ) {
      this.marked = "Achat";
    }else{
  this.marked = "Vente";

}
    if (this.marked === "Achat") {
      this.devisService.getFournisseurs().subscribe(
        data => {
          this.selectName = "Select Fournisseur";
          this.test = [];
          this.myOptions = [];
          data.forEach(x => {
            let fournisseur = {
              label: x.libelle,
              value: x.id,
            };
            this.test.push(fournisseur);
          })
          this.myOptions = this.test;
        }, err => {
          this.devisService.logout();
          this.router.navigateByUrl("/auth/login");
        });
    } else {
      this.devisService.getClients().subscribe(
        data => {
          this.selectName = "Select Client";

          this.test = [];
          this.myOptions = [];
          data.forEach(x => {
            let client = {
              label: x.libelle,
              value: x.id,
            };
            this.test.push(client);
          })
          this.myOptions = this.test;
        }, err => {
          this.devisService.logout();
          this.router.navigateByUrl("/auth/login");
        });


    }
  }

  ngOnInit(): void {
    this.devisService.getClients().subscribe(
      data => {
        data.forEach(x => {
          let client = {
            label: x.libelle,
            value: x.id,
          };
          this.test.push(client);
        })
        this.myOptions = this.test;
      }, err => {
        this.devisService.logout();
        this.router.navigateByUrl("/auth/login");
      });

  }

  addDevis(): void {

    const formValue = this.devisForm.value;
    this.requieredLine = "";
    let b: any = true;
    this.requieredClient="";
    this.quantiteStock = "";
    this.verifMontantPaye = "";
    let compteur= 0;


    if (this.msg === '') {
      this.requieredClient = "Selectionnez svp";
    }
    else if (   (this.documenttotalTTCReduction + 0.1) < +formValue['montantPaye'] ) {
      console.log(this.documenttotalTTCReduction );

      this.verifMontantPaye = "Montant payé incorrect";
    } else {

      let newFacture: FactureDocument = {
        id: null,
        ref: formValue['ref'],
        dateCreation: formValue['dateCreation'],
        lieuCreation: formValue['lieuCreation'],
        linesDocument: 0,
        personId: +this.msg,
        etat: this.etat,
        montantPaye: formValue['montantPaye'],
        modeReglement: this.modeSelected,
        dateLimiteReglement: formValue['dateLimiteReglement'],
        details: formValue['details'],
        achat: this.marked,
        documenttotalHT: this.documenttotalHT,
        documenttotalTVA: this.documenttotalTVA,
        documenttotalReduction: this.documenttotalReduction,
        documenttotalTTC: this.documenttotalTTC,
        documenttotalTTCReduction: this.documenttotalTTCReduction,
        modifierStock: this.modifierStock
      };

      this.devisService.getFacture().subscribe(
        data => {
          data.forEach(x => {
            if (formValue['ref'] === x.ref) {
              this.requieredLine = "Reference doit etre unique";
              b = false;
              return
            }

          });


          if (b === true) {

            this.linesDocument.forEach(line => {
              const ref = line.code;

              this.devisService.getProduitByRef(ref)
                .subscribe(resultat => {
                    if ( newFacture.achat) {
                      resultat.quantite = +resultat.quantite + +line.qte;

                    }else {
                      if ( resultat.quantite - line.qte < 0 )
                      {
                        this.quantiteStock = "Il vous reste en stock "+ resultat.quantite+" pour "+resultat.ref;

                      }else{
                        resultat.quantite=resultat.quantite - line.qte;

                      }

                    }
                    compteur++;

                    if(compteur === this.linesDocument.length){


                      if( this.quantiteStock === "")
                      {

                        this.devisService.addFactureDocument(newFacture)
                          .subscribe(res => {

                              newFacture.id = res.id;
                              this.createLineDocument(newFacture, newFacture.id);
                              if (this.modifierStock === "Oui") {
                              this.linesDocument.forEach(prod => {
                                this.devisService.getProduitByRef(prod.code)
                                  .subscribe(ress => {
                                    if (newFacture.achat === 'Achat') {
                                      ress.quantite = +prod.qte + +ress.quantite;
ress.valeurStock = ress.valeurStock + prod.totalHT;

ress.avc = ress.valeurStock / ress.quantite;
ress.margeUnitaire = ress.prixUnitaire - ress.avc;
                                      this.devisService.updateProduit(ress).subscribe(
                                        d => {
                                        }, err => {
                                          console.log('error');
                                        });
                                    } else {
                                      ress.quantite = +ress.quantite - +prod.qte;
                                      ress.valeurStock = ress.valeurStock - prod.totalHT;

                                      ress.avc = ress.valeurStock / ress.quantite;
                                      ress.margeUnitaire = ress.prixUnitaire - ress.avc;

                                      this.devisService.updateProduit(ress).subscribe(
                                        d => {
                                        }, err => {
                                          console.log('error');
                                        });
                                    }
                                    //  this.event.confirm.resolve(this.event.newData);
                                  }, error => {
                                    console.log("err");
                                    // this.event.confirm.reject();
                                  });
                              });

                            }


                            },
                            err => {alert("An error occurred while saving the devis"); }
                          );
                      }
                    }

                  },error => {
                    console.log("err");
                    // this.event.confirm.reject();
                  }
                );
            });



          }
        }, err => {
        });

    }
  }
  createLineDocument(entete: FactureDocument, idEntete: number) {
    this.linesDocument.forEach(line => {
      line.enteteId = entete.id;
      console.log(line.enteteId);
      this.devisService.addLineDocument(line, idEntete)
        .subscribe(resultat => {

            this.linesDocument = [];
          this.router.navigateByUrl("/pages");

          //  this.event.confirm.resolve(this.event.newData);
          }, error => {
            console.log("err");
            // this.event.confirm.reject();
          }
        );
    });
  }

  async  onDeleteConfirm(event) {

    this.linesDocument.forEach(p => {
    if(p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva){
      let index= this.linesDocument.indexOf(p);
      this.linesDocument.splice(index,1);

      this.documenttotalHT = this.documenttotalHT - event["data"]["totalHT"];

      this.documenttotalTVA = this.documenttotalTVA - ( event["data"]["totalHT"]* (event["data"]["tva"]/100 ));



      this.documenttotalTTC =  this.documenttotalTTC - event["data"]["totalTTC"];


      this.documenttotalReduction = this.documenttotalReduction - (event["data"]["totalTTC"] * (event["data"]["reduction"] / 100));

      this.documenttotalTTCReduction = this.documenttotalTTC  - this.documenttotalReduction ;


      event.confirm.resolve(event.source.data);
      return
    }
    })
  }

  articleExiste(ref: string,event:any) {
    this.devisService.getProduitByRef(ref)
      .subscribe(resultat => {
        if(resultat === null){
          this.requieredLine = "Produit n'existe pas";
        }else{

          if (this.requieredLine === "") {
            console.log("heeeeeeeere");
            let totalHT = (event['newData']['qte'] * event['newData']['puHT']);
            event.newData.totalHT = totalHT;

            let newLine: LineDocument = {
              id_line: null,
              code: event['newData']['code'],
              qte: event['newData']['qte'],
              puHT: event['newData']['puHT'],
              tva: event['newData']['tva'],
              totalHT: 0,
              totalTTC: 0,
              enteteId: null,
              reduction: event['newData']['reduction'],
            };
            newLine.totalHT = totalHT;
            this.documenttotalHT = this.documenttotalHT + totalHT;
            this.documenttotalTVA = this.documenttotalTVA + (totalHT * (newLine.tva / 100));
            newLine.totalTTC = (totalHT + (totalHT * (newLine.tva / 100)));
            event.newData.totalTTC =  newLine.totalTTC;
            this.linesDocument.push(newLine);

            this.documenttotalTTC =  this.documenttotalTTC + newLine.totalTTC;
            this.documenttotalReduction = this.documenttotalReduction + (newLine.totalTTC * (newLine.reduction / 100));
            this.documenttotalTTCReduction = this.documenttotalTTCReduction +  (newLine.totalTTC - (newLine.totalTTC * (newLine.reduction / 100)));
            event.confirm.resolve(event.newData);

          }

        }
      },error => {
        // this.event.confirm.reject();
      });
  }

  async onCreateConfirm(event) {
  //  this.onCreate(event);
    this.requieredLine = "";

    this.isVide(event['newData']['code'], "code");
    this.isNotNumber(event['newData']['qte'], "Qte");
    this.isVide(event['newData']['qte'], "Qte");
    this.isNotNumber(event['newData']['puHT'], "PuHT");
    this.isVide(event['newData']['puHT'], "PuHT");
    this.isNotNumber(event['newData']['tva'], "Tva");
    this.isVide(event['newData']['tva'], "Tva");
    this.isNotNumber(event['newData']['reduction'], "Reduction");
    this.isVide(event['newData']['reduction'], "Reduction");
    this.articleExiste(event['newData']['code'], event );

   /* if (this.requieredLine === "") {
      let totalHT = (event['newData']['qte'] * event['newData']['puHT']);
      event.newData.totalHT = totalHT;

      let newLine: LineDocument = {
        id_line: null,
        code: event['newData']['code'],
        qte: event['newData']['qte'],
        puHT: event['newData']['puHT'],
        tva: event['newData']['tva'],
        totalHT: 0,
        totalTTC: 0,
        enteteId: null,
        reduction: event['newData']['reduction'],
      };
      newLine.totalHT = totalHT;

      this.documenttotalHT = this.documenttotalHT + totalHT;
      this.documenttotalTVA = this.documenttotalTVA + (totalHT * (newLine.tva / 100));
      newLine.totalTTC = (totalHT + (totalHT * (newLine.tva / 100)));
      event.newData.totalTTC =  newLine.totalTTC;
      this.linesDocument.push(newLine);

      this.documenttotalTTC =  this.documenttotalTTC + newLine.totalTTC;
      this.documenttotalReduction = this.documenttotalReduction + (newLine.totalTTC * (newLine.reduction / 100));
this.documenttotalTTCReduction = this.documenttotalTTCReduction +  (newLine.totalTTC - (newLine.totalTTC * (newLine.reduction / 100)));
      event.confirm.resolve(event.newData);

  }*/

  }
  isVide(value: any, valeur: any) {
    if (value === "") {
      this.requieredLine = valeur + " est vide";
    }
  }

  isNotNumber(value: any, valeur: any) {
    if (isNaN(value)) {
      this.requieredLine = valeur + " doit etre un nombre";
    }
  }

  // @ts-ignore
  onSaveConfirm(event) {
    this.produitCodeExiste = "";
    this.requieredLine = "";


    this.isVide(event['newData']['code'], "code");
    this.isNotNumber(event['newData']['qte'], "Qte");
    this.isVide(event['newData']['qte'], "Qte");
    this.isNotNumber(event['newData']['puHT'], "PuHT");
    this.isVide(event['newData']['puHT'], "PuHT");
    this.isNotNumber(event['newData']['tva'], "Tva");
    this.isVide(event['newData']['tva'], "Tva");
    this.isNotNumber(event['newData']['reduction'], "Reduction");
    this.isVide(event['newData']['reduction'], "Reduction");
  //  this.articleExiste(event['newData']['code'], event );

    if (this.requieredLine === "") {

      this.linesDocument.forEach(p => {
        if (p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva) {
          p.qte = event["newData"]["qte"];
          const index = this.linesDocument.indexOf(p);




          this.devisService.getProduitByRef(event['newData']['code']).subscribe(
            x => {

              if(x != null) {
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
                this.linesDocument[index] = newLine;

                event.confirm.resolve(event["newData"]);
              }else{
this.produitCodeExiste = "Produit n existe pas";
                this.requieredLine = "Produit est inexistant";
              }
            }, errr => {
              event.confirm.reject();
            });























        }
              });
  }

  }


    /* let newLine: LineDocument = {
        id: null,
        code: event['data']['code'],
        qte: event['data']['qte'],
        puHT: event['data']['puHT'],
        tva: event['data']['tva'],
        totalHT: event['data']['totalHT'],
        totalTTC: event['data']['totalTTC'],
        enteteId: null


    const r = this.linesDocument.findIndex(x => x === event['data']);
      console.log(r);
      event.confirm.resolve();*/

}
