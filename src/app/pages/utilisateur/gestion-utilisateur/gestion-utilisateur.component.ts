import { Component, OnInit } from '@angular/core';
import {Produit} from "../../../model/produit";
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {User} from "../../../model/user";

@Component({
  selector: 'ngx-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class GestionUtilisateurComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: true,
      delete: false,
    },
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
      email: {
        title: 'Email',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      usernametest: {
        title: 'Login',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      valid: {
        title: 'Valid (oui/non)',
        type: 'string',
      },
    },
  };
  verifChamps: any="";
  utilisateur: User;
  source:any;
  constructor(private authorizationService: AuthenticationService,private router:Router) {
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit(): void {
    this.authorizationService.getUtilisateurs().subscribe(
      data => {
        this.source = data;
      }, err => {
      });
  }



  isVide(value: any, valeur: any) {
    if (value === "") {
      this.verifChamps = valeur + " est vide";
    }
  }




  // @ts-ignore
  onSaveConfirm(event) {
    this.verifChamps = "";
    let   user : User = {
      id:event['newData']['id'],
      email:event['newData']['email'],
      username: event['newData']['usernameTest'],
      password: event['newData']['password'],
      valid: event['newData']['valid'],
      usernametest: event['newData']['usernametest'],
    };
    this.isVide(event['newData']['valid'], "Valid");

    if(this.verifChamps === "") {
      this.authorizationService.updateUtilisateur(user).subscribe(
        data => {

          this.ngOnInit();
          event.confirm.resolve();
        }, err => {
          console.log('error');
          event.confirm.reject();
        });




    }
  }
}
