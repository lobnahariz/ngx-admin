export interface DevisDocument {

  id: number;
  ref: string;
  dateCreation: string;
  lieuCreation: string;
  linesDocument: number;
  personId: number;
  delaiLivraisonSouhaite: string;
  achat: boolean;
  documenttotalHT: number;
  documenttotalTVA: number;
  documenttotalReduction: number;
  documenttotalTTC: number;
  documenttotalTTCReduction: number;
}
