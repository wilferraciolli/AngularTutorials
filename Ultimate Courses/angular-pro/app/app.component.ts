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
      </div>
    </div>
  `
})
export class AppComponent {

}
