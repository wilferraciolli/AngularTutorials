import {FieldDef} from './field-definition';

/**
 * Base schema interface that all entity schemas must extend.
 * Ensures every entity has an id and schemaType.
 */
export interface BaseSchema {
  id: string;
  schemaType: string;
}

/**
 * Type-safe schema configuration that links entity type with field definitions
 */
export interface SchemaConfig<T extends BaseSchema> {
  schemaType: T['schemaType'];
  fields: FieldDef[];
  initialValue: T;
}
