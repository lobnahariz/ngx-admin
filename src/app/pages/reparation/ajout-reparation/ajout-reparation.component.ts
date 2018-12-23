import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../service/authentication-service";
import {LineDocument} from "../../../model/lineDocument";
import {ReparationModule} from "../reparation.module";
import {ReperationDocument} from "../../../model/reparationDocument";
import {IOption} from "ng-select";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-ajout-reparation',
  templateUrl: './ajout-reparation.component.html',
  styleUrls: ['./ajout-reparation.component.scss']
})
export class AjoutReparationComponent implements OnInit {
  bondeLivraisonForm: FormGroup;
  //bonDeLivraison: BonDeLivraisonDocument;
  linesDocument: LineDocument[] = [];
  requieredClient = "";
  requieredPanne="";
  requieredLine = "";
  theCheckbox = false;
  quantiteStock = "";
  documenttotalReduction: any = 0;
  documenttotalHT: any = 0;
  documenttotalTVA: any = 0;
  documenttotalTTC: any = 0;
  documenttotalTTCReduction: any = 0;
  produitCodeExiste:any ="";
  estAccessoire="Sans accessoire";
  myOptionsType = [ { label: 'Pc', value: 'PC'}, { label: 'Smartphone', value : 'Smartphone'} ];
  constructor(private bonLivraisonService: AuthenticationService, private df: FormBuilder,private router: Router) {
    this.bondeLivraisonForm = this.df.group({
      ref: ['', Validators.required],
      dateCreation: ['', Validators.required],
      lieuCreation: ['', Validators.required],
      delaiRreparationSouhaite: '',
      accessoire: '',
      description: '',
    });
  }

  myOptions: Array<any> = [
  ];
  msg: string = '';
  msgPanne: string = '';
  test: Array<any> = [
  ];
  data = [];
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

  }
  toggleVisibility(event) {
if( event.target.checked){
  this.estAccessoire = "Avec accessoire";
  this.theCheckbox=true;
}else {
  this.estAccessoire = "Sans accessoire";
  this.theCheckbox=false;
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

  addDevis(): void {

    const formValue = this.bondeLivraisonForm.value;
    this.requieredLine = "";
    this.requieredPanne = "";
    this.requieredClient="";
    this.quantiteStock = "";
    let produitA: any="";
    let compteur= 0;
    let b: any = true;



    if (this.msg === '') {
      this.requieredClient = "Selectionnez svp";
    } else if (this.msgPanne === ''){
      this.requieredPanne = "Selectionnez svp";

    } else {
      let newReparationDocument: ReperationDocument = {
        id: null,
        ref: formValue['ref'],
        dateCreation: formValue['dateCreation'],
        lieuCreation: formValue['lieuCreation'],
        linesDocument: 0,
        personId: +this.msg,
        delaiLivraisonSouhaite: formValue['delaiLivraisonSouhaite'],
        achat: null,
        documenttotalHT: this.documenttotalHT,
        documenttotalTVA: this.documenttotalTVA,
        documenttotalReduction: this.documenttotalReduction,
        documenttotalTTC: this.documenttotalTTC,
        documenttotalTTCReduction: this.documenttotalTTCReduction,
        delaiRreparationSouhaite: formValue['delaiRreparationSouhaite'],
        estAccessoire: this.estAccessoire,
        typePanne: this.msgPanne,
        etat: "Nouvelle",
        accessoire: formValue['accessoire'],
        description: formValue['description'],

      };

      this.bonLivraisonService.getReparation().subscribe(
        data => {
          data.forEach(x => {
            if (formValue['ref'] === x.ref) {
             // this.requieredLine = "Reference doit etre unique";
             // b = false;
             // return
            }
          });
        }, err => {
        });

      this.bonLivraisonService.addReparation(newReparationDocument).subscribe(
        data => {
          newReparationDocument.id = data.id;
          this.createLineDocument(newReparationDocument, newReparationDocument.id);

        }, err => {
        });

    }
  }
  createLineDocument(entete: ReperationDocument, idEntete: number) {
    this.linesDocument.forEach(line => {
      line.enteteId = entete.id;
      console.log(line.enteteId);
      this.bonLivraisonService.addLineDocument(line, idEntete)
        .subscribe(resultat => {
            this.linesDocument = [];
          this.router.navigateByUrl("/pages");

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
    if(this.requieredLine === "") {
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
      event.newData.totalTTC = newLine.totalTTC;
      this.linesDocument.push(newLine);

      this.documenttotalTTC = this.documenttotalTTC + newLine.totalTTC;
      this.documenttotalReduction = this.documenttotalReduction + (newLine.totalTTC * (newLine.reduction / 100));
      this.documenttotalTTCReduction = this.documenttotalTTCReduction + (newLine.totalTTC - (newLine.totalTTC * (newLine.reduction / 100)));
      event.confirm.resolve(event.newData);
    }
  }

  onSelected(option: IOption) {
    this.msg = `${option.value}`;
  }
  onSelectedPanne(option: IOption) {
    this.requieredPanne="";
    this.msgPanne = `${option.value}`;
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

    if (this.requieredLine === "") {
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
  }
}
