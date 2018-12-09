import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {AuthenticationService} from "../../../service/authentication-service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy , OnInit {
  options: any = {};
  themeSubscription: any;
   listeClient: Array<any> = [];
   client:any;
  listeValeur: Array<any> = [];
  listeValeurFinal: Array<any> = [];
  constructor(private theme: NbThemeService,private authorizationService: AuthenticationService,private router: Router) {
  }

  ngAfterViewInit() {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

            this.authorizationService.getTotalByClient().subscribe(
              total => {
                total.forEach(c => {
                  console.log(c);
                  const valeur = {
                    value: c.nombre,
                    name: c.nom,
                  };
                  this.listeClient.push(c.nom);
                  this.listeValeur.push(valeur);
                });

                this.options = {
                  backgroundColor: echarts.bg,
                  color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
                  tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                  },
                  legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.listeClient,
                    textStyle: {
                      color: echarts.textColor,
                    },
                  },
                  series: [
                    {
                      name: 'Clients',
                      type: 'pie',
                      radius: '80%',
                      center: ['50%', '50%'],
                      data: this.listeValeur,
                      itemStyle: {
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: echarts.itemHoverShadowColor,
                        },
                      },
                      label: {
                        normal: {
                          textStyle: {
                            color: echarts.textColor,
                          },
                        },
                      },
                      labelLine: {
                        normal: {
                          lineStyle: {
                            color: echarts.axisLineColor,
                          },
                        },
                      },
                    },
                  ],
                };
              }, err => {
              this.authorizationService.logout();
              this.router.navigateByUrl("/auth/login");
            });


        }, err => {
          this.authorizationService.logout();
          this.router.navigateByUrl("/auth/login");
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {

  }
}
