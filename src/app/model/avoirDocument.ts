export interface AvoirDocument {

  id: number;
  ref: string;
  dateCreation: string;
  lieuCreation: string;
  linesDocument: number;
  personId: number;
  achat: string;
  documenttotalHT: number;
  documenttotalTVA: number;
  documenttotalReduction: number;
  documenttotalTTC: number;
  documenttotalTTCReduction: number;
  factureReference: string;

  createdBy?: string;
   modifiedBy?: string;
   dateCreationAudit?: string;

}
