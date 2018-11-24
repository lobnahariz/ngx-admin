export class LineDocument {
  constructor (public  id?: number,
                public code?: string,
                public qte?: number,
                public prixUnitaire?: number,
                public tva?: number,
                public totalHT?: number,
                public totalTTC?: number) {
  }
}

