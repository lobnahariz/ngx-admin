export class Fournisseur {
  constructor (public  id?: number,
               public libelle?: string,
               public nom?: string,
               public prenom?: string,
               public nomSociete?: string,
               public mail?: string,
               public telephoneFixe?: string,
               public telephonePortable?: string,
               public rib?: string,
               public adresse?: string,
               public createdBy?: string,
               public modifiedBy?: string,
               public dateCreation?: string,
               public ville?: string,
               public  categorieCode?: string,
) {
  }
}

