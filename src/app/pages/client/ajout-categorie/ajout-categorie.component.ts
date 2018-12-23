import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {CategorieClient} from "../../../model/categorieClient";

@Component({
  selector: 'ngx-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AjoutCategorieComponent implements OnInit {
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
      nom: {
        title: 'Nom',
        type: 'string',
      },
      description: {
        title: 'Description',
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

  categorieClient: CategorieClient;
  source: any;
  constructor(private authorizationService: AuthenticationService,private router: Router) {

  }

  ngOnInit(): void {
    this.authorizationService.getCategories().subscribe(
      data => {
        console.log(data);

        this.source = data;
      }, err => {
        this.authorizationService.logout();
        this.router.navigateByUrl("/auth/login");
      });
  }


  onDeleteConfirm(event) {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteCategorieClient(event.data['idCategorie']).subscribe(
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
    this.isVide(event['newData']['nom'],"nom");
    this.isVide(event['newData']['description'],"description");


    if(this.requieredLine === "") {
      let newCategorie: CategorieClient = {
        idCategorie: null,
        nom: event['newData']['nom'],
        description: event['newData']['description'],
      };

      this.authorizationService.addCategorieClient(newCategorie).subscribe(
        data => {
       //   newCategorie.idCategorie = data.idCategorie;
          event.confirm.resolve();
          this.ngOnInit();
        }, err => {

          event.confirm.reject();
        });


    }
  }


  isVide(value: any,valeur: any) {
    if(value === "") {
      this.requieredLine = valeur+" est vide";
    }
  }
  // @ts-ignore
  onSaveConfirm(event) {
    // this.client = new Client(event['newData']['id'],event['newData']['libelle'], event['newData']['nom'], event['newData']['prenom'],event['newData']['nomSociete'],event['newData']['mail'],event['newData']['telephoneFixe'],event['newData']['telephonePortable'],event['newData']['rib'],event['newData']['adresse']);

    const categorie: CategorieClient = {
      idCategorie: event['newData']['idCategorie'],
      nom: event['newData']['nom'],
      description: event['newData']['description'],
      createdBy: event['newData']['createdBy'],
      dateCreation: event['newData']['dateCreation'],
    };

    this.authorizationService.updateCategorieClient(categorie).subscribe(
      data => {
        console.log(data);
        event.confirm.resolve();
        this.ngOnInit();
      }, err => {
        console.log('error');
        event.confirm.reject();
      });

  }


}

