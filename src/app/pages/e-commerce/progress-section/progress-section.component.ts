import {Component} from '@angular/core';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent {
  progressInfoData = [
    {
      title: 'Demandes de Reparation Aujourdui',
      value: 5,
      activeProgress: 30,
      description: 'Mieux que hier (3 demandes)',
    },
    {
      title: 'Total Gain de Reparation Aujourdui ',
      value: 430,
      activeProgress: 40,
      description: 'Mieux que hier (270)',
    },
  ];
}
