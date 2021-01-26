import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { AnyNotification } from 'src/modules/notification/notification.model';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit {


  notificationsList : AnyNotification[];
  showDrawer: boolean = false;
  constructor(private notificationService : NotificationService) {
  }

  ngOnInit(): void {
  }

  async onToggleNotifications() {
    this.notificationsList = await this.notificationService.getNotifications();
    this.showDrawer = !this.showDrawer;
  }
}
