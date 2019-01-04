import { Injectable } from '@angular/core';
import { PeriodsService } from './periods.service';
import {NbColorHelper} from "@nebular/theme";
import {AuthenticationService} from "../../service/authentication-service";

export class OrdersChart {
  chartLabel: string[];
  linesData: number[][];
}

@Injectable()
export class OrdersChartService {

  private year = [
  ];

  private data = { };
private totalFactureNonPaye : any;
  private totalFacturePaye : any;
  private totalFactureNonPayeEtPaye : any;

  private totalFactureNonPayeParSemaine : any;
  private totalFacturePayeParSemaine : any;
  private totalFactureNonPayeEtPayeParSemaine : any;

  private totalFactureNonPayeParAnnee : any;
  private totalFacturePayeParAnnee : any;
  private totalFactureNonPayeEtPayeParAnnee : any;
  constructor(private period: PeriodsService, private authorizationService: AuthenticationService) {

    this.authorizationService.getTotalAchatFactureNonPayeParMois().subscribe(
      yy => {
        this.totalFactureNonPaye = yy;

        this.authorizationService.getTotalAchatFacturePayeParMois().subscribe(
          xx => {
            this.totalFacturePaye = xx;

            this.authorizationService.getTotalAchatFacturePayeEtNonPayeParMois().subscribe(
              total => {
                this.totalFactureNonPayeEtPaye = total;





                this.authorizationService.getTotalAchatNonPayeParSemaine().subscribe(
                  a => {
                    this.totalFactureNonPayeParSemaine = a;

                    this.authorizationService.getTotalAchatPayeParSemaine().subscribe(
                      b => {
                        this.totalFacturePayeParSemaine = b;

                        this.authorizationService.getTotalAchatFacturePayeEtNonPayeParSemaine().subscribe(
                          c => {
                            this.totalFactureNonPayeEtPayeParSemaine = c;



                            this.authorizationService.getTotalAchatNonPayeParAnnee().subscribe(
                              x => {
                                this.totalFactureNonPayeParAnnee = x;

                                this.authorizationService.getTotalAchatPayeParAnnee().subscribe(
                                  y => {
                                    this.totalFacturePayeParAnnee = y;

                                    this.authorizationService.getTotalAchatFacturePayeEtNonPayeParAnnee().subscribe(
                                      z => {
                                        this.totalFactureNonPayeEtPayeParAnnee = z;






                                        this.authorizationService.getYears().subscribe(
                                          yyy => {
                                            this.year = yyy;
                                            this.data = {
                                              week: this.getDataForWeekPeriod(),
                                              month: this.getDataForMonthPeriod(),
                                              year: this.getDataForYearPeriod(),
                                            };
                                          }, eror => {
                                          });

                                      }, eror => {
                                      });

                                  }, er => {
                                  });
                              }, errr => {
                              });
















                            this.data = {
                              week: this.getDataForWeekPeriod(),
                              month: this.getDataForMonthPeriod(),
                              year: this.getDataForYearPeriod(),
                            };
                          }, eror => {
                          });

                      }, er => {
                      });
                  }, errr => {
                  });

              }, eror => {
              });

          }, er => {
          });
      }, errr => {
      });



  }

  private getDataForWeekPeriod(): OrdersChart {
    return {
      chartLabel: this.getDataLabels(7, this.period.getWeeks()),
      linesData: [
      this.totalFacturePayeParSemaine,
        this.totalFactureNonPayeParSemaine,
      this.totalFactureNonPayeEtPayeParSemaine,
      ],
    };
  }

  private getDataForMonthPeriod(): OrdersChart {
    return {
      chartLabel: this.getDataLabels(12, this.period.getMonths()),
      linesData: [
           this.totalFacturePaye,
            this.totalFactureNonPaye,
           this.totalFactureNonPayeEtPaye,
      ],
    };
  }

  private getDataForYearPeriod(): OrdersChart {
    return {
      chartLabel: this.getDataLabels(7, this.year),
      linesData: [
      this.totalFacturePayeParAnnee,
       this.totalFactureNonPayeParAnnee,
       this.totalFactureNonPayeEtPayeParAnnee
      ],
    };
  }

  getDataLabels(nPoints: number, labelsArray: string[]): string[] {
    const labelsArrayLength = labelsArray.length;
    const step = Math.round(nPoints / labelsArrayLength);

    return Array.from(Array(nPoints)).map((item, index) => {
      const dataIndex = Math.round(index / step);

      return index % step === 0 ? labelsArray[dataIndex] : '';
    });
  }

  getOrdersChartData(period: string): OrdersChart {
    return this.data[period];
  }
}
