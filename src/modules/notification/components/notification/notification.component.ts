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
  }

  public get dateZone() {
    return DateTime.fromMillis(this.notification.timestamp, { zone: 'local' }).toString();
  }

}
