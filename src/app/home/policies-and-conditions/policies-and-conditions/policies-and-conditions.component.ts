import { Component, OnInit } from '@angular/core';
import { PreloadService } from 'src/app/shared/services/preload.service';

@Component({
  selector: 'policies-and-conditions',
  templateUrl: './policies-and-conditions.component.html',
  styleUrls: ['./policies-and-conditions.component.scss']
})
export class PoliciesAndConditionsComponent implements OnInit {
  title = 'Conditions et politiques';
  list_routes = [
    { route: 'cgu', title: 'Conditions générales d’utilisation' },
    { route: 'privacy', title: 'Politique de confidentialité' },
    { route: 'cookies', title: 'Gestion de cookies' },
    { route: 'legal', title: 'Mentions légales' }
  ];
  constructor(private preloadService: PreloadService) {}

  ngOnInit(): void {}

  isdefaultRouteActive(): { isDefault: boolean } {
    return { isDefault: this.list_routes.every((li) => window.location.href.indexOf('policies/' + li.route) == -1) };
  }

  startPreload(pModule: string) {
    this.preloadService.startpreload(pModule);
  }
}
