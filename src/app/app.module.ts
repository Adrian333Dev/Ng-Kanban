import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { authInterceptorProvider } from './core/interceptors/auth.interceptor';
import { BoardModule } from './board/board.module';
import { errorInterceptorProvider } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserModule,
    AuthModule,
    BoardModule,
  ],
  providers: [authInterceptorProvider, errorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
