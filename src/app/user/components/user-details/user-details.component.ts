import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IUser } from '../../models/user.types';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user: IUser;
  private unSub = new Subject<void>();

  // Get user id from route
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get user id from route then get user from service
    // this.route.params
    //   .pipe(takeUntil(this.unSub))
    //   .subscribe((params) =>
    //     this.userService
    //       .get(params['id'])
    //       .subscribe((user) => (this.user = user))
    //   );
  }

  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }
}
