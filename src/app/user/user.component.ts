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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit {
  public users = new BehaviorSubject<UserResponse[]>([]);
  public dataSource = new MatTableDataSource<UserResponse>();
  private unSub = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'username'];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  onRowClick(row: UserResponse) {
    this.router.navigate([row.id], { relativeTo: this.route });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unSub.next();
    this.unSub.complete();
  }
}
