import { Injectable } from "@angular/core";
import { NotificationStore } from "../notification.store";
import { NotificationCommands } from "./notification.commands";
import { NotificationQueries } from "./notification.queries";
import { NotificationSocketService } from './notification.socket.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { PostService } from 'src/modules/feed/services/post.service';

@Injectable()
export class NotificationService {
  constructor(
    private store: NotificationStore,
    private notificationQueries: NotificationQueries,
    private notificationCommands: NotificationCommands,
    private notificationSocketService: NotificationSocketService,
    private nzNotificationService: NzNotificationService,
    private router: Router,
    private postService: PostService

  ) {

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
        var notificationOutWeb = new Notification(notifTitle);
        notificationOutWeb.addEventListener('click', (ev) => {
          window.focus();
          if (notif.subject === "room_added") {
            this.router.navigate(["app", notif.payload.room.id]);
          } else if (notif.subject === "post_liked") {
            this.postService.setIdToRedirect(notif.payload.postId);
            this.router.navigate(["app", notif.payload.roomId]);
          }
        })
      }

      this.store.appendNotification(notif);
    })
  }

  async fetch() {
    const notifications = await this.notificationQueries.getNotifications();
    this.store.mutate(s => {
      return {
        ...s,
        notifications
      }
    });
  }

  async markAsViewed() {
    await this.notificationCommands.view();
    await this.fetch();
  }

  requestPermission(){
    Notification.requestPermission(function (status) {
    });
  }

}
