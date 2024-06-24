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
  }


}
