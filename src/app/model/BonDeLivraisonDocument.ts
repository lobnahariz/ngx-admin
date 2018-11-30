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
  achat: boolean;
  documenttotalHT: number;
  documenttotalTVA: number;
  documenttotalReduction: number;
  documenttotalTTC: number;
  documenttotalTTCReduction: number;
}
