import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {EnteteDocument} from '../shared/enteteDocument';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class EnteteDocumentService {


  private EnteteDocument: EnteteDocument[] = [];
  constructor(public http: HttpClient) {
  }

  public getEnteteDocument(): Observable<any> {
    return this.http.get('http://localhost:8080/api/devis');
  }

 public addEnteteDocument(devis: EnteteDocument): Observable<any> {
    return this.http.post('http://localhost:8080/api/devis', devis);
  }

  public updateEnteteDocument(devis: EnteteDocument): Observable<any> {
    return this.http.put('http://localhost:8080/api/devis', devis);
  }

  public  deleteEnteteDocument(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/devis/' + id);
   }

}
