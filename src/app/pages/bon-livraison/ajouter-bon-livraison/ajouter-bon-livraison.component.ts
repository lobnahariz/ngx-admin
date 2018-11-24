import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LineDocument} from "../../../model/lineDocument";
import {BonDeLivraisonDocument} from "../../../model/BonDeLivraisonDocument";

@Component({
  selector: 'ngx-ajouter-bon-livraison',
  templateUrl: './ajouter-bon-livraison.component.html',
  styleUrls: ['./ajouter-bon-livraison.component.scss']
})
export class AjouterBonLivraisonComponent implements OnInit {
  bondeLivraisonForm: FormGroup;
  //bonDeLivraison: BonDeLivraisonDocument;
  linesDocument: LineDocument[] = [];
  constructor(private bonLivraisonService: AuthenticationService, private df: FormBuilder) {
    this.bondeLivraisonForm = this.df.group({
      ref: ['', Validators.required],
      dateCreation: '',
      lieuCreation: '',
      accuse_reception: '',
      receptionDate: '',
      receptionPersonne: '',
    });
  }


  myOptions: Array<any> = [
  ];
  test: Array<any> = [
  ];
  data = [];

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
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: this.file,
              searchFields: 'code',
              titleField: 'code',
            },
          },
        },
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


  addDevis(): void {

    const formValue = this.bondeLivraisonForm.value;
    let newBonDeLivraison: BonDeLivraisonDocument = {
      id: null,
      ref: formValue['ref'],
      dateCreation: formValue['dateCreation'],
      lieuCreation: formValue['lieuCreation'],
      linesDocument: 0,
      personId: 0,
      accuse_reception: true,
      receptionDate: formValue['receptionDate'],
      receptionPersonne: formValue['receptionPersonne']
    };
    this.bonLivraisonService.addBonDeLivraisonEntete(newBonDeLivraison)
      .subscribe(res => {
          newBonDeLivraison.id = res.id;
          // this.idEntete = res.id;
          this.createLineDocument(newBonDeLivraison, newBonDeLivraison.id);
        },
        err => {alert("An error occurred while saving the devis"); }
      );
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

  onDeleteConfirm(event) {
  }

  onCreateConfirm(event) {
    let newLine: LineDocument = {
      id: null,
      code: event['newData']['code'],
      qte: event['newData']['qte'],
      puHT: event['newData']['puHT'],
      tva: event['newData']['tva'],
      totalHT: event['newData']['totalHT'],
      totalTTC: event['newData']['totalTTC'],
      enteteId: null
    };
    this.linesDocument.push(newLine);
    event.confirm.resolve();
  }

  // @ts-ignore
  onSaveConfirm(event) {
    /* let newLine: LineDocument = {
        id: null,
        code: event['data']['code'],
        qte: event['data']['qte'],
        puHT: event['data']['puHT'],
        tva: event['data']['tva'],
        totalHT: event['data']['totalHT'],
        totalTTC: event['data']['totalTTC'],
        enteteId: null
      };

    const r = this.linesDocument.findIndex(x => x === event['data']);
      console.log(r);
      event.confirm.resolve();*/
  }
}
