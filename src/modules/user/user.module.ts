import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UserWidgetComponent } from './components/user-widget/user-widget.component';
import { UserProfileModalComponent } from './components/user-profile-modal/user-profile-modal.component';
import { UserService } from './services/user.service';
import { UserQueries } from './services/user.queries';
import { LocalUserQueries } from './services/platform/local/user.queries.local';
import { UserStore } from './user.store';
import { UserCommands } from './services/user.commands';
import { LocalUserCommands } from './services/platform/local/user.commands.local';
import { HttpUserQueries } from './services/platform/http/user.queries.http';
import { HttpUserCommands } from './services/platform/http/user.commands.http';
import { NotificationModule } from '../notification/notification.module';

@NgModule({
  declarations: [UserRegistrationComponent, UserWidgetComponent, UserProfileModalComponent],
  exports: [UserRegistrationComponent, UserWidgetComponent],
  providers: [
    UserService,
    UserStore,
    {
      provide: UserQueries,
      useClass: HttpUserQueries
    },
    {
      provide: UserCommands,
      useClass: HttpUserCommands
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzBadgeModule,
    NzUploadModule,
    NotificationModule
  ]
})
export class UserModule { }
