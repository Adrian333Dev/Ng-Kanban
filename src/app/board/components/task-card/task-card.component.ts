import { Component, Input } from '@angular/core';
import { IItem } from '../../models/item.types';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: Partial<IItem>;
}
