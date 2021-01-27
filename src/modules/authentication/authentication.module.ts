import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationStore } from './authentication.store';
import { AuthenticationStorage } from './authentication.storage';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthenticationCommands } from './services/authentication.commands';
import { NzMessageModule } from "ng-zorro-antd/message";
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthenticationCommands } from './services/plateform/http/authentication.commands.http';
import { AuthenticationInterceptor } from './authentication.interceptor';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: AuthenticationCommands,
      useClass: HttpAuthenticationCommands
    },
    AuthenticationService,
    AuthenticationStore,
    AuthenticationStorage,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzMessageModule
  ]
})
export class AuthenticationModule { }
