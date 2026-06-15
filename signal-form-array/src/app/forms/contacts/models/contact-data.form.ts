import {email, maxLength, minLength, pattern, required, schema} from '@angular/forms/signals';

export interface ContactDataForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}


export const contactSchema = schema<ContactDataForm>((path) => {
  // firstName: required, 2–50 chars
  required(path.firstName, { message: 'First name is required' });
  minLength(path.firstName, 2, { message: 'First name must be at least 2 characters' });
  maxLength(path.firstName, 50, { message: 'First name cannot exceed 50 characters' });

  // lastName: required, 2–50 chars
  required(path.lastName, { message: 'Last name is required' });
  minLength(path.lastName, 2, { message: 'Last name must be at least 2 characters' });
  maxLength(path.lastName, 50, { message: 'Last name cannot exceed 50 characters' });

  // email: required + email format
  required(path.email, { message: 'Email is required' });
  email(path.email, { message: 'Please enter a valid email address' });

  // phone: optional, but if provided must match E.164-ish pattern
  pattern(path.phone, /^(\+?[\d\s\-().]{7,15})?$/, {
    message: 'Please enter a valid phone number'
  });
});
