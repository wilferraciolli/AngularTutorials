import {Component, Input, SkipSelf} from '@angular/core';
import {ControlContainer} from "@angular/forms";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class AddressComponent {
  @Input()
  public modelGroupName!: string;
}
