/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {AppService} from './app.service';
import {Router} from '@angular/router';
import {NbMenuService} from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService) {
    this.analytics.trackPageViews();
  }

  ngOnInit(): void {}
    /*
if (!this.appService.authenticated) {
  this.router.navigateByUrl('/auth/login');
}else {
  this.router.navigateByUrl('/pages');
}

    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection();
      });


  }
  onContecxtItemSelection()
  {
    //this.router.navigateByUrl('/auth/login');
  }*/





}
