import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {EnteteDocument} from '../shared/enteteDocument';
import {LineDocument} from '../shared/lineDocument';


@Injectable()
export class LineDocumentService {


  private LineDocument: LineDocument[] = [];
  constructor(public http: Http) {
  }

  public getLineDocument() {
    return this.http.get('http://localhost:8080/api/devis').map(resp => resp.json());
  }

 public addLineDocument(devis: EnteteDocument) {
    return this.http.post('http://localhost:8080/api/devis', devis).map(resp => resp.json());
  }

  public updateLineDocument(devis: EnteteDocument) {
    return this.http.put('http://localhost:8080/api/devis', devis).map(resp => resp.json());
  }

  public  deleteLineDocument(id: number) {
    return this.http.delete('http://localhost:8080/api/devis/' + id).map(resp => resp.json());
   }

}
