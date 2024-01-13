import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-from-event',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule],
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent implements OnInit {

  @ViewChild('validate')
  public validate!: ElementRef;

  public buttonEvent: string = '';
  // public buttonHover: string = '';

  public ngOnInit(): void {
  }

  public createObservable() {
    // this allows to subscribe to any event the button may have Eg hover, click...
    const buttonClickObservable$:Observable<any> = fromEvent(this.validate.nativeElement, 'click');
    const buttonHoverObservable$:Observable<any> = fromEvent(this.validate.nativeElement, 'mouseover');

    buttonClickObservable$.subscribe((data : any) => {
      this.buttonEvent = `The event is of type ${data.type}`;
      // console.log(data);
    });

    buttonHoverObservable$.subscribe((data : any) => {
      this.buttonEvent = `The event is of type ${data.type}`;
      // console.log(data);
    });
  }
}
