import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValuesOf } from '../../models/helpers';

export const InptWidth = {
  full: 'w-100',
  default: '',
  'w-25': 'w-25',
  'w-50': 'w-50',
  'w-75': 'w-75',
} as const;

export type InptWidth = ValuesOf<typeof InptWidth>;

@Component({
  selector: 'app-input',
  template: `
    <form [formGroup]="form">
      <mat-form-field [class]="width">
        <mat-label>{{ label }}</mat-label>
        <input
          matInput
          [formControlName]="field"
          [type]="type"
          [placeholder]="placeholder"
        />
        <mat-error *ngIf="invalid">{{ message }}</mat-error>
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  reactForm: FormGroup;
  @Input() field: string;
  @Input() form: FormGroup;

  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() width: InptWidth = 'w-100';

  get fcn() {
    return this.form?.get(this.field);
  }

  private getMessage(type: string, params?: any) {
    const messages = {
      required: 'This field is required',
      minlength: `The minimum length is ${params.requiredLength} characters`,
      maxlength: `The maximum length is ${params.requiredLength} characters`,
      email: 'Invalid email',
      pattern: 'Invalid pattern',
      password:
        'This field must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      name: 'This field must be at least 2 characters long and contain only letters',
      username:
        'This field must be at least 2 characters long and contain only letters, numbers, and underscores',
      mismatch: 'This field must match the password field',
      unique: 'This field must be unique',
      server: params,
    } as const;
    return messages[type];
  }

  get message() {
    if (this.fcn?.errors)
      return Object.keys(this.fcn?.errors)
        .map((keyError) =>
          this.getMessage(keyError, this.fcn?.errors?.[keyError])
        )
        .join(' ');
    return null;
  }

  get invalid() {
    return this.fcn?.invalid && (this.fcn?.dirty || this.fcn?.touched);
  }
}
