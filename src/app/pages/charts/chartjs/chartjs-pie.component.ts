import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {AuthenticationService} from "../../../service/authentication-service";

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsPieComponent implements OnDestroy, OnInit {
  data: any;
  options: any;
  themeSubscription: any;
listeFournisseur:any;
  listeFournisseurtest:any;
listevaleur:any;
  listevaleurTest:any;

  constructor(private theme: NbThemeService,private authorizationService: AuthenticationService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {


      this.authorizationService.getTopFournisseur().subscribe(
        data => {
          this.listeFournisseur = data;

          this.authorizationService.getTopValue().subscribe(
            xx => {
              this.listevaleur = xx;


              const colors: any = config.variables;
              const chartjs: any = config.variables.chartjs;

              this.data = {
                labels: this.listeFournisseur,
                datasets: [{
                  data: this.listevaleur,
                  backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
                }],
              };

              this.options = {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  xAxes: [
                    {
                      display: false,
                    },
                  ],
                  yAxes: [
                    {
                      display: false,
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontColor: chartjs.textColor,
                  },
                },
              };
            }, err => {

            });



        }, err => {

        });


    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {

  }
}
