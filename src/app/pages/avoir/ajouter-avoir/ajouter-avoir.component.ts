import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LigneModalComponent} from "../ligne-modal/ligne-modal.component";

@Component({
  selector: 'ngx-ajouter-avoir',
  templateUrl: './ajouter-avoir.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AjouterAvoirComponent implements OnInit {


  constructor(private authorizationService: AuthenticationService,private router:Router,private modalService: NgbModal) {}
  settings = {
    actions: {
      add: false,
      edit: true,
      delete: false,
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
      achat: {
        title: 'Type',
        type: 'boolean',
        editable: false,

      },
      ref: {
        title: 'Ref',
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
      lieuCreation: {
        title: 'Lieu Creation',
        type: 'string',
        updateable: false,
        addable: false,
        editable: false,
      },

    },
  };

  source:any;

  ngOnInit() {
    this.authorizationService.getFactureWithNoStockUpdate().subscribe(
      data => {
        this.source = data;
      }, err => {
        console.log("errr");
        //  this.authorizationService.logout();
        //   this.router.navigateByUrl("/auth/login");
      });
  }
  onSaveConfirm(event) {
    this.showLargeModal(event);
  }

  showLargeModal(event) {
    const activeModal = this.modalService.open(LigneModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = "Avoir N° "+event['data']['ref']+"-"+event['data']['id'];
  }


}
