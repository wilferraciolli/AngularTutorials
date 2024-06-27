import { FormControl } from "@angular/forms";
import { DateTime } from 'luxon';

export interface DateTimeForm {
  businessDate: FormControl<DateTime>;
  businessTime: FormControl<DateTime>;
  dateTime: FormControl<DateTime>;
}
