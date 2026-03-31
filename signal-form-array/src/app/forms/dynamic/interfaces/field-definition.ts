import {FormFieldType} from '../form-field.constant';

export interface FieldDef {
  name: string;
  type: FormFieldType;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}
