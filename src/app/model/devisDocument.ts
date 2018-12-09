export interface DevisDocument {

  id: number;
  ref: string;
  dateCreation: string;
  lieuCreation: string;
  linesDocument: number;
  personId: number;
  delaiLivraisonSouhaite: string;
  achat: string;
  documenttotalHT: number;
  documenttotalTVA: number;
  documenttotalReduction: number;
  documenttotalTTC: number;
  documenttotalTTCReduction: number;
   createdBy?: string;
   modifiedBy?: string;
   dateCreationAudit?: string;
  modifierStock?: string;

}
