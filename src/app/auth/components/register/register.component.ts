import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from 'src/app/shared/validators/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', nameValidator],
      first_name: ['', nameValidator],
      last_name: ['', nameValidator],
      email: ['', emailValidator],
      password: ['', passwordValidator],
    });
  }

  public onSubmit(): void {
    if (this.form.valid)
      this.authService.register(this.form.value).subscribe((res) => {
        this.router.navigate(['/login']);
      });
    else this.form.markAllAsTouched();
  }
}
