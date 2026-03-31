import {BaseSchema} from './base.schema';


export interface FlightSchema extends BaseSchema {
  schemaType: 'flight';
  from: string;
  to: string;
  date: string;
  delayed: boolean;
}


export interface AppointmentSchema extends BaseSchema {
  schemaType: 'appointment';
  name: string;
  startDate: string;
  startTime: string;
  duration: number;
}

/**
 * Comprehensive demo schema that uses all available field types
 */
export interface AllFieldsSchema extends BaseSchema {
  schemaType: 'allFields';
  username: string;           // TEXT
  password: string;           // PASSWORD
  searchQuery: string;        // SEARCH
  birthDate: string;          // DATE
  appointmentTime: string;    // TIME
  eventDateTime: string;      // DATE_TIME
  gender: string;             // RADIO (handle options separately)
  country: string;            // SELECT
  acceptTerms: boolean;       // CHECKBOX
  age: number;                // NUMBER
  satisfaction: number;       // RANGE
}

/**
 * Union type of all available schemas
 */
export type EntitySchema =
  FlightSchema
  | AppointmentSchema
  | AllFieldsSchema;
