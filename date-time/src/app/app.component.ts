import { Component } from '@angular/core';
import { DateTimeService } from "./date-time.service";
import { FormBuilderService } from "./form-builder.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'date-time';

  constructor(public dateTimeService: DateTimeService,
              public formBuilder: FormBuilderService) {
    this.formBuilder.populateFormValues();
  }


  public submitForm(): void {
    // console.log('Submitting form ', this.formBuilder.getFormValueBeforeParsing());
    // console.log('Submitting form ', this.formBuilder.getFormValuePArsed());

    let value = this.formBuilder.businessDate.value;
    this.dateTimeService.getDateTime(value);
    // this.dateTimeService.getDateTime(`${this.formBuilder.date.value}${this.formBuilder.time.value}`);
    // this.dateTimeService.getDateTime(this.formBuilder.dateTime.value);
  }
}
