import {maxLength, minLength, PathKind, required, Schema, schema, SchemaPathTree} from '@angular/forms/signals';


export interface ArrayDataForm {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumbers: Array<string>;
}

export const initialState: ArrayDataForm = {
  id: '',
  firstName: '',
  lastName: '',
  phoneNumbers: [
    '9761 3093'
  ],
}

export const arrayDataSchema: Schema<ArrayDataForm> = schema<ArrayDataForm>((path: SchemaPathTree<ArrayDataForm>) => {
  required(path.firstName, {message: 'First name is required'});
  minLength(path.firstName, 2, {message: 'First name must be at least 2 characters'});
  maxLength(path.firstName, 50, {message: 'First name cannot exceed 50 characters'});

  // lastName: required, 2–50 chars
  required(path.lastName, {message: 'Last name is required'});
  minLength(path.lastName, 2, {message: 'Last name must be at least 2 characters'});
  maxLength(path.lastName, 50, {message: 'Last name cannot exceed 50 characters'});
});
