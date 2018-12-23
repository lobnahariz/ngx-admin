import { Component, OnInit } from '@angular/core';
import {Produit} from "../../../model/produit";
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {Reclamation} from "../../../model/reclamation";

@Component({
  selector: 'ngx-ajout-reclamation',
  templateUrl: './ajout-reclamation.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AjoutReclamationComponent implements OnInit {
  settings = {
    actions: {
      add: true,
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
      titre: {
        title: 'Titre',
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
      dateCreationAudit: {
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
  verifChamps: any="";
  reclamation: Reclamation;
  source:any;
  constructor(private authorizationService: AuthenticationService,private router:Router) {
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit(): void {
    this.authorizationService.getReclamations().subscribe(
      data => {
        this.source = data;
      }, err => {
        this.authorizationService.logout();
        this.router.navigateByUrl("/auth/login");
      });
  }


  onDeleteConfirm(event) {
    console.log('Delete Event In Console');
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteReclamation(event.data['id']).subscribe(
        data => {
          this.ngOnInit();
        }, err => {
          this.ngOnInit();
          console.log('error');
          event.confirm.reject();
        });
    }}
  isVide(value: any, valeur: any) {
    if (value === "") {
      this.verifChamps = valeur + " est vide";
    }
  }

  onCreateConfirm(event) {
    this.verifChamps = "";
    let reclamation:  Reclamation= {
      id: null,
      titre: event['newData']['titre'],
      description: event['newData']['description'],
      valide: "false",
      createdBy: event['newData']['createdBy'],
      dateCreationAudit: event['newData']['dateCreationAudit'],
    };
    this.isVide(event['newData']['titre'], "Titre");

    this.isVide(event['newData']['description'], "Description");

    if(this.verifChamps === "") {
      this.authorizationService.addReclamation(reclamation).subscribe(
        data => {
          this.ngOnInit();
          event.confirm.resolve();
        }, err => {
          console.log('error');
          event.confirm.reject();
        });
    }

  }


  // @ts-ignore
  onSaveConfirm(event) {
    this.verifChamps = "";
    let   reclamation : Reclamation = {
      id:event['newData']['id'],
      titre:event['newData']['titre'],
      description: event['newData']['description'],
      valide: "false",
      createdBy: event['newData']['createdBy'],
      dateCreationAudit: event['newData']['dateCreationAudit'],
    };
    this.isVide(event['newData']['titre'], "Titre");

    this.isVide(event['newData']['description'], "Description");

    if(this.verifChamps === "") {
      this.authorizationService.updateReclamation(reclamation).subscribe(
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
