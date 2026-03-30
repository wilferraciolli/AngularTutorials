export interface FieldDef {
  name: string;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  type?: string;
}
