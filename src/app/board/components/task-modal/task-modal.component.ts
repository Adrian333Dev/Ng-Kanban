import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IItem } from '../../models/item.types';
import { ICategory } from '../../models/category.types';

export interface DialogData {
  item: IItem;
  header: string;
  categories: ICategory[];
}

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}
  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
  ngOnInit() {
    this.form = this.fb.group({
      item_title: [this.data.item?.item_title ?? '', [Validators.required]],
      item_description: [this.data.item?.item_description ?? ''],
      category_id: [this.data.item?.category_id ?? ''],
    });
  }
}
