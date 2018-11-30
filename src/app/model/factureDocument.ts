export interface FactureDocument {

  id: number;
  ref: string;
  dateCreation: string;
  lieuCreation: string;
  linesDocument: number;
  personId: number;

  etat: string;
montantPaye: number;
  modeReglement: string;

  dateLimiteReglement: string;

  details: string;

  achat: boolean;
  documenttotalHT: number;
  documenttotalTVA: number;
  documenttotalReduction: number;
  documenttotalTTC: number;
  documenttotalTTCReduction: number;
}
