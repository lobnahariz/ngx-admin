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
  modifierStock?: string;

  achat: string;
  documenttotalHT: number;
  documenttotalTVA: number;
  documenttotalReduction: number;
  documenttotalTTC: number;
  documenttotalTTCReduction: number;
  createdBy?: string;
  modifiedBy?: string;
  dateCreationAudit?: string;
}
