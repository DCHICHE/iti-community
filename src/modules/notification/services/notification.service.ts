import { Injectable } from "@angular/core";
import { NotificationStore } from "../notification.store";
import { NotificationQueries } from './notification.queries';
import { AnyNotification } from '../notification.model';

@Injectable()
export class NotificationService {
    constructor(
      private store: NotificationStore,
      private notificationQueries: NotificationQueries
      ) {

    }

    async getNotifications() : Promise<AnyNotification[]>{
      return this.notificationQueries.getNotifications()
    }

    markAsViewed() {
        this.store.mutate(s => {
            return {
                ...s,
                unread: 0
            };
        });
    }
}
