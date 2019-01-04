import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {AuthenticationService} from "../../../service/authentication-service";

@Component({
  selector: 'ngx-chartjs-bar-horizontal',
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarHorizontalComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,private authorizationService: AuthenticationService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;



      this.authorizationService.getAllAvoirAchat().subscribe(
        xx => {

          this.authorizationService.getAllAvoirVente().subscribe(
            yy => {

              this.data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                datasets: [{
                  label: 'Retour Achat',
                  backgroundColor: colors.infoLight,
                  borderWidth: 1,
                  data: xx,
                }, {
                  label: 'Retour Vente',
                  backgroundColor: colors.successLight,
                  data: yy,
                },
                ],
              };

            }, errrrr => {

            });
        }, err => {
        });




      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
