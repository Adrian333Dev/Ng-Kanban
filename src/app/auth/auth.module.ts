import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AuthRoutingModule } from './auth-routing.module'; // ! Remove this line
import { RegisterComponent } from './components/register/register.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LogInComponent, RegisterComponent, AuthComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}
