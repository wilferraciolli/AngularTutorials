import {maxLength, minLength, required, Schema, schema, min, disabled} from '@angular/forms/signals';

export interface AttributeDataForm {
  name: string;
  age: number;
  beverage: Array<string>;
}

export const attributeInitialValue: AttributeDataForm = {
  name: '',
  age: 18,
  beverage: [
    'Beer',
    'Wine'
  ]
}

export const attributeSchema: Schema<AttributeDataForm> = schema<AttributeDataForm>((path) => {
  // firstName: required, 2–50 chars
  required(path.name, {message: 'Name is required'});
  minLength(path.name, 2, {message: 'Name must be at least 2 characters'});
  maxLength(path.name, 50, {message: 'Name cannot exceed 50 characters'});

  required(path.age, {message: 'Age is required'});
  min(path.age, 0, {message: 'Age must be positive'});

  // Disable beverages if under 18
  disabled(path.beverage, (ctx) => ctx.valueOf(path.age) < 18);
});
