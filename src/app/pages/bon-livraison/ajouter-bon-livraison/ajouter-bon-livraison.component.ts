import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LineDocument} from "../../../model/lineDocument";
import {BonDeLivraisonDocument} from "../../../model/BonDeLivraisonDocument";
import {Router} from "@angular/router";
import {IOption} from "ng-select";
import {Produit} from "../../../model/produit";

@Component({
  selector: 'ngx-ajouter-bon-livraison',
  templateUrl: './ajouter-bon-livraison.component.html',
  styleUrls: ['./ajouter-bon-livraison.component.scss']
})
export class AjouterBonLivraisonComponent implements OnInit {
  bondeLivraisonForm: FormGroup;
  //bonDeLivraison: BonDeLivraisonDocument;
  linesDocument: LineDocument[] = [];
  messageRefExisteDeja: any = "";
  requieredClient = "";
  requieredLine = "";
  quantiteStock = "";
  documenttotalReduction: any = 0;
  documenttotalHT: any = 0;
  documenttotalTVA: any = 0;
  documenttotalTTC: any = 0;
  documenttotalTTCReduction: any = 0;
  produitCodeExiste:any ="";
  constructor(private bonLivraisonService: AuthenticationService, private df: FormBuilder,private router: Router) {
    this.bondeLivraisonForm = this.df.group({
      ref: ['', Validators.required],
      dateCreation: '',
      lieuCreation: '',
      accuse_reception: '',
      receptionDate: '',
      receptionPersonne: '',
    });
  }

accuse:any= false;
  myOptions: Array<any> = [
  ];
  theCheckbox = false;
  msg: string = '';
  test: Array<any> = [
  ];
  data = [];
  marked = "Vente";
  selectName: string= 'Select Client';
  file:  Array<any> = [
  ];
  xfile:  Array<any> = [
  ];
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
        title: 'TVA%',
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

  ngOnInit(): void {
    this.bonLivraisonService.getClients().subscribe(
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
      });

    this.bonLivraisonService.getProduits().subscribe(
      prod => {
        prod.forEach(y => {

          var variable ={
            code: y.ref,
          }
          this.xfile.push(variable);
        })
        this.file = this.xfile;
      }, error => {
      });

  }
  toggleVisibility(event) {
    this.accuse = event.target.checked;

  }
articleExiste(ref: string,event:any) {
  this.bonLivraisonService.getProduitByRef(ref)
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
      this.requieredLine = "Produit n'existe pas";
      // this.event.confirm.reject();
    });
}

  isVide(value: any,valeur: any) {
    if(value === "") {
      this.requieredLine = valeur+" est vide";
    }
  }
  isNotNumber(value: any,valeur: any){
    if(isNaN(value)){
      this.requieredLine = valeur+" doit etre un nombre";
    }
  }

  toggleVisibilityAchat(e){
    if( e.target.checked ) {
      this.marked = "Achat";
  }else{
  this.marked = "Vente";

}
    if (this.marked === "Achat") {
      this.bonLivraisonService.getFournisseurs().subscribe(
        data => {
          this.selectName= "Select Fournisseur";
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
          this.bonLivraisonService.logout();
          this.router.navigateByUrl("/auth/login");
        });
    }else{
      this.bonLivraisonService.getClients().subscribe(
        data => {
          this.selectName= "Select Client";

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
          this.bonLivraisonService.logout();
          this.router.navigateByUrl("/auth/login");
        });


    }
  }
  addDevis(): void {

    const formValue = this.bondeLivraisonForm.value;
    this.requieredLine = "";
    this.requieredClient="";
    this.quantiteStock = "";
   let produitA: any="";
   let compteur= 0;
    let b: any = true;



    if (this.msg === '') {
      this.requieredClient = "Selectionnez svp";
    } else {
      let newBonDeLivraison: BonDeLivraisonDocument = {
        id: null,
        ref: formValue['ref'],
        dateCreation: formValue['dateCreation'],
        lieuCreation: formValue['lieuCreation'],
        linesDocument: 0,
        personId: +this.msg,
        accuse_reception: this.accuse,
        receptionDate: formValue['receptionDate'],
        receptionPersonne: formValue['receptionPersonne'],
        achat: this.marked,
        documenttotalHT: this.documenttotalHT,
        documenttotalTVA: this.documenttotalTVA,
        documenttotalReduction: this.documenttotalReduction,
        documenttotalTTC: this.documenttotalTTC,
        documenttotalTTCReduction: this.documenttotalTTCReduction,
      };

      this.bonLivraisonService.getBonDeLivraison().subscribe(
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

              this.bonLivraisonService.getProduitByRef(ref)
                .subscribe(resultat => {
                    if ( newBonDeLivraison.achat) {
                      resultat.quantite = +resultat.quantite + +line.qte;

                    }else {
                      if ( resultat.quantite - line.qte < 0 )
                      {
                        this.quantiteStock = "Il vous reste en stock "+ resultat.quantite+" pour "+resultat.ref;

                      }else{
                        resultat.quantite=resultat.quantite - line.qte;
                      //  line.qte =  resultat.quantite;

                      }

                    }
                  compteur++;

                  if(compteur === this.linesDocument.length){


                    if( this.quantiteStock === "") {
                      console.log(this.quantiteStock+"******************");
                      this.bonLivraisonService.addBonDeLivraisonDocument(newBonDeLivraison)
                        .subscribe(res => {
                            newBonDeLivraison.id = res.id;

                              this.createLineDocument(newBonDeLivraison, newBonDeLivraison.id);
                              this.linesDocument.forEach(prod => {
                              this.bonLivraisonService.getProduitByRef(prod.code)
                                .subscribe(ress => {
                                  if(newBonDeLivraison.achat) {
                                    ress.quantite = +prod.qte + +ress.quantite;
                                  }else{
                                    ress.quantite = +ress.quantite - +prod.qte;
                                  }
                                  this.bonLivraisonService.addProduit(ress).subscribe(
                                    d => {
                                    }, err => {
                                      console.log('error');
                                    });
                                  //  this.event.confirm.resolve(this.event.newData);
                                },error => {
                                  console.log("err");
                                  // this.event.confirm.reject();
                                });
                            });

                            this.router.navigateByUrl("/pages");

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
  createLineDocument(entete: BonDeLivraisonDocument, idEntete: number) {
    this.linesDocument.forEach(line => {
      line.enteteId = entete.id;
      console.log(line.enteteId);
      this.bonLivraisonService.addLineDocument(line, idEntete)
        .subscribe(resultat => {
            this.linesDocument = [];
            //  this.event.confirm.resolve(this.event.newData);
          },error => {
            console.log("err");
            // this.event.confirm.reject();
          }
        );
    });
  }

  async onCreateConfirm(event) {


    this.requieredLine = "";
    this.isVide(event['newData']['code'], "code");
    this.isNotNumber(event['newData']['qte'], "Qte");    this.isVide(event['newData']['qte'], "Qte");

    this.isNotNumber(event['newData']['puHT'], "PuHT");
    this.isVide(event['newData']['puHT'], "PuHT");
    this.isNotNumber(event['newData']['tva'], "Tva");
    this.isVide(event['newData']['tva'], "Tva");
    this.isNotNumber(event['newData']['reduction'], "Reduction");
    this.isVide(event['newData']['reduction'], "Reduction");
    this.articleExiste(event['newData']['code'],event );

  }

  onSelected(option: IOption) {
    this.requieredClient = "";
    this.msg = `${option.value}`;
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
    this.articleExiste(event['newData']['code'],event );

    if (this.requieredLine === "") {
      this.linesDocument.forEach(p => {
        if (p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva) {
          p.qte = event["newData"]["qte"];
          const index = this.linesDocument.indexOf(p);

          this.bonLivraisonService.getProduitByRef(event["newData"]["code"])
            .subscribe(resultat => {
                if (resultat === null) {
                  this.produitCodeExiste = "Produit est inexistant";
                  return
                } else {

                  //  if (this.requieredLine === "") {

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


                  //  }


                }

              }, error => {
                console.log("err");
              }
            );


          return
        }
      })
    }
  }

}
