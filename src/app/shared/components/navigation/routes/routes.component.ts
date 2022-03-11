import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Route_Link } from 'src/app/shared/models/models';
import { User_Model } from 'src/app/shared/store/user/user.model';

@Component({
  selector: 'routes',
  template: `<route-link *ngFor="let route of links" [link]="route"></route-link>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutesComponent implements OnInit {
  @Input() user: User_Model = {} as User_Model;
  links: Route_Link[] = [];

  constructor() {}
  ngOnInit() {
    this.links = [
      {
        title: 'Accueil',
        route: 'dashboard',
        src: 'home'
      }
    ];

    this.links.push({
      title: 'Paramètres',
      route: 'settings',
      src: 'settings'
    });
  }
}
