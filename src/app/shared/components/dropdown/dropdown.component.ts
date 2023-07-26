import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  template: `
    <form [formGroup]="form">
      <mat-form-field>
        <mat-label>{{ label }}</mat-label>
        <mat-select [formControlName]="field">
          <mat-option *ngFor="let item of data" [value]="item[fields.value]">
            {{ item[fields.text] }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-error *ngIf="this.fcn.hasError('required')"
        >{{ label }} is required</mat-error
      >
    </form>
  `,
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  reactForm: FormGroup;
  @Input() data: any[];
  @Input() field: string;
  @Input() form: FormGroup;
  @Input() label: string;
  @Input() fields: { value: string; text: string } = {} as any;

  get fcn() {
    return this.form.get(this.field);
  }
}
