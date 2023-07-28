import { Component, EventEmitter, Output } from '@angular/core';
import { ICategory, UpdateCategory } from '../../models/category.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'src/app/shared/services/bs-modal.service';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
})
export class EditCategoryModalComponent {
  @Output() onSubmitted = new EventEmitter<{
    category: UpdateCategory;
    fromIdx: number;
    toIdx: number;
  }>();
  public category: ICategory = {} as ICategory;
  public order: number;
  public max: number;
  public form: FormGroup;

  constructor(
    protected modalService: BsModalService,
    private fb: FormBuilder
  ) {}

  open(): void {
    this.modalService.open('edit-category-modal');
    this.initForm();
  }

  close(): void {
    this.modalService.close();
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) return this.form.markAllAsTouched();
    const { category_title, order_id } = this.form.value;
    const { category_id, id } = this.category;
    this.onSubmitted.emit({
      category: { id, category_title, order_id },
      fromIdx: this.category.order_id,
      toIdx: order_id,
    });
    this.close();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const { category_title, order_id } = this.category;
    this.form = this.fb.group({
      category_title: [category_title, Validators.required],
      order_id: [
        order_id,
        [Validators.required, Validators.min(1), Validators.max(this.max)],
      ],
    });
  }
}
