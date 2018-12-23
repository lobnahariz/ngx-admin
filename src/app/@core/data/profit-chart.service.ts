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
        this.getRandomDataNonPaye(nPoint),
        this.getRandomDataTotal(nPoint),
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
    this.array = [];
     this.array.push(2500);
    this.array.push(1600);
    this.array.push(1756);
    this.array.push(1200);
    this.array.push(750);
    this.array.push(680);
    this.array.push(1200);
return this.array;
    // return Array.from(Array(nPoints)).map(() => {
   //   return Math.round(Math.random() * 500);
   // });
  }
  private getRandomDataNonPaye(nPoints: number): number[] {
    this.array = [];
    this.array.push(140);
    this.array.push(50);
    this.array.push(30);
    this.array.push(70);
    this.array.push(150);
    this.array.push(80);
    this.array.push(60);
    return this.array;
    // return Array.from(Array(nPoints)).map(() => {
    //   return Math.round(Math.random() * 500);
    // });
  }
  private getRandomDataTotal(nPoints: number): number[] {
    this.array = [];
    this.array.push(2640);
    this.array.push(1650);
    this.array.push(1786);
    this.array.push(1270);
    this.array.push(900);
    this.array.push(760);
    this.array.push(1260);
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
