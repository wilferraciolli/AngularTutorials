import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['app.component.scss'],
  template: `
    <div>
      <div>
        <label>
          Credit Card Number
          <input
            name="credit-card"
            type="text"
            placeholder="Enter your 16-digit card number"
            credit-card>
        </label>

        <!-- Create a reference to the directive that is ExportedAs tooltip and assing it to the label, so the methods can now be invoked -->
        <label tooltip="3 digits, back of your card"
               #myTooltip="tooltip">
          Enter your security code
          <span
            (mouseover)="myTooltip.show()"
            (mouseout)="myTooltip.hide()">
            (?)
          </span>
          <input type="text">
        </label>
      </div>
    </div>
  `
})
export class AppComponent {

}
