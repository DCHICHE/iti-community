import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { map } from 'rxjs/operators';
import { SocketIoWebsocketConnection } from 'src/modules/common/SocketIoWebsocketConnection';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.less']
})
export class RoomPageComponent implements OnInit {
  roomId$: Observable<string>;
  constructor(private route: ActivatedRoute, private feedStore: FeedStore) {

  }

  ngOnInit(): void {
    this.roomId$ = this.route.params.pipe(map(p => p.roomId));
    this.roomId$.subscribe({
      next: (roomId) => {
        this.feedStore.mutate(s => {
          return {
            ...s,
            roomId
          }
        });
      }
    });
  }
}
