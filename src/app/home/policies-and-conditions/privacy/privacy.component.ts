import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyComponent implements OnInit {
  title = 'Politique de confidentialité';
  constructor() {}

  ngOnInit(): void {}
}
