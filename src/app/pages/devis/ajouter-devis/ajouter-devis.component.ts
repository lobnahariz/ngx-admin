import {Component, OnInit} from '@angular/core';
import {IOption} from 'ng-select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DevisDocument} from '../../../model/devisDocument';
import {LineDocument} from '../../../model/lineDocument';
import {AuthenticationService} from '../../../service/authentication-service';
import {Router} from "@angular/router";


@Component({
  selector: 'ngx-ajouter-devis',
  styleUrls: ['./ajouter-devis.component.scss'],
  templateUrl: './ajouter-devis.component.html',
})
export class AjouterDevisComponent implements OnInit {
  msg: string = '';
  selectName: string = 'Select Client';
  devisForm: FormGroup;
  devis: DevisDocument;
  linesDocument: LineDocument[] = [];
  lineDocument: LineDocument;
  idEntete: string;
  event: any;
  marked = false;
  theCheckbox = false;


  documenttotalReduction: any = 0;
  documenttotalHT: any = 0;
  documenttotalTVA: any = 0;
  documenttotalTTC: any = 0;
  documenttotalTTCReduction: any = 0;

  constructor(private devisService: AuthenticationService, private df: FormBuilder, private router: Router) {
    this.devisForm = this.df.group({
      ref: ['', Validators.required],
      dateCreation: '',
      lieuCreation: '',
      delaiLivraisonSouhaite: '',
    });
  }

  myOptions: Array<any> = [];
  test: Array<any> = [];
  requieredClient = "";
  requieredLine = "";
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
        title: 'TVA',
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
    this.msg = `${option.value}`;
  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
    if (this.marked === true) {
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


 createLineDocument(entete: DevisDocument, idEntete: number) {
    this.linesDocument.forEach(line => {
      line.enteteId = entete.id;
      console.log(line.enteteId);
      this.devisService.addLineDocument(line, idEntete)
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
    this.isNotNumber(event['newData']['qte'], "Qte");
    this.isVide(event['newData']['qte'], "Qte");
    this.isNotNumber(event['newData']['puHT'], "PuHT");
    this.isVide(event['newData']['puHT'], "PuHT");
    this.isNotNumber(event['newData']['tva'], "Tva");
    this.isVide(event['newData']['tva'], "Tva");
    this.isNotNumber(event['newData']['reduction'], "Reduction");
    this.isVide(event['newData']['reduction'], "Reduction");

    if (this.requieredLine === "") {

      let totalHT = (event['newData']['qte'] * event['newData']['puHT']);
      event.newData.totalHT = totalHT;


      let newLine: LineDocument = {
        id_line: null,
        code: event['newData']['code'],
        qte: event['newData']['qte'],
        puHT: event['newData']['puHT'],
        tva: event['newData']['tva'],
        totalHT: event['newData']['totalHT'],
        totalTTC: event['newData']['totalTTC'],
        enteteId: null,
        reduction: event['newData']['reduction']
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


  onSaveConfirm(event) {
    console.log(event);


    this.linesDocument.forEach(p => {
      if (p.qte === event.data.qte && p.code === event.data.code && p.puHT === event.data.puHT && p.tva === event.data.tva) {
        p.qte = event["newData"]["qte"];
        const index = this.linesDocument.indexOf(p);

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


        return
      }
    })
  }

    addDevis(): void {

    const formValue = this.devisForm.value;
    this.requieredLine = "";
    let b: any = true;
    this.requieredClient = "";


    if (this.msg === '') {
      this.requieredClient = "Selectionnez svp";
    } else {
      let newDevis: DevisDocument = {
        id: null,
        ref: formValue['ref'],
        dateCreation: formValue['dateCreation'],
        lieuCreation: formValue['lieuCreation'],
        linesDocument: 0,
        personId: +this.msg,
        delaiLivraisonSouhaite: formValue['delaiLivraisonSouhaite'],
        achat: this.marked,
        documenttotalHT: this.documenttotalHT,
        documenttotalTVA: this.documenttotalTVA,
        documenttotalReduction: this.documenttotalReduction,
        documenttotalTTC: this.documenttotalTTC,
        documenttotalTTCReduction: this.documenttotalTTCReduction,
      };


      this.devisService.getDevisDocument().subscribe(
        data => {
          data.forEach(x => {
            if (formValue['ref'] === x.ref) {
              this.requieredLine = "Reference doit etre unique";
              b = false;
              return
            }

          });
          if (b === true) {
            console.log(b + "*******3*****");

            this.devisService.addEnteteDocument(newDevis)
              .subscribe(res => {
                  newDevis.id = res.id;
                  // this.idEntete = res.id;
                  this.createLineDocument(newDevis, newDevis.id);
                },
                err => {
                  alert("An error occurred while saving the devis");
                }
              );
          }
        }, err => {
        });

    }
  }

}
