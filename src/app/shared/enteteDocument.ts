import {LineDocument} from './lineDocument';

export class EnteteDocument {
  constructor (public  id?: number,
               public type?: string,
              public ref?: string,
              public dateCreation?: string,
               public lieuCreation?: string,
               public lineDocument?: LineDocument[]) {
  }
}

