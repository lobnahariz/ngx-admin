import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {Client} from "../../../model/client";

@Component({
  selector: 'ngx-ajout-client',
  templateUrl: './ajout-client.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AjoutClientComponent implements OnInit {

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
        title: 'TelephoneFixe',
        type: 'string',
      },
      telephonePortable: {
        title: 'TelephonePortable',
        type: 'string',
      },
      rib: {
        title: 'Rib',
        type: 'string',
      },
      adresse: {
        title: 'Adresse',
        type: 'string',
      },
    },
  };

  //source: LocalDataSource = new LocalDataSource();
  client: Client;
  source: any;
  constructor(private authorizationService: AuthenticationService,private router: Router) {
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit(): void {
    this.authorizationService.getClients().subscribe(
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
      this.authorizationService.deleteClient(event.data['id']).subscribe(
        data => {
          this.ngOnInit();
        }, err => {
          this.ngOnInit();
          console.log('error');
          event.confirm.reject();
        });
    }}

  onCreateConfirm(event) {

    let newClient: Client = {
      id: null,
   libelle: event['newData']['libelle'],
   nom: event['newData']['nom'],
   prenom: event['newData']['prenom'],
   nomSociete: event['newData']['nomSociete'],
   mail: event['newData']['mail'],
   telephoneFixe: event['newData']['telephoneFixe'],
   telephonePortable: event['newData']['telephonePortable'],
   rib: event['newData']['rib'],
   adresse: event['newData']['adresse'],
    };

    this.authorizationService.addClient(newClient).subscribe(
      data => {
        newClient.id = data.id;
        event.confirm.resolve();
        this.ngOnInit();
      }, err => {

        event.confirm.reject();
      });



  }


  // @ts-ignore
  onSaveConfirm(event) {
   // this.client = new Client(event['newData']['id'],event['newData']['libelle'], event['newData']['nom'], event['newData']['prenom'],event['newData']['nomSociete'],event['newData']['mail'],event['newData']['telephoneFixe'],event['newData']['telephonePortable'],event['newData']['rib'],event['newData']['adresse']);


    let newClient: Client = {
      id: null,
      libelle: event['newData']['libelle'],
      nom: event['newData']['nom'],
      prenom: event['newData']['prenom'],
      nomSociete: event['newData']['nomSociete'],
      mail: event['newData']['mail'],
      telephoneFixe: event['newData']['telephoneFixe'],
      telephonePortable: event['newData']['telephonePortable'],
      rib: event['newData']['rib'],
      adresse: event['newData']['adresse'],
    };

    this.authorizationService.updateClient(newClient).subscribe(
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
