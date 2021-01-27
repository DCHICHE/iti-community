import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { NotificationCommands } from "../../notification.commands";

@Injectable()
export class HttpNotificationCommands extends NotificationCommands {
  constructor(private http: HttpClient) {
    super();
  }

  view(): Promise<void> {
    return this.http.post<void>(`${environment.serverBaseUrl}/notification`, {}).toPromise()
  }
}
