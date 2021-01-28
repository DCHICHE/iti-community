import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationStore } from './notification.store';
import { NotificationService } from './services/notification.service';
import { NotificationQueries } from './services/notification.queries';
import { NotificationComponent } from './components/notification/notification.component';
import { HttpNotificationQueries } from './services/platform/http/notification.queries.http';
import { NotificationCommands } from './services/notification.commands';
import { HttpNotificationCommands } from './services/platform/http/notification.commands.http';
import { NotificationSocketService } from './services/notification.socket.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NotificationWebService } from './services/notification.web.service';

@NgModule({
  providers: [NotificationStore, NotificationService,NotificationWebService,
    {
      provide: NotificationQueries,
      useClass: HttpNotificationQueries
    }, {
      provide: NotificationCommands,
      useClass: HttpNotificationCommands
    }, NotificationSocketService],
  imports: [
    CommonModule,
    NzMessageModule
  ],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})
export class NotificationModule { }
