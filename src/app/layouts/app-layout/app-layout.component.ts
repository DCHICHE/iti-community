import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import { NotificationStore } from 'src/modules/notification/notification.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  sub?: Subscription;

  notificationsList: AnyNotification[];
  showDrawer: boolean = false;
  constructor(
    private socket: WebsocketConnection,
    private authStore: AuthenticationStore,
    private store: NotificationStore,
    private notificationService: NotificationService
  ) {
    this.store.value$.subscribe(o => {
      this.notificationsList = o.notifications;
    })
  }

  async ngOnInit() {
    this.sub = this.authStore.accessToken$.subscribe(accessToken => {
      if (accessToken) {
        this.socket.connect(accessToken);
      } else {
        this.socket.disconnect();
      }
    });
    await this.notificationService.fetch();
  }


  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  async onToggleNotifications() {
    this.showDrawer = !this.showDrawer;
    if (!this.showDrawer) {
      await this.notificationService.markAsViewed();
    }
  }
}
