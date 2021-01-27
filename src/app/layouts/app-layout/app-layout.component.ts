import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit {


  notificationsList : AnyNotification[];
  showDrawer: boolean = false;
  constructor(private socket: WebsocketConnection, private authStore: AuthenticationStore,private notificationService : NotificationService) {
  }

  ngOnInit(): void {
    this.authStore.value$.subscribe(s => {
      if (s) {
        this.socket.connect(s.accessToken);
      } else {
        this.socket.disconnect();
      }
    });
  }

  async onToggleNotifications() {
    // this.notificationsList = await this.notificationService.getNotifications();
    this.showDrawer = !this.showDrawer;
  }
}
