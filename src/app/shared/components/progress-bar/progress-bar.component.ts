import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html'
})
export class ProgressBarComponent implements OnInit {
  firstAnimation = false;
  @Input() set value(data: number | undefined) {
    if (!this.firstAnimation)
      setTimeout(() => {
        this.setValue(data);
      }, this.delay);
    else this.setValue(data);
  }
  @Input() delay: number = 300;
  constructor() {}
  @ViewChild('circle', { static: true }) circle?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.setValue();
    // }, this.delay);
  }

  setValue(value: number | undefined): void {
    if (!this.circle || value == undefined) return;
    const val = Math.max(150, 300 - (value / 200) * 300);
    this.circle.nativeElement.style.strokeDashoffset = val + '';
    this.firstAnimation = true;
  }
}
