import { Injectable } from "@angular/core";

@Injectable()
export abstract class NotificationCommands {
  abstract view(): Promise<void>;
}
