import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import {AuthenticationService} from "../../../service/authentication-service";

@Component({
  selector: 'ngx-chartjs-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
fournisseur:any;
valeur:any;
  constructor(private theme: NbThemeService,private authorizationService: AuthenticationService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;





      this.authorizationService.getFournisseurNotPayed().subscribe(
        data => {
          this.fournisseur = data;

          this.authorizationService.getValueNotPayed().subscribe(
            xx => {
              this.valeur = xx;




              this.data = {
                labels: this.fournisseur,
                datasets: [{
                  data: this.valeur,
                  label: 'Fournisseur',
                  backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
                }],
              };

              this.options = {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                  labels: {
                    fontColor: chartjs.textColor,
                  },
                },
                scales: {
                  xAxes: [
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
}
