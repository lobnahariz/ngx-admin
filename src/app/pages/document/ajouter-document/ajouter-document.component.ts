import {Component, ViewChild,ElementRef} from '@angular/core';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'ngx-ajouter-document',
  templateUrl: './ajouter-document.component.html',
  styleUrls: ['./ajouter-document.component.scss']
})
export class AjouterDocumentComponent {


  name = 'Angular 5';

  constructor(){
  }

}
