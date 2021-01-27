import { Injectable } from "@angular/core";
import { NotificationStore } from "../notification.store";
import { NotificationCommands } from "./notification.commands";
import { NotificationQueries } from "./notification.queries";

@Injectable()
export class NotificationService {
  constructor(
    private store: NotificationStore,
    private notificationQueries: NotificationQueries,
    private notificationCommands: NotificationCommands

  ) {
    window.addEventListener('load', function () {
      Notification.requestPermission(function (status) {
      });
    });
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

}
