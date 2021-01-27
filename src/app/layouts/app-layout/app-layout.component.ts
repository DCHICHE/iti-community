import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import { NotificationStore } from 'src/modules/notification/notification.store';
import { NotificationSocketService } from 'src/modules/notification/services/notification.socket.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
    private notificationService: NotificationService,
    private notificationSocketService: NotificationSocketService,
    private nzNotificationService: NzNotificationService
  ) {
    this.store.value$.subscribe(o => {
      this.notificationsList = o.notifications;
    })

    this.notificationSocketService.onNewNotification(notif => {
      var notifTitle = "";
      if (notif.subject === "post_liked") {
        notifTitle = notif.payload.user.username + " a liké votre post :"
        this.nzNotificationService.info(
          notifTitle,
          notif.payload.preview
        )
      } else if (notif.subject === "room_added") {
        notifTitle = notif.payload.user.username + " a ajouté une nouvelle salle : "
        this.nzNotificationService.info(
          notifTitle,
          notif.payload.room.name
        )
      } else if (notif.subject === "new_user") {
        notifTitle = notif.payload.user.username + "join the battle ! "
        this.nzNotificationService.info(
          notifTitle,
          "")
      }

      if (document.visibilityState === 'hidden') {
        new Notification(notifTitle);
      }

      this.store.appendNotification(notif);
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
