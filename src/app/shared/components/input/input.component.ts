import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <form [formGroup]="form">
      <mat-form-field>
        <input matInput [placeholder]="label" [formControlName]="field" />
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
