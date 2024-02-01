import {Component, Input, SkipSelf} from '@angular/core';
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class ContactComponent {
  @Input()
  public modelGroupName!: string;
}
