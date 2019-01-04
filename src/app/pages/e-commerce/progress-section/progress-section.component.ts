import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication-service";

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnInit {
  constructor(private authorizationService: AuthenticationService) {
  }
compteur: any;
  compteurYesterday: any;
description:any;
  progressInfoData:any;
  totalGain:any;
  progress:any;
  totalGainYesterday:any;
totalProgress:any;
  descriptionTotal:any;

  ngOnInit(): void {

    this.authorizationService.getTotalTodayReparation().subscribe(
      x => {
        this.compteur = x;


        this.authorizationService.getTotalYesterdayReparation().subscribe(
          y => {
this.compteurYesterday = y;

if(this.compteur > this.compteurYesterday){
  this.description="Mieux que hier ("+this.compteurYesterday+" Demandes)";
}else if(this.compteur < this.compteurYesterday) {
  this.description="Moins que hier ("+this.compteurYesterday+" Demandes)";
}else {
  this.description="Egale à hier ("+this.compteurYesterday+" Demandes)";

}

this.progress = this.compteur / this.compteurYesterday;
            this.authorizationService.getGainTodayReparation().subscribe(
              z => {
                this.totalGain = z;


                this.authorizationService.getGainYesterdayReparation().subscribe(
                  t => {
                    this.totalGainYesterday = t;

this.totalProgress= this.totalGain/this.totalGainYesterday;

                    if(this.totalGain > this.totalGainYesterday){
                      this.descriptionTotal="Mieux que hier ("+this.totalGainYesterday+" Gains)";
                    }else if(this.totalGain < this.totalGainYesterday) {
                      this.descriptionTotal="Moins que hier ("+this.totalGainYesterday+" Gains)";
                    }else {
                      this.descriptionTotal="Egale à hier ("+this.totalGainYesterday+" Gains)";

                    }

                    this.progressInfoData = [
                      {
                        title: 'Demandes de Reparation Aujourdui',
                        value: this.compteur,
                        activeProgress: this.progress,
                        description: this.description,
                      },
                      {
                        title: 'Total Gain de Reparation Aujourdui ',
                        value: this.totalGain,
                        activeProgress: this.totalProgress,
                        description: this.descriptionTotal,
                      },
                    ];
                  }, erru => {

                  });
              }, errrr => {

              });
          }, errr => {

          });
      }, err => {

      });
  }


}
