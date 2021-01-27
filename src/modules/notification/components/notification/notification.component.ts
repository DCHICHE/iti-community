import { Component, OnInit, Input } from '@angular/core';
import { AnyNotification } from '../../notification.model';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {
  @Input()
  notification : AnyNotification;

  constructor() { }

  ngOnInit(): void {
    console.log(this.notification.data.user.photoUrl)

  }

  public get dateZone() {
    console.log()
    return DateTime.fromMillis(this.notification.timestamp, { zone: 'local' }).toString();
  }

}