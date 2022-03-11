import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookiesComponent implements OnInit {
  title = 'Gestion de cookies';

  constructor() {}

  ngOnInit(): void {}
}
