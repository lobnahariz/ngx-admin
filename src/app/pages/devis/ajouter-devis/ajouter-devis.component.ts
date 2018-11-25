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

  devisForm: FormGroup;
  devis: DevisDocument;
  linesDocument: LineDocument[] = [];
  lineDocument: LineDocument;
  idEntete: string;
  event: any;
  constructor(private devisService: AuthenticationService, private df: FormBuilder, private router: Router) {
    this.devisForm = this.df.group({
      ref: ['', Validators.required],
      dateCreation: '',
      lieuCreation: '',
      delaiLivraisonSouhaite: '',
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

   this.devisService.getProduits().subscribe(
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

    const formValue = this.devisForm.value;
    let newDevis: DevisDocument = {
        id: null,
        ref: formValue['ref'],
        dateCreation: formValue['dateCreation'],
        lieuCreation: formValue['lieuCreation'],
        linesDocument: 0,
        personId: 0,
        delaiLivraisonSouhaite: formValue['delaiLivraisonSouhaite'],
    };
    this.devisService.addEnteteDocument(newDevis)
      .subscribe(res => {
        newDevis.id = res.id;
         // this.idEntete = res.id;
          this.createLineDocument(newDevis, newDevis.id);
        },
        err => {alert("An error occurred while saving the devis"); }
    );
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

  onDeleteConfirm(event) {
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
