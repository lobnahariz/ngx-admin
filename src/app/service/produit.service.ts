import {Injectable } from '@angular/core';
import {Produit} from '../shared/produit';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class ProduitService {



  private PRODUITS: Produit[] = [];

  constructor(public http: HttpClient) {

  }

  public getProduits(): Observable<any> {

    return this.http.get('http://localhost:8080/api/produit');
  }
 public addProduit(produit: Produit): Observable<any> {

    return this.http.post('http://localhost:8080/api/produit', produit);
  }
  public updateProduit(produit: Produit): Observable<any> {

    return this.http.put('http://localhost:8080/api/produit', produit);
  }

  public  deleteProduit(id: number): Observable<any> {

    return this.http.delete('http://localhost:8080/api/produit/' + id);
   }
}
