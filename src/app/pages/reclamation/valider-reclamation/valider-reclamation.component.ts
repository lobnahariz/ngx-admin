import { Component, OnInit } from '@angular/core';
import {Reclamation} from "../../../model/reclamation";
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-valider-reclamation',
  templateUrl: './valider-reclamation.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ValiderReclamationComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      delete:false,
      edit: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-checkmark"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    columns: {
      titre: {
        title: 'Titre',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
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
  // @ts-ignore
  onSaveConfirm(event) {
    this.verifChamps = "";
    let   reclamation : Reclamation = {
      id:event['newData']['id'],
      titre:event['newData']['titre'],
      description: event['newData']['description'],
      valide: "true",
      createdBy: event['newData']['createdBy'],
      dateCreationAudit: event['newData']['dateCreationAudit'],
    };

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

