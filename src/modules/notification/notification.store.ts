import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '../common/Store';
import { AnyNotification } from './notification.model';
import { NotificationState } from './notification.state';

@Injectable()
export class NotificationStore extends Store<NotificationState> {
  hasUnread$: Observable<boolean>;

  constructor(
  ) {
    super({
      notifications: []
    });

    this.hasUnread$ = this.value$.pipe(map(state => {
      return state.notifications.some(notif => !notif.viewedAt)
    }))
  }

  prependNotification(...notifications: AnyNotification[]) {
    this.mutate(state => {
      return {
        ...state,
        notifications: [...notifications, ...state.notifications]
      };
    });
  }

  appendNotification(...notifications: AnyNotification[]) {
    this.mutate(state => {
      return {
        ...state,
        notifications: [...state.notifications, ...notifications]
      };
    });
  }
}
