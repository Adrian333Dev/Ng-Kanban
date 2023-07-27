import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../user/models/user.types';
import { UserService } from '../core/services/user.service';
import { SettingsService } from '../core/services/settings.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../shared/helpers/validators/form-validators';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: IUser;
  private unSub = new Subject<void>();

  public detailsForm: FormGroup;
  public passwordForm: FormGroup;

  constructor(
    private userService: UserService,
    private settingsService: SettingsService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initPasswordForm();
    this.settingsService
      .onCurrentUserChange()
      .pipe(takeUntil(this.unSub))
      .subscribe((user) => {
        this.user = user;
        this.initEditForm();
      });
  }

  public initEditForm(): void {
    this.detailsForm = this.fb.group({
      first_name: [this.user?.first_name || '', nameValidator],
      last_name: [this.user?.last_name || '', nameValidator],
      email: [this.user?.email || '', emailValidator],
      username: [this.user?.username || '', nameValidator],
    });
  }

  public initPasswordForm(): void {
    this.passwordForm = this.fb.group({
      password: ['', passwordValidator],
      confirm_password: ['', passwordValidator],
    });
  }

  public submitDetailsForm(): void {
    if (this.detailsForm.valid) {
      const user = {
        id: this.user.id,
        ...this.detailsForm.value,
      } as IUser;
      this.userService.update(this.user.id, user).subscribe((res) => {
        this.authService.logout();
      });
    } else this.detailsForm.markAllAsTouched();
  }

  public submitPasswordForm(): void {}

  public handleDeleteAccount(): void {
    this.userService.delete(this.user.id).subscribe((res) => {
      this.authService.logout();
    });
  }

  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }
}
