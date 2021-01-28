import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnyNotification } from '../../notification.model';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';
import { PostService } from 'src/modules/feed/services/post.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {
  @Input()
  notification : AnyNotification;

  @Output() close: EventEmitter<any> = new EventEmitter();

  lastElement : HTMLElement | null;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public get dateZone() {
    return DateTime.fromMillis(this.notification.timestamp, { zone: 'local' }).toString();
  }

  public redirect(){
    if(this.notification.subject === "room_added"){
      this.router.navigate(["app", this.notification.payload.room.id]);
    }else if(this.notification.subject === "post_liked"){
      this.router.navigate(["app", "8e7410ae-ae98-4aab-a7ca-7c39d4dad797"]);
      var element = document.getElementById(this.notification.payload.postId);
      element?.style.setProperty("background","red")
      element?.scrollIntoView({
        block: "center",
        inline:  "end",
      });

      setTimeout(function(){
        element?.style.setProperty("background","white");
      }, 1500);
    }
    this.close.emit(null)
  }

}
