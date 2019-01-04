import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LigneModelComponent} from "../../facture/ligne-model/ligne-model.component";
import {LigneConsultationComponent} from "../ligne-consultation/ligne-consultation.component";

@Component({
  selector: 'ngx-consulter-avoir',
  templateUrl: './consulter-avoir.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ConsulterAvoirComponent implements OnInit {

  constructor(private authorizationService: AuthenticationService, private router: Router, private modalService: NgbModal) { }
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
      factureReference: {
        title: 'FactureReference',
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
      createdBy: {
        title: 'Crée Par',
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
  source: any;
  ngOnInit() {
    this.authorizationService.getAvoir().subscribe(
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
    const activeModal = this.modalService.open(LigneConsultationComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = "Avoir N° "+event['data']['ref']+"-"+event['data']['id'];
  }
}

