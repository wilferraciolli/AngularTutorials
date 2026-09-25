export const UTC_DATE_TIME_FORMAT: string = 'YYYY-MM-DDThh:mm:ssZ';

export const UTC_DATE_TIME_FIELD_TYPE: string = 'datetime-local';
export const UTC_DATE_TIME_LABEL: string = 'Enter date and time';

export const UTC_DATE_TIME_REQUIRED_ERROR_LABEL: string = 'This field is required.';
export const UTC_DATE_TIME_INVALID_ERROR_LABEL: string = 'The value is not a valid UTC date and time.';
export const UTC_DATE_TIME_MIN_ERROR_LABEL: string = 'Date Time cannot be before ';
export const UTC_DATE_TIME_MAX_ERROR_LABEL: string = 'Date Time cannot be after ';

/** Which instant to pick when a wall-clock time happens twice (clocks going back). */
export type UtcDateTimeDisambiguation = 'earlier' | 'later';
