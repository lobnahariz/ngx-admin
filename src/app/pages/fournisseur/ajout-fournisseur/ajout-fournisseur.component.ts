import { Component, OnInit } from '@angular/core';
import {Fournisseur} from "../../../model/fournisseur";
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-ajout-fournisseur',
  templateUrl: './ajout-fournisseur.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AjoutFournisseurComponent implements OnInit {
  requieredLine:any = "";
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      libelle: {
        title: 'Libelle',
        type: 'string',
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      prenom: {
        title: 'Prenom',
        type: 'string',
      },
      nomSociete: {
        title: 'NomSociete',
        type: 'string',
      },
      mail: {
        title: 'Mail',
        type: 'string',
      },
      telephoneFixe: {
        title: 'Fixe',
        type: 'string',
      },
      telephonePortable: {
        title: 'Portable',
        type: 'string',
      },
      rib: {
        title: 'Rib',
        type: 'string',
      },
      ville: {
        title: 'Ville',
        type: 'string',
      },
      adresse: {
        title: 'Adresse',
        type: 'string',
      },
      categorieCode: {
        title: 'CategorieCode',
        type: 'string',
      },
      createdBy: {
        title: 'Crée Par',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      modifiedBy: {
        title: 'Modifier Par',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      dateCreation: {
        title: 'Date Creation',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      derniereDateModif: {
        title: 'Derniere Date Modif',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
    },
  };

  fournisseur: Fournisseur;
  source: any;
  constructor(private authorizationService: AuthenticationService,private router: Router) {
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit(): void {
    this.authorizationService.getFournisseurs().subscribe(
      data => {
        this.source = data;
      }, err => {
        this.authorizationService.logout();
        this.router.navigateByUrl("/auth/login");
      });
  }

  isVide(value: any,valeur: any) {
    if(value === "") {
      this.requieredLine = valeur+" est vide";
    }
  }
  onDeleteConfirm(event) {
    console.log();
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteFournisseur(event.data['id']).subscribe(
        data => {
          this.ngOnInit();
        }, err => {
          this.ngOnInit();
          console.log('error');
          event.confirm.reject();
        });
    }}

onCreateConfirm(event) {
    this.requieredLine ="";
    this.isVide(event['newData']['libelle'],"libelle");
    this.isVide(event['newData']['nom'],"nom");
    this.isVide(event['newData']['prenom'],"prenom");
    this.isVide(event['newData']['nomSociete'],"nomSociete");
    this.isVide(event['newData']['mail'],"mail");
    this.isVide(event['newData']['telephonePortable'],"telephonePortable");
    this.isVide(event['newData']['adresse'],"adresse");
    this.isVide(event['newData']['ville'],"ville");
  this.isVide(event['newData']['categorieCode'],"categorieCode");

    if(this.requieredLine === ""){
      this.fournisseur = new Fournisseur(
        event['newData']['id'],
        event['newData']['libelle'],
        event['newData']['nom'],
        event['newData']['prenom'],
        event['newData']['nomSociete'],
        event['newData']['mail'],
        event['newData']['telephoneFixe'],
        event['newData']['telephonePortable'],
        event['newData']['rib'],
        event['newData']['adresse']
        , null, null, null,
        event['newData']['ville'],
        event['newData']['categorieCode']);


      this.authorizationService.getCategoriesFournisseurByName(this.fournisseur.categorieCode).subscribe(
        data => {
          if(data === 1){
            this.authorizationService.addFournisseur(this.fournisseur).subscribe(
              xx => {
                event.confirm.resolve();
                this.ngOnInit();
              }, errr => {
                event.confirm.reject();
              });
          }else{
            this.requieredLine = "Categorie est inexistante";
          }
          }, err => {
          event.confirm.reject();
        });



}
  }


  // @ts-ignore
  onSaveConfirm(event) {
    this.requieredLine ="";
    this.fournisseur = new Fournisseur(event['newData']['id'],event['newData']['libelle'], event['newData']['nom'], event['newData']['prenom'],event['newData']['nomSociete'],event['newData']['mail'],event['newData']['telephoneFixe'],event['newData']['telephonePortable'],event['newData']['rib'],event['newData']['adresse'],event['data']['createdBy'],null,event['data']['dateCreation'],
      event['newData']['ville'], event['newData']['categorieCode']
      );
    this.isVide(event['newData']['libelle'],"libelle");
    this.isVide(event['newData']['nom'],"nom");
    this.isVide(event['newData']['prenom'],"prenom");
    this.isVide(event['newData']['nomSociete'],"nomSociete");
    this.isVide(event['newData']['mail'],"mail");
    this.isVide(event['newData']['telephonePortable'],"telephonePortable");
    this.isVide(event['newData']['adresse'],"adresse");
    this.isVide(event['newData']['ville'],"ville");
    this.isVide(event['newData']['categorieCode'],"categorieCode");
    if(this.requieredLine === "") {
      this.authorizationService.getCategoriesFournisseurByName(this.fournisseur.categorieCode).subscribe(
        data => {
          if (data === 1) {
            this.authorizationService.updateFournisseur(this.fournisseur).subscribe(
              xx => {
                event.confirm.resolve();
                this.ngOnInit();
              }, errr => {
                event.confirm.reject();
              });
          } else {
            this.requieredLine = "Categorie est inexistante";
          }
        }, err => {
          event.confirm.reject();
        });
    }


   /* this.authorizationService.updateFournisseur(this.fournisseur).subscribe(
      data => {
        console.log(data);
        event.confirm.resolve();
        this.ngOnInit();
      }, err => {
        console.log('error');
        event.confirm.reject();
      });*/

  }


}

