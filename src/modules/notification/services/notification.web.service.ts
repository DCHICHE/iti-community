import { Injectable } from "@angular/core";


@Injectable()
export class NotificationWebService {
  constructor(
  ) {

  }

  requestPermission(){
    Notification.requestPermission(function (status) {
    });
  }

}
