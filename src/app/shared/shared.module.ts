import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { InputComponent } from './components/input/input.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DotMenuComponent } from './components/dot-menu/dot-menu.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PromptModalComponent } from './components/prompt-modal/prompt-modal.component';

const components = [
  InputComponent,
  NavbarComponent,
  DotMenuComponent,
  DropdownComponent,
  PromptModalComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ...components,
  ],
})
export class SharedModule {}
