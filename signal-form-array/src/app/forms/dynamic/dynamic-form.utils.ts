import {FieldDef} from './interfaces/field-definition';
import {maxLength, minLength, required, schema, Schema} from '@angular/forms/signals';

// Helper method to convert form definition onto validation schema
export function toSchema(meta: FieldDef[]): Schema<unknown> {
  return schema<unknown>((path) => {
      for (const fieldDef of meta) {
        const property: string = fieldDef.name;
        const fieldPath: any = (path as any)[property];

        if (!fieldPath) {
          continue;
        }

        if (fieldDef.required) {
          required(fieldPath);
        }
        if (typeof fieldDef.minLength !== 'undefined') {
          minLength(fieldPath, fieldDef.minLength);
        }
        if (typeof fieldDef.maxLength !== 'undefined') {
          maxLength(fieldPath, fieldDef.maxLength);
        }
      }
    }
  );
}
