import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import {AuthenticationService} from "../../../service/authentication-service";

@Component({
  selector: 'ngx-chartjs-line',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsLineComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,private authorizationService: AuthenticationService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.authorizationService.getTotalRemiseAchat().subscribe(
        xx => {

          this.authorizationService.getTotalRemiseVente().subscribe(
            yy => {
              this.data = {
                labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                  data: yy,
                  label: 'Vente',
                  backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
                  borderColor: colors.primary,
                }, {
                  data: xx,
                  label: 'Achat',
                  backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
                  borderColor: colors.danger,
                }
                ],
              };
            }, errr => {
            });
        }, err => {
        });
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
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
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
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
}
