import { Injectable } from '@angular/core';
import { PeriodsService } from './periods.service';

export class ProfitChart {
  chartLabel: string[];
  data: number[][];
}

@Injectable()
export class ProfitChartService {

  private year = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
  ];

  private data = { };

  constructor(private period: PeriodsService) {
    this.data = {
      week: this.getDataForWeekPeriod(),
      month: this.getDataForMonthPeriod(),
      year: this.getDataForYearPeriod(),
    };
  }
array: any = [];
  private getDataForWeekPeriod(): ProfitChart {
    const nPoint = this.period.getWeeks().length;

    return {
      chartLabel: this.period.getWeeks(),
      data: [
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
      ],
    };
  }

  private getDataForMonthPeriod(): ProfitChart {
    const nPoint = this.period.getMonths().length;
    return {
      chartLabel: this.period.getMonths(),
      data: [
        this.getRandomDataMonthly(nPoint),
        this.getRandomDataMonthly(nPoint),
       this.getRandomDataMonthly(nPoint),
      ],
    };
  }

  private getDataForYearPeriod(): ProfitChart {
    const nPoint = this.year.length;

    return {
      chartLabel: this.year,
      data: [
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
      ],
    };
  }

  private getRandomData(nPoints: number): number[] {
     this.array.push(33);
    this.array.push(23);
    this.array.push(334);
    this.array.push(12);
    this.array.push(22);
    this.array.push(254);
    this.array.push(65);
    this.array.push(76);
    this.array.push(54);
return this.array;
    // return Array.from(Array(nPoints)).map(() => {
   //   return Math.round(Math.random() * 500);
   // });
  }
  private getRandomDataMonthly(nPoints: number): number[] {
    this.array.push(332);
    this.array.push(2);
    this.array.push(66);
    this.array.push(56);
    this.array.push(99);
    this.array.push(100);
    this.array.push(102);
    this.array.push(23);
    this.array.push(98);
    return this.array;
    // return Array.from(Array(nPoints)).map(() => {
    //   return Math.round(Math.random() * 500);
    // });
  }
  getProfitChartData(period: string): ProfitChart {
    return this.data[period];
  }
}
