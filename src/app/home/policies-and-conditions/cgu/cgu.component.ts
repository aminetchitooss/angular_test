import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CguComponent implements OnInit {
  title = 'Conditions générales d’utilisation';
  constructor() {}

  ngOnInit(): void {}
}
