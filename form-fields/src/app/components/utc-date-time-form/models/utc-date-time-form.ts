
// form data type
import {maxLength, minLength, PathKind, required, schema, SchemaPathTree} from "@angular/forms/signals";
import Root = PathKind.Root;

export interface UTCDateTimeForm {
  selectedTimezone: string,
  appointment: string
}

// form initial state
export const initialState: UTCDateTimeForm = {
  selectedTimezone: 'Europe/London',
  appointment: '2024-05-01T09:00:00Z'
}

// form validation
export const utcDateTimeFormSchema = schema<UTCDateTimeForm>((path: SchemaPathTree<UTCDateTimeForm, Root>): void => {
  required(path.selectedTimezone, {message: 'Timezone is required'});
  minLength(path.selectedTimezone, 2, {message: 'Timezone is required'});
  maxLength(path.selectedTimezone, 50, {message: 'Timezone is required'});

});
