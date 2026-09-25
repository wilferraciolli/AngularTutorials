export interface TimeZone {
  id: string;
  value: string;
}

export const TIMEZONES: TimeZone[] = [
  { id: 'Europe/London', value: 'London' },
  { id: 'Asia/Nicosia', value: 'Nicosia' },
  { id: 'Europe/Athens', value: 'Athens' },
  { id: 'America/Sao_Paulo', value: 'Sao Paulo' },
  { id: 'Asia/Kolkata', value: 'Kolkata (UTC+05:30)' },
  { id: 'Australia/Lord_Howe', value: 'Lord Howe (30 min DST)' }
];
