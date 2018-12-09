export interface BonDeLivraisonDocument {

  id: number;
  ref: string;
  dateCreation: string;
  lieuCreation: string;
  linesDocument: number;
  personId: number;
  accuse_reception: boolean;
  receptionDate: string;
  receptionPersonne: string;
  achat: string;
  modifierStock?: string;
  documenttotalHT: number;
  documenttotalTVA: number;
  documenttotalReduction: number;
  documenttotalTTC: number;
  documenttotalTTCReduction: number;
  createdBy?: string;
  modifiedBy?: string;
  dateCreationAudit?: string;
}
