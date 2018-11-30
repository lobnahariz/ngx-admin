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
import {Register} from "../model/register";
import {BonLivraisonComponent} from "../pages/bon-livraison/bon-livraison.component";
import {FactureDocument} from "../model/factureDocument";

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
  localStorage.setItem('currentUser', user.username);

  return this.http.post(this.host+"/login" , user ,{ observe : 'response' });
}
  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');

  }

  public register(register) {
    return this.http.post(this.host+'/register', register);
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

  public getProduitByRef(ref: string): Observable<Produit>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<Produit>(this.host+'/api/produit/getByRef/'+ref ,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
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

  public getBonDeLivraison(): Observable<BonDeLivraisonDocument[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<BonDeLivraisonDocument[]>(this.host + '/api/bonDeLivraison',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public deleteBonDeLivraison(id: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host + '/api/bonDeLivraison/'+ id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public addBonDeLivraisonDocument(bonDeLivraison: BonDeLivraisonDocument): Observable<BonDeLivraisonDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post<BonDeLivraisonDocument>(this.host + '/api/bonDeLivraison', bonDeLivraison,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getBonLivraisonDocumentById(id: number): Observable<BonDeLivraisonDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<BonDeLivraisonDocument>(this.host + '/api/bonDeLivraison/getById/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  ///////////////////////////////////:Facture

  ////////////////////////////////BonDe Livraison
  public addFactureEntete(facture: FactureDocument): Observable<FactureDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post<FactureDocument>(this.host + '/api/facture', facture,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getFacture(): Observable<FactureDocument[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<FactureDocument[]>(this.host + '/api/facture',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public deleteFacture(id: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host + '/api/facture/'+ id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public addFactureDocument(facture: FactureDocument): Observable<FactureDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.post<FactureDocument>(this.host + '/api/facture', facture,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
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
