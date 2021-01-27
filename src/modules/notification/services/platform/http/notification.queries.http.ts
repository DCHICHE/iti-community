import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AnyNotification } from "src/modules/notification/notification.model";
import { NotificationQueries } from "../../notification.queries";

@Injectable()
export class HttpNotificationQueries extends NotificationQueries {
  constructor(private http: HttpClient) {
    super();
  }

  getNotifications(page = 0, perPage = 200): Promise<AnyNotification[]> {
    const skip = page * perPage;
    const take = perPage;
    return this.http.get<AnyNotification[]>(`${environment.serverBaseUrl}/notification?skip=${skip}&take=${take}`).toPromise();
  }
}
