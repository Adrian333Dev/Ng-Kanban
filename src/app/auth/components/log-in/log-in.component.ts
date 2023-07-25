import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import {
  nameValidator,
  passwordValidator,
} from 'src/app/shared/helpers/validators/form-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', nameValidator],
      password: ['', passwordValidator],
    });
  }

  public onSubmit(): void {
    if (this.form.valid)
      this.authService.login(this.form.value).subscribe((res) => {
        console.log('Login res: ', res);
        this.router.navigate(['/']);
      });
    else this.form.markAllAsTouched();
  }
}
