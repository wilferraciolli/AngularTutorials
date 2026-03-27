import {maxLength, minLength, pattern, required, schema, validateTree, ValidationError} from '@angular/forms/signals';

export interface CrossFieldDataForm {
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
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

  // ✅ Cross-field validator: runs at the ROOT level, reads both fields
  validateTree(path, ({valueOf, fieldTreeOf}) => {
    const password = valueOf(path.password);
    const confirmPassword = valueOf(path.confirmPassword);

    // Only check if confirmPassword has a value (required handles the empty case)
    if (confirmPassword && password !== confirmPassword) {
      return {
        kind: 'passwordMismatch',
        message: 'Passwords do not match',
        fieldTree: fieldTreeOf(path.confirmPassword),  // ← targets the confirmPassword field
      };
    }

    return null;
  });
});
