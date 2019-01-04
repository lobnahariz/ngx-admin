import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {AuthenticationService} from "../../../service/authentication-service";
import {Produit} from "../../../model/produit";

@Component({
  selector: 'ngx-echarts-area-stack',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsAreaStackComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  produits : Produit[];
  dataS = [];
  valeurs:any;
  constructor(private theme: NbThemeService, private authorizationService: AuthenticationService) {


  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;


      this.authorizationService.getProduits().subscribe(
        data => {

          this.produits = data;
          this.produits.forEach(prod => {


            this.authorizationService.getTotalByProduitByVente(prod.ref).subscribe(
              xx => {
                this.valeurs = xx;

                const x = {
                  name: prod.ref,
                  type: 'line',
                  stack: 'Total amount',
                  areaStyle: { normal: { opacity: echarts.areaOpacity } },
                  data: this.valeurs,
                }

                this.dataS.push(x);


                this.options = {
                  backgroundColor: echarts.bg,
                  color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'cross',
                      label: {
                        backgroundColor: echarts.tooltipBackgroundColor,
                      },
                    },
                  },
                  legend: {
                    data: ['HuaweiP20Lite', 'Sony XperiaXZ1', 'Asus Rog-GL703', 'Samsung-S24'],
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                  },
                  xAxis: [
                    {
                      type: 'category',
                      boundaryGap: false,
                      data: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      axisTick: {
                        alignWithLabel: true,
                      },
                      axisLine: {
                        lineStyle: {
                          color: echarts.axisLineColor,
                        },
                      },
                      axisLabel: {
                        textStyle: {
                          color: echarts.textColor,
                        },
                      },
                    },
                  ],
                  yAxis: [
                    {
                      type: 'value',
                      axisLine: {
                        lineStyle: {
                          color: echarts.axisLineColor,
                        },
                      },
                      splitLine: {
                        lineStyle: {
                          color: echarts.splitLineColor,
                        },
                      },
                      axisLabel: {
                        textStyle: {
                          color: echarts.textColor,
                        },
                      },
                    },
                  ],

                  series: this.dataS,

                };
              }, err => {

              });
          })












        }, err => {

        });


    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
