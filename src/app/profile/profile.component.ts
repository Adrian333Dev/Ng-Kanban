import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../user/models/user.types';
import { UserService } from '../core/services/user.service';
import { SettingsService } from '../core/services/settings.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '../shared/validators/form-validators';
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
      // username: [this.user?.username || '', nameValidator],
      first_name: [this.user?.first_name || '', nameValidator],
      last_name: [this.user?.last_name || '', nameValidator],
      email: [this.user?.email || '', emailValidator],
    });
  }

  public initPasswordForm(): void {
    this.passwordForm = this.fb.group({
      password: ['', passwordValidator],
      confirm_password: ['', passwordValidator],
    });
  }

  public submitDetailsForm(): void {
    if (!this.detailsForm.valid) {
      this.detailsForm.markAllAsTouched();
      return;
    }
    const user = {
      ...this.user,
      ...this.detailsForm.value,
    };
    this.userService.update(this.user.id, user).subscribe((res) => {
      // this.settingsService.setCurrentUser(res);
      this.authService.logout();
    });
  }

  public submitPasswordForm(): void {
    if (!this.passwordForm.valid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    const password = this.passwordForm.get('password').value;
    if (password !== this.passwordForm.get('confirm_password').value)
      alert('Passwords do not match');
    else
      this.userService
        .changePassword(this.user.id, {
          password,
          username: this.user.username,
          id: this.user.id,
        })
        .subscribe((res) => {
          this.authService.logout();
        });
  }

  public handleDeleteAccount(): void {
    const confirmed = confirm('Are you sure you want to delete your account?');
    if (confirmed) {
      this.userService.delete(this.user.id).subscribe((res) => {
        this.authService.logout();
      });
    }
  }

  public handleLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }
}
