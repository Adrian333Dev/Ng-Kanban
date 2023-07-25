import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UpdateComponent } from './components/update/update.component';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UpdateComponent, UserComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
