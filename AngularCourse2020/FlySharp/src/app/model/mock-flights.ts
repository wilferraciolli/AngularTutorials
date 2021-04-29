import { Flight } from './flight';
export const FLIGHTS: Flight[] = [
    {id: 11, flightNumber : 'FS1298', origin: 'LAX', destination : 'LHR', departDay : 'Monday',
    departTime : '09:00', arriveDay : 'Monday', arriveTime : '09:00', price : 199.99},
    {id: 12, flightNumber : 'FS1201', origin: 'LAX', destination : 'LHR', departDay : 'Tuesday',
    departTime : '09:00', arriveDay : 'Monday', arriveTime : '09:00', price : 499.99},
    {id: 13, flightNumber : 'FS1211', origin: 'LHR', destination : 'ARN', departDay : 'Wednesday',
    departTime : '09:00', arriveDay : 'Monday', arriveTime : '09:00', price : 399.99},
  {id: 13, flightNumber : 'FS2211', origin: 'LHR', destination : 'NRT', departDay : 'Wednesday',
    departTime : '09:00', arriveDay : 'Monday', arriveTime : '09:00', price : 999.99},
  {id: 13, flightNumber : 'FS2211', origin: 'NRT', destination : 'LHR', departDay : 'Thursday',
    departTime : '09:00', arriveDay : 'Monday', arriveTime : '09:00', price : 699.99},
];


export const MYFLIGHTS: Flight[] = [
    {id: 11, flightNumber : 'FS1298', origin: 'LAX', destination : 'LHR', departDay : 'Thursday',
     departTime : '09:00', arriveDay : 'Monday', arriveTime : '09:00', price : 99.99},
    {id: 12, flightNumber : 'FS1201', origin: 'LAX', destination : 'LHR', departDay : 'Friday',
     departTime : '09:00', arriveDay : 'Monday', arriveTime : '09:00', price : 99.99},
];

/*
export interface Flight{
  id : number;
  flightNumber : string;
  origin : string;
  destination : string;
  departDay : string;
  departTime : string;
  arriveDay : string;
  arriveTime : string;
  price : number;
}
*/
