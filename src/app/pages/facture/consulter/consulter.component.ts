import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-consulter',
  templateUrl: './consulter.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ConsulterComponent implements OnInit {

  constructor(private authorizationService: AuthenticationService, private router: Router) { }
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-plus"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      achat: {
        title: 'Type',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,

      },
      ref: {
        title: 'Ref',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      etat: {
        title: 'Etat',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      modeReglement: {
        title: 'Mode Reglement',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      montantPaye: {
        title: 'Montant Total Paye',
        type: 'number',
        updateable: false,
        addable: false,
        editable: false,
      },
      dateLimiteReglement: {
        title: 'Date Limite Reglement',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      details:{
        title: 'Details',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },
      documenttotalTTCReduction: {
        title: 'Total TTC',
        type: 'number',
        updateable: false,
        addable: false,
        editable: false,
      },
    },
  };
  source: any;
  ngOnInit() {
    this.authorizationService.getFacture().subscribe(
      data => {
        this.source = data;
      }, err => {
        console.log("errr");
        //  this.authorizationService.logout();
        //   this.router.navigateByUrl("/auth/login");
      });
  }

}
