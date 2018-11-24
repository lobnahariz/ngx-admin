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
}
