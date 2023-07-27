import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  declarations: [UserComponent, UserDetailsComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
