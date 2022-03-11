import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalComponent implements OnInit {
  title = 'Mentions légales';

  constructor() {}

  ngOnInit(): void {}
}
