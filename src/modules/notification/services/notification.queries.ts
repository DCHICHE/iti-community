import { AnyNotification } from "../notification.model";
import { Injectable } from '@angular/core';

@Injectable()
export abstract class NotificationQueries {
    abstract getNotifications(): Promise<AnyNotification[]>;
}
