import {FormFieldType} from '../form-field.constant';


export interface FieldOption {
  label: string;
  value: string | number | boolean;
}

export interface FieldDef {
  name: string;
  type: FormFieldType;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: FieldOption[];  // For radio buttons and select dropdowns
}
