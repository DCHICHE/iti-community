import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationStore } from './authentication.store';
import { AuthenticationStorage } from './authentication.storage';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthenticationCommands } from './services/authentication.commands';
import { LocalAuthenticationCommands } from './services/plateform/local/LocalAuthenticationCommands';
import { NzMessageModule } from "ng-zorro-antd/message";
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    {
      provide: AuthenticationCommands,
      useClass: LocalAuthenticationCommands
    },
    AuthenticationService,
    AuthenticationStore,
    AuthenticationStorage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzMessageModule
  ]
})
export class AuthenticationModule { }
