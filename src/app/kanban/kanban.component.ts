import { Component, OnInit } from '@angular/core';
import { CatergoryService } from '../core/services/catergory.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit {
  constructor(private categoryService: CatergoryService) { }

  ngOnInit(): void {
    this.categoryService.list().subscribe((res) => {
      console.log(res);
    });
  }
}
