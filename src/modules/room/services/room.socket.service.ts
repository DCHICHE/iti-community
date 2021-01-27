import { Injectable } from "@angular/core";
import { WebSocketTopic } from "src/modules/common/WebSocketTopic";
import { Room } from "../room.model";

@Injectable()
export class RoomSocketService {
  private subscription?: (room: Room) => any;

  constructor(private socketTopic: WebSocketTopic) {
  }

  onNewRoom(callback: (room: Room) => any) {
    if (this.subscription) {
      this.socketTopic.unsubscribe("room", this.subscription);
    }
    this.subscription = callback;
    this.socketTopic.subscribe("room", callback);
  }

}
