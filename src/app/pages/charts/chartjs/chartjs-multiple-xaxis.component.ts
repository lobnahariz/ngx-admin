import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {AuthenticationService} from "../../../service/authentication-service";
import {Produit} from "../../../model/produit";

@Component({
  selector: 'ngx-chartjs-multiple-xaxis',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsMultipleXaxisComponent implements OnDestroy,OnInit {
  data: {};
  options: any;
  themeSubscription: any;
produits : Produit[];
valeurs:any;
   couleur = ['#FF00FF', '#696969', '#FF69B4' , '#FFB6C1' , '#F08080' , '#5F9EA0' , '#800080']
   indexColor = 0;
dataS = [];
  constructor(private theme: NbThemeService,private authorizationService: AuthenticationService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
console.log(this.dataS);
      this.data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: this.dataS,
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Mois',
              },
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
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Valeur',
              },
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
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }

  ngOnInit(): void {


    this.authorizationService.getProduits().subscribe(
      data => {

        this.produits = data;
        this.produits.forEach(prod => {


          this.authorizationService.getTotalByProduitByAchat(prod.ref).subscribe(
            xx => {
              this.valeurs = xx;

              const x = {
                label: prod.ref,
                  data: this.valeurs,
                borderColor: this.couleur[this.indexColor],
                backgroundColor: this.couleur[this.indexColor],
                fill: false,
                borderDash: [5, 5],
                pointRadius: 8,
                pointHoverRadius: 10,
              }
              this.indexColor++;
              if (this.indexColor > 6) {
                this.indexColor = 0;
              }
              this.dataS.push(x);
            }, err => {

            });
        })

      }, err => {

      });
  }
}
