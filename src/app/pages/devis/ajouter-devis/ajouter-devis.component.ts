import {Component, OnInit} from '@angular/core';
import {IOption} from 'ng-select';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {EnteteDocumentService} from '../../../service/enteteDocument.service';
import {EnteteDocument} from '../../../shared/enteteDocument';
import {LineDocument} from '../../../shared/lineDocument';


@Component({
  selector: 'ngx-ajouter-devis',
  styleUrls: ['./ajouter-devis.component.scss'],
  templateUrl: './ajouter-devis.component.html',
})
export class AjouterDevisComponent implements OnInit {

  devisForm: FormGroup;
  devis: EnteteDocument;
  linesDocument: LineDocument[] = [];
  lineDocument: LineDocument;
  constructor(private devisService: EnteteDocumentService, private df: FormBuilder) {
    this.devisForm = this.df.group({
      type: '',
      ref: ['', Validators.required],
      dateCreation: '',
      lieuCreation: '',
    });
  }

  myOptions: Array<IOption> = [
    {label: 'Belgium', value: 'BE'},
    {label: 'Luxembourg', value: 'LU'},
    {label: 'Netherlands', value: 'NL'},
  ];

  data = [];

  file = [
    {
      code: 'Nicholas DuBuque',
    },
    {
      code: 'Lobna',
    },
    {
      code: 'Exemple',
    },
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
      puHt: {
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
  }

  addDevis(): void {
    const formValue = this.devisForm.value;
    this.devis = new EnteteDocument(formValue['id'], 'Devis', formValue['ref'], formValue['dateCreation'], formValue['lieuCreation'],this.linesDocument);
    this.devisService.addEnteteDocument(this.devis)
      .subscribe(res => {
        console.log('c bon');
      },
    );
    console.log(this.devis);
  }



  onDeleteConfirm(event) {
    }

  onCreateConfirm(event) {
    this.lineDocument = new LineDocument(event['newData']['id'],event['newData']['code'], event['newData']['qte'], event['newData']['puHt'], event['newData']['tva'], event['newData']['totalHT'], event['newData']['totalTTC']);
    this.linesDocument.push(this.lineDocument);
  }


  // @ts-ignore
  onSaveConfirm(event) {
  }
}
