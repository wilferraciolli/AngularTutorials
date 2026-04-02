import {FieldDef} from './interfaces/field-definition';
import {maxLength, minLength, required, schema, Schema} from '@angular/forms/signals';
import {BaseSchema, SchemaConfig} from './interfaces/base.schema';

/**
 * Helper function to create a type-safe schema configuration
 */
export function defineSchema<T extends BaseSchema>(config: SchemaConfig<T>): SchemaConfig<T> {
  return config;
}

/**
 * Helper function to create an empty entity with required base properties
 */
export function createEmptyEntity<T extends BaseSchema>(schemaType: T['schemaType'], defaults: Omit<T, 'id' | 'schemaType'>): T {
  return {
    id: '',
    schemaType,
    ...defaults,
  } as T;
}

/**
 * Helper method to convert form definition onto validation schema
 * Now accepts a generic type that extends BaseSchema
 */
export function toSchema<T extends  BaseSchema>(meta: FieldDef[]): Schema<T> {
  return schema<T>((path) => {
      for (const fieldDef of meta) {
        const property: string = fieldDef.name;
        const fieldPath: any = (path as any)[property];

        if (!fieldPath) {
          continue;
        }

        if (fieldDef.required) {
          required(fieldPath, { message: `${fieldDef.label} is required` });
        }
        if (typeof fieldDef.minLength !== 'undefined') {
          minLength(fieldPath, fieldDef.minLength, { message: `${fieldDef.label} must be at least ${fieldDef.minLength} characters` });
        }
        if (typeof fieldDef.maxLength !== 'undefined') {
          maxLength(fieldPath, fieldDef.maxLength, { message: `${fieldDef.label} cannot exceed ${fieldDef.maxLength} characters` });
        }
      }
    }
  );
}
