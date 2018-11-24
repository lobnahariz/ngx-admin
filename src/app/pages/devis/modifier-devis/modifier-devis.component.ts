import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-modifier-devis',
  templateUrl: './modifier-devis.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ModifierDevisComponent implements OnInit {

  constructor(private authorizationService: AuthenticationService,private router:Router) { }
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
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
      ref: {
        title: 'Ref',
        type: 'string',
      },
      dateCreation: {
        title: 'Date Creation',
        type: 'string',
      },
      lieuCreation: {
        title: 'Lieu Creation',
        type: 'string',
      },
      delaiLivraisonSouhaite: {
        title: 'Delai Livraison Souhaite',
        type: 'string',
      },
    },
  };
  source:any;

  ngOnInit() {

    this.authorizationService.getDevisDocument().subscribe(
      data => {
        this.source = data;
      }, err => {
        this.authorizationService.logout();
        this.router.navigateByUrl("/auth/login");
      });
  }


  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.authorizationService.deleteDevisDocument(event.data['id']).subscribe(
        data => {
          this.ngOnInit();
        }, err => {
          this.ngOnInit();
          console.log('error');
          event.confirm.reject();
        });
    }}
}
