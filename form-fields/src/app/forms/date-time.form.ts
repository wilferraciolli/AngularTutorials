import {FormControl} from "@angular/forms";

export interface DateTimeForm {
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  dateTime: FormControl<string | null>;
}
