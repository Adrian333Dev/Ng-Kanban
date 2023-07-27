import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IItem } from '../../models/item.types';
import { ICategory } from '../../models/category.types';
import { TaskModalMode } from 'src/app/shared/models/maps/modal-modes.map';
import { BsModalService } from 'src/app/shared/services/bs-modal.service';
import { Actions } from 'src/app/shared/models/maps/crud.map';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  @Output() onSubmitted = new EventEmitter<{
    action: Actions;
    task: unknown;
  }>();
  public header: string = 'Add Task';
  public task: IItem = {} as IItem;
  public categories: ICategory[] = [];
  public mode: TaskModalMode = 'create';

  public form: FormGroup;

  public dropdownFields = {
    value: 'id',
    text: 'category_title',
  } as any;

  public get category_title() {
    return this.categories.find(
      (category) => category.id === this.form.value.category_id
    )?.category_title;
  }

  constructor(
    protected modalService: BsModalService,
    private fb: FormBuilder
  ) {}

  open(): void {
    this.modalService.open('task-action-modal');
    this.initForm();
  }

  close(): void {
    this.modalService.close();
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.onSubmitted.emit({
      action: this.mode,
      task: { ...this.task, ...this.form.value },
    });
    this.close();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const { item_title, item_description, category_id } = this.task;
    this.form = this.fb.group({
      item_title: [item_title, Validators.required],
      item_description,
      category_id: [category_id, Validators.required],
    });
  }
}
