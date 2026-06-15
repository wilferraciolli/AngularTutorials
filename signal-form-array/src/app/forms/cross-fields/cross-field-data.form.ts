import {maxLength, minLength, pattern, required, schema, validateTree, ValidationError} from '@angular/forms/signals';

export interface CrossFieldDataForm {
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
}

function calculateAge(isoDate: string): number {
  const today: Date = new Date();
  const dob: Date = new Date(isoDate + 'T00:00:00');

  let age: number = today.getFullYear() - dob.getFullYear();

  // If birthday hasn't occurred yet this year, subtract one year
  const hasBirthdayPassed: boolean =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasBirthdayPassed) age--;

  return age;
}

export const crossFieldSchema = schema<CrossFieldDataForm>((path) => {
  required(path.username, {message: 'Username is required'});
  minLength(path.username, 2, {message: 'Username must be at least 2 characters'});
  maxLength(path.username, 50, {message: 'Username cannot exceed 50 characters'});

  required(path.password, {message: 'Password is required'});
  minLength(path.password, 8, {message: 'Password must be at least 8 characters'});
  maxLength(path.password, 20, {message: 'Password cannot exceed 20 characters'});
  pattern(path.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, {
    message: 'Password must have lower and uppercase, number(s) and special character(s)'
  });

  required(path.confirmPassword, {message: 'Confirm password is required'});
  minLength(path.confirmPassword, 8, {message: 'Confirm password must be at least 8 characters'});
  maxLength(path.confirmPassword, 20, {message: 'Confirm password cannot exceed 20 characters'});

  required(path.dateOfBirth, {message: 'Date of birth is required'});

  // Cross-field validator: runs at the ROOT level, reads both fields
  validateTree(path, ({valueOf, fieldTreeOf}) => {
    const errors: ValidationError.WithOptionalFieldTree[] = [];

    // password matches
    const password: string = valueOf(path.password);
    const confirmPassword: string = valueOf(path.confirmPassword);

    // 1 - Only check if confirmPassword has a value (required handles the empty case)
    if (confirmPassword && password !== confirmPassword) {
      errors.push(
        {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
          fieldTree: fieldTreeOf(path.confirmPassword),  // ← targets the confirmPassword field
        });
    }

    // 2. Minimum age (18)
    const dateOfBirth = valueOf(path.dateOfBirth);

    if (dateOfBirth) {
      const age = calculateAge(dateOfBirth);
      if (age < 18) {
        errors.push({
          kind: 'minAge',
          message: `You must be at least 18 years old (age: ${age})`,
          fieldTree: fieldTreeOf(path.dateOfBirth),
        });
      }
    }

    return errors.length > 0
      ? errors
      : null;
  });
});
