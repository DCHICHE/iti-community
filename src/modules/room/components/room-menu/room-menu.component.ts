import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room, RoomType } from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomCreateModalComponent } from '../room-create-modal/room-create-modal.component';

@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  @ViewChild("modal")
  roomCreate: RoomCreateModalComponent

  roomId$: Observable<string | undefined>;

  rooms: Room[];

  constructor(private feedStore: FeedStore, private queries: RoomQueries, private roomService: RoomService, private router: Router) {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();
    console.log(this.rooms);
    const roomId = localStorage.getItem('roomId');
    if(roomId) this.router.navigate(["app", roomId]);
  }

  goToRoom(room: Room) {
    localStorage.setItem('roomId',room.id)
    this.router.navigate(["app", room.id]);
  }

  openModal() {
    this.roomCreate.open();
  }
}
