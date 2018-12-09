import {Component} from '@angular/core';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent {
  progressInfoData = [
    {
      title: 'Total Vente Aujourdui',
      value: 572900,
      activeProgress: 70,
      description: 'Mieux que hier (70%)',
    },
    {
      title: 'Demandes de Reparation Aujourdui',
      value: 6378,
      activeProgress: 30,
      description: 'Mieux que hier (70%)',
    },
    {
      title: 'Total Gain de Reparation Aujourdui ',
      value: 200,
      activeProgress: 55,
      description: 'Mieux que hier (70%)',
    },
  ];
}
