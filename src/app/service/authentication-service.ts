import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';
import {Produit} from '../model/produit';
import {Observable} from 'rxjs';
import {LineDocument} from '../model/lineDocument';
import {DevisDocument} from '../model/devisDocument';
import {Client} from "../model/client";
import {BonDeLivraisonDocument} from "../model/BonDeLivraisonDocument";
import {Fournisseur} from "../model/fournisseur";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host: string = "http://localhost:8080";
  private jwtToken = null;
  private roles: Array<any>=[];

  constructor(private http: HttpClient) {

}
login(user) {
  if (user && user.token) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  return this.http.post(this.host+"/login" , user ,{ observe : 'response' });
}
  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
    console.log(this.jwtToken+"%%%%%%%%%%%%%%%%%ù");

  }




loadToken() {
  this.jwtToken = localStorage.getItem('token');
  console.log(this.jwtToken+"************************");
}
saveToken(jwt: string) {
  this.jwtToken = jwt;
  localStorage.setItem('token', jwt);
  let jwtHelper = new JwtHelper();
  this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
}



////////////////////////////////Produit

  public getProduits(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/produit', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addProduit(produit: Produit) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post(this.host+'/api/produit', produit,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateProduit(produit: Produit) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host+'/api/produit', produit,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteProduit(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/produit/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }


  ////////////////////////////////Devis
  public addEnteteDocument(devis: DevisDocument): Observable<DevisDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post<DevisDocument>(this.host + '/api/devis', devis,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }


  public getDevisDocumentById(id: number): Observable<DevisDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<DevisDocument>(this.host + '/api/devis/getById/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getDevisDocument(): Observable<DevisDocument[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<DevisDocument[]>(this.host + '/api/devis',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public deleteDevisDocument(id: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host + '/api/devis/'+ id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }




///////////////////////////////////Client



  public getClients(): Observable<Client[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<Client[]>(this.host+'/api/client', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addClient(client: Client) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post<Client>(this.host+'/api/client', client,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateClient(client: Client) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host+'/api/client', client,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteClient(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/client/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

////////////////////////////////Fournisseur

  public getFournisseurs(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/fournisseur', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addFournisseur(fournisseur: Fournisseur) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post(this.host+'/api/fournisseur', fournisseur,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateFournisseur(fournisseur: Fournisseur) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host+'/api/fournisseur', fournisseur,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteFournisseur(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/fournisseur/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  ////////////////////////////////BonDe Livraison
  public addBonDeLivraisonEntete(bonDeLivraison: BonDeLivraisonDocument): Observable<BonDeLivraisonDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post<BonDeLivraisonDocument>(this.host + '/api/bonDeLivraison', bonDeLivraison,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }




  ////////////////////////////////////////////Line
  public addLineDocument(line: LineDocument, idEntete: number): Observable<LineDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post<LineDocument>(this.host + '/api/line/'+idEntete, line,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getLinesDocumentByDocumentId(id: number):  Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/line/byEntete/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }


  public  deleteLine(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/line/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  /*
  getTasks(){
    if(this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+"/tasks", {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  */


/*
isAdmin(){
  for(let r of this.roles){
    if (r.authority == "ADMIN") return true;
}
return false;
}
*/
}
