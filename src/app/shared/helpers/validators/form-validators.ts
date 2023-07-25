import { Validators } from '@angular/forms';

export const noWhitespaceValidator = Validators.pattern(
  '^(?!\\s*$)[a-zA-Z0-9_ ]+$'
);

export const nameValidator = Validators.compose([
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(20),
  noWhitespaceValidator,
]);

export const emailValidator = Validators.compose([
  Validators.required,
  Validators.email,
]);

export const passwordValidator = Validators.compose([
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(20),
  noWhitespaceValidator,
]);
