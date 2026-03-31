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
 * Union type of all available schemas
 */
export type EntitySchema =
  FlightSchema
  | AppointmentSchema;
