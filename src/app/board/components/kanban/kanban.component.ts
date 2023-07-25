import { mockData } from './../../constants';
import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {
  public categoryForm: FormGroup;
  public creatingCategory = false;
  data = mockData;

  constructor(private fb: FormBuilder) {}

  onDrop(event: CdkDragDrop<Partial<any>[]>) {
    console.log('onDrop', event);
  }

  onCardDrop(event: CdkDragDrop<any[]>, category: any) {
    console.log('onCardDrop', category);
  }

  onSubmitCategory() {
    if (this.categoryForm.valid) {
      console.log('onSubmitCategory', this.categoryForm.value);
      this.categoryForm.reset();
      this.creatingCategory = false;
    } else this.categoryForm.markAllAsTouched();
  }

  onCancelCategory() {
    this.categoryForm.reset();
    this.creatingCategory = false;
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category_title: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
}
