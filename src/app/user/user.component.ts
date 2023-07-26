import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserResponse } from './models/user.types';
import { UserService } from '../core/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit {
  public users = new BehaviorSubject<UserResponse[]>([]);
  public dataSource = new MatTableDataSource<UserResponse>();
  public selection = new SelectionModel<UserResponse>(true, []);
  private unSub = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['select', 'id', 'username'];

  constructor(private userService: UserService) {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  ngOnInit(): void {
    this.userService
      .onUsersChange()
      .pipe(takeUntil(this.unSub))
      .subscribe((users) => {
        this.users.next(users);
      });

    this.userService.list().subscribe((users) => {
      this.userService.setUsers(users);
      this.dataSource.data = users;
    });
  }

  test(args: any) {
    console.log(args);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
