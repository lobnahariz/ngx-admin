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
import {Chart} from "../model/chart";
import {ChartWithDate} from "../model/chartWithDate";
import {CategorieClient} from "../model/categorieClient";
import {CategorieFournisseur} from "../model/categorieFournisseur";
import {CategorieProduit} from "../model/categorieProduit";
import {ReperationDocument} from "../model/reparationDocument";
import {Reclamation} from "../model/reclamation";
import {User} from "../model/user";
import {AvoirModule} from "../pages/avoir/avoir.module";
import {AvoirDocument} from "../model/avoirDocument";

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

////////////////////////////////////////Reparation
  public getReparationById(id: number): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getById/'+id, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getTotalReparationFinis(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getTotalReparationFinis', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getNombreReparationEncours(): any  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getNombreReparationEncours', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getNombreReparationNouvelle(): any  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getNombreReparationNouvelle', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getNombreReparationEnAttente(): any  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getNombreReparationEnAttente', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getTotalTodayReparation(): any  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getTotalTodayReparation', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getGainTodayReparation(): any  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getGainTodayReparation', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getGainYesterdayReparation(): any  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getGainYesterdayReparation', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getTotalYesterdayReparation(): any  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation/getTotalYesterdayReperation', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getReparation(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reparation', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addReparation(reparationDocument: ReperationDocument): Observable<ReperationDocument> {
    if (this.jwtToken == null) this.loadToken();
    reparationDocument.createdBy = localStorage.getItem('currentUser');
    return this.http.post<ReperationDocument>(this.host+'/api/reparation', reparationDocument,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateReparation(reparationDocument: ReperationDocument) {
    if (this.jwtToken == null) this.loadToken();
    reparationDocument.modifiedBy= localStorage.getItem('currentUser');
    return this.http.put(this.host+'/api/reparation', reparationDocument,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteReparation(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/reparation/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

////////////////////////////////////Categorie Produit

  public getCategoriesProduitByName(name: string): Observable<any>    {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/categorieProduit/getByName/'+name, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getCategoriesProduit(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/categorieProduit', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addCategorieProduit(categorieProduit: CategorieProduit) {
    if (this.jwtToken == null) this.loadToken();
    categorieProduit.createdBy =localStorage.getItem('currentUser');
    return this.http.post(this.host+'/api/categorieProduit', categorieProduit,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateCategorieProduit(categorieProduit: CategorieProduit) {
    if (this.jwtToken == null) this.loadToken();
    categorieProduit.modifiedBy= localStorage.getItem('currentUser');
    return this.http.put(this.host+'/api/categorieProduit', categorieProduit,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteCategorieProduit(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/categorieProduit/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
////////////////////////////////////Categorie Fournisseur
  public getCategoriesFournisseurByName(name: string): Observable<any>    {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/categorieFournisseur/getByName/'+name, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getCategoriesFournisseur(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/categorieFournisseur', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addCategorieFournisseur(categorieFournisseur: CategorieFournisseur) {
    if (this.jwtToken == null) this.loadToken();
    categorieFournisseur.createdBy =localStorage.getItem('currentUser');
    return this.http.post(this.host+'/api/categorieFournisseur', categorieFournisseur,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateCategorieFournisseur(categorieFournisseur: CategorieFournisseur) {
    if (this.jwtToken == null) this.loadToken();
    categorieFournisseur.modifiedBy= localStorage.getItem('currentUser');
    return this.http.put(this.host+'/api/categorieFournisseur', categorieFournisseur,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteCategorieFournisseur(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/categorieFournisseur/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
///////////////////////////Categorie

  public getCategoriesByName(name: string): Observable<any>    {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/categorieClient/getByName/'+name, {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getCategories(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/categorieClient', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addCategorieClient(categorieClient: CategorieClient) {
    if (this.jwtToken == null) this.loadToken();
    categorieClient.createdBy =localStorage.getItem('currentUser');
    return this.http.post(this.host+'/api/categorieClient', categorieClient,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateCategorieClient(categorieClient: CategorieClient) {
    if (this.jwtToken == null) this.loadToken();
    categorieClient.modifiedBy= localStorage.getItem('currentUser');
    return this.http.put(this.host+'/api/categorieClient', categorieClient,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteCategorieClient(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/categorieClient/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
////////////////////////////////Produit

  public getTotalVenteParMoisPourArticle(): Observable<ChartWithDate[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<ChartWithDate[]>(this.host+'/api/produit/totalByProduit', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }


  public getProduits(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/produit', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addProduit(produit: Produit) {
    if (this.jwtToken == null) this.loadToken();
    produit.createdBy =localStorage.getItem('currentUser');
    return this.http.post(this.host+'/api/produit', produit,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateProduit(produit: Produit) {
    if (this.jwtToken == null) this.loadToken();
    produit.modifiedBy= localStorage.getItem('currentUser');
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
    devis.createdBy = localStorage.getItem('currentUser');
    console.log(devis.createdBy+"******************")
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
  public updateEnteteDocument(devis: DevisDocument): Observable<DevisDocument> {
    if (this.jwtToken == null) this.loadToken();
    devis.modifiedBy  = localStorage.getItem('currentUser');
    return this.http.put<DevisDocument>(this.host + '/api/devis', devis,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }



///////////////////////////////////Client
  public getMontantApayeParClient(): Observable<Chart[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<Chart[]>(this.host + '/api/client/totalAPayeByClient',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getTotalByClient(): Observable<Chart[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<Chart[]>(this.host+'/api/client/totalByClient', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getClients(): Observable<Client[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<Client[]>(this.host+'/api/client', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addClient(client: Client) {
    if (this.jwtToken == null) this.loadToken();
    client.createdBy = localStorage.getItem('currentUser');
    return this.http.post<Client>(this.host+'/api/client', client,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateClient(client: Client) {
    if (this.jwtToken == null) this.loadToken();
    client.modifiedBy= localStorage.getItem('currentUser');
    return this.http.put(this.host+'/api/client', client,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteClient(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/client/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getClientById(id: number): Observable<Client> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<Client>(this.host + '/api/client/getById/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
////////////////////////////////Fournisseur

  public getFournisseurs(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/fournisseur', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addFournisseur(fournisseur: Fournisseur) {
    if (this.jwtToken == null) this.loadToken();
    fournisseur.createdBy = localStorage.getItem('currentUser');
    return this.http.post(this.host+'/api/fournisseur', fournisseur,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateFournisseur(fournisseur: Fournisseur) {
    if (this.jwtToken == null) this.loadToken();
    fournisseur.modifiedBy = localStorage.getItem('currentUser');
    return this.http.put(this.host+'/api/fournisseur', fournisseur,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteFournisseur(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/fournisseur/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getFournisseurById(id: number): Observable<Fournisseur> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<Fournisseur>(this.host + '/api/fournisseur/getById/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  ////////////////////////////////BonDe Livraison
  public getBonDeLivraison(): Observable<BonDeLivraisonDocument[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<BonDeLivraisonDocument[]>(this.host + '/api/bonDeLivraison',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public deleteBonDeLivraison(id: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host + '/api/bonDeLivraison/'+ id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public updateBonDeLivraisonDocument(bonDeLivraison: BonDeLivraisonDocument): Observable<BonDeLivraisonDocument> {
    if (this.jwtToken == null) this.loadToken();
    bonDeLivraison.modifiedBy = localStorage.getItem('currentUser');
    return this.http.put<BonDeLivraisonDocument>(this.host + '/api/bonDeLivraison', bonDeLivraison,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public addBonDeLivraisonDocument(bonDeLivraison: BonDeLivraisonDocument): Observable<BonDeLivraisonDocument> {
    if (this.jwtToken == null) this.loadToken();
    bonDeLivraison.createdBy = localStorage.getItem('currentUser');
    return this.http.post<BonDeLivraisonDocument>(this.host + '/api/bonDeLivraison', bonDeLivraison,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getBonLivraisonDocumentById(id: number): Observable<BonDeLivraisonDocument> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<BonDeLivraisonDocument>(this.host + '/api/bonDeLivraison/getById/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  ///////////////////////////////////:Facture

  public getFactureNonPaye(): Observable<FactureDocument[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<FactureDocument[]>(this.host + '/api/facture/NotPayed',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getFournisseurNotPayed(): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/facture/getFournisseurNotPayed',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getTotalRemiseAchat(): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/facture/getTotalRemiseAchat',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getTotalRemiseVente(): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/facture/getTotalRemiseVente',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getValueNotPayed(): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/facture/getValueNotPayed',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getTopFournisseur(): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/facture/getTopFournisseur',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getTopValue(): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/facture/getTopValue',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getFactureWithNoStockUpdate(): Observable<FactureDocument[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<FactureDocument[]>(this.host + '/api/facture/NotAllFactureWithNoStockUpdate',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getFacture(): Observable<FactureDocument[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<FactureDocument[]>(this.host + '/api/facture',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getFactureById(id: number): Observable<FactureDocument>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<FactureDocument>(this.host + '/api/facture/getById/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getFactureByRef(ref: string): Observable<FactureDocument>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<FactureDocument>(this.host + '/api/facture/getByRef/'+ref,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public deleteFacture(id: number) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host + '/api/facture/'+ id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public addFactureDocument(facture: FactureDocument): Observable<FactureDocument> {
    if (this.jwtToken == null) this.loadToken();
    facture.createdBy =localStorage.getItem('currentUser');
    return this.http.post<FactureDocument>(this.host + '/api/facture', facture,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public updateFactureDocument(facture: FactureDocument): Observable<FactureDocument> {
    if (this.jwtToken == null) this.loadToken();
    facture.modifiedBy= localStorage.getItem('currentUser');
    return this.http.put<FactureDocument>(this.host + '/api/facture', facture,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  ////////////////////////////////////////////Line
  public addLineDocument(line: LineDocument, idEntete: number): Observable<LineDocument> {
    if (this.jwtToken == null) this.loadToken();
    if (line.id_line != null) {
      line.modifiedBy =localStorage.getItem('currentUser');
    }else {
      line.createdBy =localStorage.getItem('currentUser');
    }
    return this.http.post<LineDocument>(this.host + '/api/line/'+idEntete, line,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getLinesDocumentByDocumentId(id: number):  Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/line/byEntete/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getTotalByProduitByAchat(code: string):  Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/line/getTotalByProduitByAchat/'+code,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public getTotalByProduitByVente(code: string):  Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host + '/api/line/getTotalByProduitByVente/'+code,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
  public  deleteLine(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/line/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateLineDocument(line: LineDocument, idEntete: number): Observable<LineDocument> {
    if (this.jwtToken == null) this.loadToken();
    line.modifiedBy =localStorage.getItem('currentUser');
    return this.http.put<LineDocument>(this.host + '/api/line/'+idEntete, line,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }
//////////////////////////////////////////////////////Reclamation


  public getReclamations(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/reclamation', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public addReclamation(reclamation: Reclamation) {
    if (this.jwtToken == null) this.loadToken();
    reclamation.createdBy =localStorage.getItem('currentUser');
    return this.http.post(this.host+'/api/reclamation', reclamation,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateReclamation(reclamation: Reclamation) {
    if (this.jwtToken == null) this.loadToken();
    reclamation.modifiedBy= localStorage.getItem('currentUser');
    return this.http.put(this.host+'/api/reclamation', reclamation,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public  deleteReclamation(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/reclamation/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

/////////////////////////////////////User

  public getUtilisateurs(): Observable<User>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/user', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getUtilisateurByMail(mail: string,login: string): any {
    return this.http.get(this.host+'/register/user/verifExistance/' + mail+'/'+login);
  }
  public  deleteUtilisateur(id: number): Observable<any> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.delete(this.host+'/api/user/' + id,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public updateUtilisateur(user: User) {
    if (this.jwtToken == null) this.loadToken();
    return this.http.put(this.host+'/api/user', user,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  ///////////////////////////////Avoir
  public getAllAvoirAchat(): Observable<AvoirModule>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/avoir/getAllAvoirAchat', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getAllAvoirVente(): Observable<AvoirModule>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/avoir/getAllAvoirVente', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public addAvoir(avoir: AvoirDocument): Observable<AvoirDocument>  {
    if (this.jwtToken == null) this.loadToken();
    avoir.createdBy =localStorage.getItem('currentUser');
    return this.http.post<AvoirDocument>(this.host+'/api/avoir', avoir,{headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getAvoir(): Observable<AvoirDocument[]> {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<AvoirDocument[]>(this.host + '/api/avoir',{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getAvoirById(id: number): Observable<AvoirDocument>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get<AvoirDocument>(this.host + '/api/avoir/getById/'+id,{ headers: new HttpHeaders({'Authorization': this.jwtToken}) });
  }

  public getTotalAchatFactureNonPayeParMois(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatFactureNonPayeParMois', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getTotalAchatFacturePayeParMois(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatFacturePayeParMois', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getTotalAchatFacturePayeEtNonPayeParMois(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatFacturePayeEtNonPayeParMois', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }



  public getTotalAchatPayeParSemaine(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatPayeParSemaine', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getTotalAchatNonPayeParSemaine(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatNonPayeParSemaine', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getTotalAchatFacturePayeEtNonPayeParSemaine(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatFacturePayeEtNonPayeParSemaine', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }



  public getTotalAchatNonPayeParAnnee(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatNonPayeParAnnee', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getTotalAchatPayeParAnnee(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatPayeParAnnee', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }

  public getTotalAchatFacturePayeEtNonPayeParAnnee(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getTotalAchatFacturePayeEtNonPayeParAnnee', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
  }
  public getYears(): Observable<any>  {
    if (this.jwtToken == null) this.loadToken();
    return this.http.get(this.host+'/api/facture/getYears', {headers: new HttpHeaders({'Authorization': this.jwtToken})});
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
