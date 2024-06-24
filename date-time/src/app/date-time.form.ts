import { FormControl } from "@angular/forms";

export interface DateTimeForm {
  date: FormControl<string>;
  time: FormControl<string>;
  dateTime: FormControl<string>;
}
